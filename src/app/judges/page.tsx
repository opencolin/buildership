import { redirect } from "next/navigation";
import { and, eq, ilike, or, sql } from "drizzle-orm";
import { AppHeader } from "@/components/app-chrome";
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
import { ProjectsBrowser, type JudgeProject } from "./projects-browser";

export const dynamic = "force-dynamic";

const judgesNav = [
  { label: "Projects", href: "/judges" },
  { label: "Schedule", href: "/events" },
];

export default async function JudgesPortal() {
  const session = await safeAuth();
  if (!session?.user) redirect("/builders/login?callbackUrl=/judges");
  const uid = session.user.id;

  const [event] = await db
    .select({ id: events.id, title: events.title })
    .from(events)
    .where(eq(events.slug, "buildership"))
    .limit(1);

  // Access: admins, anyone registered as a judge or investor/VC (both review
  // projects), or judges-table members.
  const panelReg = event
    ? await db
        .select({ role: eventRegistrations.role })
        .from(eventRegistrations)
        .where(
          and(
            eq(eventRegistrations.userId, uid),
            eq(eventRegistrations.eventId, event.id),
            or(
              ilike(eventRegistrations.role, "%judge%"),
              ilike(eventRegistrations.role, "%investor%"),
              ilike(eventRegistrations.role, "%vc%"),
            ),
          ),
        )
        .limit(1)
    : [];
  const judgeRow = await db
    .select({ id: judges.id })
    .from(judges)
    .where(eq(judges.userId, uid))
    .limit(1);

  const canAccess =
    Boolean(session.user.isAdmin) || panelReg.length > 0 || judgeRow.length > 0;
  const myJudgeId = judgeRow[0]?.id ?? null;
  // Judges (and admins, who get a judge row lazily on first save) can score.
  const canScore = Boolean(myJudgeId) || Boolean(session.user.isAdmin);

  if (!canAccess) {
    return (
      <>
        <AppHeader links={judgesNav} />
        <main className="bg-ink-50 dark:bg-ink-800">
          <section className="container-page py-16">
            <h1 className="h-display text-3xl font-bold text-ink-900 dark:text-ink-50">
              Judges &amp; investors only.
            </h1>
            <p className="mt-3 max-w-xl text-ink-600 dark:text-ink-300">
              This portal is for BuilderShip judges and investors. If that&apos;s
              you and you&apos;re seeing this, sign in with the email on your
              registration — or ask the organizers to add you.
            </p>
          </section>
        </main>
      </>
    );
  }

  const rows = event
    ? await db
        .select({
          id: projects.id,
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
        .where(eq(projects.eventId, event.id))
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

  // Aggregate score + count per project across all judges.
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
        .where(eq(projects.eventId, event.id))
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
  }));

  // Surface scored + most-complete entries first.
  const score = (p: JudgeProject) =>
    (p.avg != null ? 20 + p.avg : 0) +
    (p.demo ? 4 : 0) +
    (p.website ? 2 : 0) +
    (p.building ? 1 : 0) +
    (p.status === "submitted" ? 8 : 0);
  items.sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name));

  return (
    <>
      <AppHeader links={judgesNav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Judges portal
            </p>
            <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Projects &amp; companies
            </h1>
            <p className="mt-2 text-ink-600 dark:text-ink-300">
              Every team building at BuilderShip — what they&apos;re building,
              plus their demo, website, and socials.
              {canScore
                ? " Score each project 1–10; your scores save instantly."
                : " Search and filter to dig in."}
            </p>
          </div>
        </section>

        <ProjectsBrowser projects={items} canScore={canScore} />
      </main>
    </>
  );
}
