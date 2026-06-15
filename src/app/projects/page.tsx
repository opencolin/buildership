import Link from "next/link";
import { and, eq, isNotNull, ne, sql } from "drizzle-orm";
import { AppHeader } from "@/components/app-chrome";
import { AutoRefresh } from "@/components/auto-refresh";
import { db } from "@/server/db";
import {
  events,
  projects,
  teams,
  users,
  eventRegistrations,
  judges,
  judgeScores,
  submissions,
} from "@/server/db/schema";
import { safeAuth } from "@/server/lib/safe-auth";
import { SponsorCreditsBar } from "@/components/sponsor-credits-bar";
import { ProjectsBrowser, type JudgeProject } from "./projects-browser";

export const dynamic = "force-dynamic";

const projectsNav = [
  { label: "Showcase", href: "/projects" },
  { label: "Judges", href: "/judging-panel" },
];

export default async function JudgesPortal() {
  const session = await safeAuth();
  const uid = session?.user?.id ?? null;

  const [event] = await db
    .select({ id: events.id, title: events.title })
    .from(events)
    .where(eq(events.slug, "buildership"))
    .limit(1);

  // Open to everyone — anyone can browse; anyone signed in can score.
  const judgeRow = uid
    ? await db
        .select({ id: judges.id })
        .from(judges)
        .where(eq(judges.userId, uid))
        .limit(1)
    : [];
  const myJudgeId = judgeRow[0]?.id ?? null;
  const canScore = Boolean(uid);

  // The signed-in user's own project (if they lead one) — for the quick-edit
  // banner. Hackers/founders see their submission; everyone else, their profile.
  const myProjectRows =
    uid && event
      ? await db
          .select({
            id: projects.id,
            name: projects.name,
            status: projects.status,
          })
          .from(projects)
          .innerJoin(teams, eq(teams.id, projects.teamId))
          .where(
            and(eq(teams.leaderId, uid), eq(projects.eventId, event.id)),
          )
          .limit(1)
      : [];
  const myProject = myProjectRows[0] ?? null;

  const rows = event
    ? await db
        .select({
          id: projects.id,
          slug: projects.slug,
          name: projects.name,
          summary: projects.summary,
          status: projects.status,
          demoUrl: projects.demoUrl,
          websiteUrl: projects.websiteUrl,
          repoUrl: projects.repoUrl,
          xPostUrl: projects.xPostUrl,
          linkedinPostUrl: projects.linkedinPostUrl,
          teamName: teams.name,
          leaderName: users.name,
          leaderX: users.twitterUrl,
          leaderLi: users.linkedinUrl,
          leaderRole: eventRegistrations.role,
          finalist: projects.isFinalist,
          aiScore: projects.aiScore,
        })
        .from(projects)
        .innerJoin(teams, eq(projects.teamId, teams.id))
        .innerJoin(users, eq(teams.leaderId, users.id))
        .leftJoin(
          eventRegistrations,
          and(
            eq(eventRegistrations.userId, users.id),
            eq(eventRegistrations.eventId, projects.eventId),
          ),
        )
        .where(and(eq(projects.eventId, event.id), eq(projects.hidden, false)))
    : [];

  // This judge's own saved scores (to pre-fill the controls).
  const myScoreRows = myJudgeId
    ? await db
        .select({
          projectId: submissions.projectId,
          scores: judgeScores.scoresJson,
          notes: judgeScores.notes,
        })
        .from(judgeScores)
        .innerJoin(submissions, eq(submissions.id, judgeScores.submissionId))
        .where(eq(judgeScores.judgeId, myJudgeId))
    : [];
  const myScoreMap = new Map(
    myScoreRows.map((r) => [
      r.projectId,
      {
        overall: Number((r.scores as { overall?: number })?.overall) || null,
        notes: r.notes ?? "",
      },
    ]),
  );

  // Aggregate score + count per project — but only votes from people who
  // registered on Luma count. Luma registrants carry a ticket-type `role`
  // (Hacker/Founder/Judge/…); anyone who merely created an account to vote gets
  // an auto-RSVP with a null role (see auth signIn hook) and is excluded.
  const aggRows = event
    ? await db
        .select({
          projectId: submissions.projectId,
          avg: sql<string | null>`avg(${judgeScores.weighted})::numeric(5,2)::text`,
          cnt: sql<number>`count(*)::int`,
        })
        .from(judgeScores)
        .innerJoin(submissions, eq(submissions.id, judgeScores.submissionId))
        .innerJoin(projects, eq(projects.id, submissions.projectId))
        .innerJoin(judges, eq(judges.id, judgeScores.judgeId))
        .innerJoin(
          eventRegistrations,
          and(
            eq(eventRegistrations.userId, judges.userId),
            eq(eventRegistrations.eventId, event.id),
          ),
        )
        .where(
          and(
            eq(projects.eventId, event.id),
            isNotNull(eventRegistrations.role),
            ne(eventRegistrations.role, ""),
          ),
        )
        .groupBy(submissions.projectId)
    : [];
  const aggMap = new Map(
    aggRows.map((r) => [
      r.projectId,
      { avg: r.avg != null ? Number(r.avg) : null, count: r.cnt },
    ]),
  );

  const items: JudgeProject[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name || r.teamName || "Untitled",
    team: r.teamName,
    leader: r.leaderName,
    role: r.leaderRole,
    building: r.summary,
    demo: r.demoUrl,
    website: r.websiteUrl,
    repo: r.repoUrl,
    x: r.leaderX || r.xPostUrl,
    linkedin: r.leaderLi || r.linkedinPostUrl,
    status: r.status,
    myOverall: myScoreMap.get(r.id)?.overall ?? null,
    myNotes: myScoreMap.get(r.id)?.notes ?? "",
    avg: aggMap.get(r.id)?.avg ?? null,
    scoreCount: aggMap.get(r.id)?.count ?? 0,
    finalist: r.finalist,
    aiScore: r.aiScore,
  }));

  // Surface scored + most-complete entries first.
  const score = (p: JudgeProject) =>
    (p.avg != null ? 20 + p.avg : 0) +
    (p.demo ? 4 : 0) +
    (p.website ? 2 : 0) +
    (p.building ? 1 : 0) +
    (p.status === "submitted" ? 8 : 0);
  const ai = (p: JudgeProject) => (p.aiScore != null ? Number(p.aiScore) : -1);
  items.sort(
    (a, b) =>
      Number(b.finalist) - Number(a.finalist) ||
      // within finalists, rank by AI score (winner on top)
      (a.finalist ? ai(b) - ai(a) : 0) ||
      score(b) - score(a) ||
      a.name.localeCompare(b.name),
  );

  return (
    <>
      <AppHeader links={projectsNav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <AutoRefresh seconds={30} />
        {uid ? <SponsorCreditsBar /> : null}
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Community judging
            </p>
            <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Projects &amp; companies
            </h1>
            <p className="mt-2 text-ink-600 dark:text-ink-300">
              Every team building at BuilderShip — what they&apos;re building,
              plus their demo, website, and socials.
              {canScore
                ? " Rate each project 1–5 stars; your ratings save instantly."
                : " Sign in to rate each project 1–5 stars — everyone gets to judge."}
            </p>
          </div>
        </section>

        {uid ? (
          <section className="border-b border-ink-200 bg-lime/10 dark:border-ink-800 dark:bg-ink-900">
            <div className="container-page flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              {myProject ? (
                <>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                      Your submission
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-lg font-semibold text-ink-900 dark:text-ink-50">
                      {myProject.name}
                      <span
                        className={
                          myProject.status === "submitted"
                            ? "pill-lime"
                            : "rounded-full bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-600 dark:bg-ink-800 dark:text-ink-300"
                        }
                      >
                        {myProject.status}
                      </span>
                    </p>
                  </div>
                  {event ? (
                    <Link
                      href={`/builders/dashboard/events/${event.id}/builder#project`}
                      className="btn-lime shrink-0"
                    >
                      Edit your project →
                    </Link>
                  ) : null}
                </>
              ) : (
                <>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                      Your profile
                    </p>
                    <p className="mt-1 text-lg font-semibold text-ink-900 dark:text-ink-50">
                      {session?.user?.name ?? "Your details"}
                    </p>
                    <p className="text-sm text-ink-500 dark:text-ink-400">
                      Keep your details current for teammates and judges.
                    </p>
                  </div>
                  <Link href="/builders/dashboard/profile" className="btn-lime shrink-0">
                    Edit your profile →
                  </Link>
                </>
              )}
            </div>
          </section>
        ) : null}

        <ProjectsBrowser projects={items} canScore={canScore} />
      </main>
    </>
  );
}
