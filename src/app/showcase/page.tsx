import Link from "next/link";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { AppHeader } from "@/components/app-chrome";
import { SponsorCreditsBar } from "@/components/sponsor-credits-bar";
import { safeAuth } from "@/server/lib/safe-auth";
import { db } from "@/server/db";
import { events, projects, teams, users } from "@/server/db/schema";
import { AiReviewBox, extLink, medalClass } from "./shared";
import { ShowcaseList } from "./showcase-list";

export const dynamic = "force-dynamic";

const showcaseNav = [
  { label: "Projects", href: "/judges" },
  { label: "Showcase", href: "/showcase" },
  { label: "Schedule", href: "/events" },
];

// Shared column selection so the leaderboard query and the "your project"
// lookup return identically-shaped rows.
const projectFields = {
  id: projects.id,
  name: projects.name,
  summary: projects.summary,
  aiScore: projects.aiScore,
  aiNote: projects.aiNote,
  aiRepoState: projects.aiRepoState,
  humanScore: projects.humanScore,
  demoUrl: projects.demoUrl,
  repoUrl: projects.repoUrl,
  websiteUrl: projects.websiteUrl,
  leader: users.name,
  leaderId: teams.leaderId,
};

export default async function Showcase() {
  const session = await safeAuth();
  const uid = session?.user?.id ?? null;
  const [event] = await db
    .select({ id: events.id })
    .from(events)
    .where(eq(events.slug, "buildership"))
    .limit(1);

  // Ranked by AI score (highest first). Only projects that have been AI-scored
  // appear on the leaderboard.
  const rows = event
    ? await db
        .select(projectFields)
        .from(projects)
        .innerJoin(teams, eq(teams.id, projects.teamId))
        .innerJoin(users, eq(users.id, teams.leaderId))
        .where(and(eq(projects.eventId, event.id), isNotNull(projects.aiScore)))
        .orderBy(desc(projects.aiScore))
    : [];

  const ranked = rows.map((p, i) => ({ ...p, rank: i + 1 }));

  // The signed-in user's own project, pinned to the top. If it's been scored
  // it's already in `ranked` (carrying its true rank); if not, look it up
  // directly so a not-yet-scored project still shows.
  const mine = uid ? ranked.find((r) => r.leaderId === uid) ?? null : null;
  const mineUnscored =
    uid && event && !mine
      ? (
          await db
            .select(projectFields)
            .from(projects)
            .innerJoin(teams, eq(teams.id, projects.teamId))
            .innerJoin(users, eq(users.id, teams.leaderId))
            .where(and(eq(projects.eventId, event.id), eq(teams.leaderId, uid)))
            .limit(1)
        )[0] ?? null
      : null;

  const myProject =
    mine ?? (mineUnscored ? { ...mineUnscored, rank: null as number | null } : null);
  // Avoid showing the user's project twice: drop it from the leaderboard below.
  const others = mine ? ranked.filter((r) => r.id !== mine.id) : ranked;

  return (
    <>
      <AppHeader links={showcaseNav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        {session?.user ? <SponsorCreditsBar /> : null}
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Showcase
            </p>
            <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Project leaderboard
            </h1>
            <p className="mt-2 text-ink-600 dark:text-ink-300">
              Ranked by AI score. Judges&apos; scores are added live on boat day,
              June 14.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container-page">
            {/* Pinned: the signed-in user's own project */}
            {myProject ? (
              <div className="mb-8">
                <div className="card border-2 border-lime dark:border-lime/70">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-lime px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-navy-700">
                        Your project
                      </span>
                      {myProject.rank != null ? (
                        <span
                          className={`flex h-7 items-center justify-center rounded-full px-2.5 text-xs font-bold ${medalClass(myProject.rank)}`}
                        >
                          Ranked #{myProject.rank}
                        </span>
                      ) : (
                        <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-semibold text-ink-500 dark:bg-ink-800 dark:text-ink-400">
                          Awaiting AI score
                        </span>
                      )}
                    </div>
                    {event ? (
                      <Link
                        href={`/builders/dashboard/events/${event.id}/builder#project`}
                        className="btn-outline text-xs"
                      >
                        Edit your project →
                      </Link>
                    ) : null}
                  </div>

                  <p className="mt-3 flex items-center gap-2 font-semibold text-ink-900 dark:text-ink-50">
                    <span className="truncate text-lg">{myProject.name}</span>
                    {myProject.aiNote ? (
                      <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                        Deep-reviewed
                      </span>
                    ) : null}
                  </p>
                  {myProject.summary ? (
                    <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                      {myProject.summary}
                    </p>
                  ) : null}
                  {myProject.aiNote ? (
                    <AiReviewBox note={myProject.aiNote} state={myProject.aiRepoState} />
                  ) : null}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {extLink(myProject.demoUrl, "Demo")}
                    {extLink(myProject.websiteUrl, "Website")}
                    {extLink(myProject.repoUrl, "Repo")}
                    {myProject.aiScore != null ? (
                      <span className="ml-auto rounded-full bg-navy-700 px-3 py-1 text-xs font-bold text-white dark:bg-lime dark:text-navy-700">
                        AI {Number(myProject.aiScore).toFixed(1)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {others.length > 0 ? (
              <ShowcaseList items={others} hasPinned={Boolean(myProject)} />
            ) : myProject ? (
              <p className="text-center text-sm text-ink-500 dark:text-ink-400">
                No other projects have been scored yet.
              </p>
            ) : (
              <div className="card mx-auto max-w-xl text-center">
                <p className="text-lg font-semibold text-ink-900 dark:text-ink-50">
                  AI scoring is in progress.
                </p>
                <p className="mt-2 text-ink-600 dark:text-ink-300">
                  The ranked leaderboard appears here as soon as projects are
                  scored. Check back shortly.
                </p>
                <Link href="/judges" className="btn-outline mt-6">
                  Browse all projects →
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
