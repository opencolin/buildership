import Link from "next/link";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { AppHeader } from "@/components/app-chrome";
import { SponsorCreditsBar } from "@/components/sponsor-credits-bar";
import { safeAuth } from "@/server/lib/safe-auth";
import { db } from "@/server/db";
import { events, projects, teams, users } from "@/server/db/schema";

export const dynamic = "force-dynamic";

const showcaseNav = [
  { label: "Projects", href: "/judges" },
  { label: "Showcase", href: "/showcase" },
  { label: "Schedule", href: "/events" },
];

function extLink(href: string | null, label: string) {
  if (!href) return null;
  return (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-ink-200 px-2.5 py-0.5 text-xs font-medium text-ink-700 transition hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800"
    >
      {label} ↗
    </a>
  );
}

export default async function Showcase() {
  const session = await safeAuth();
  const [event] = await db
    .select({ id: events.id })
    .from(events)
    .where(eq(events.slug, "buildership"))
    .limit(1);

  // Ranked by AI score (highest first). Only projects that have been AI-scored
  // appear on the showcase.
  const rows = event
    ? await db
        .select({
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
        })
        .from(projects)
        .innerJoin(teams, eq(teams.id, projects.teamId))
        .innerJoin(users, eq(users.id, teams.leaderId))
        .where(and(eq(projects.eventId, event.id), isNotNull(projects.aiScore)))
        .orderBy(desc(projects.aiScore))
    : [];

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
            {rows.length === 0 ? (
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
            ) : (
              <>
                {/* Column header (desktop) */}
                <div className="mb-2 hidden grid-cols-[3rem_1fr_6rem_6rem] gap-4 px-5 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400 md:grid">
                  <span>#</span>
                  <span>Project</span>
                  <span className="text-right">AI score</span>
                  <span className="text-right">Judges</span>
                </div>
                <ol className="space-y-3">
                  {rows.map((p, i) => {
                    const rank = i + 1;
                    const medal =
                      rank === 1 ? "bg-amber-400 text-ink-900" :
                      rank === 2 ? "bg-ink-300 text-ink-900 dark:bg-ink-400" :
                      rank === 3 ? "bg-amber-700 text-white" :
                      "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300";
                    return (
                      <li
                        key={p.id}
                        className="card grid grid-cols-[3rem_1fr] items-start gap-4 md:grid-cols-[3rem_1fr_6rem_6rem] md:items-center"
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${medal}`}
                        >
                          {rank}
                        </span>
                        <div className="min-w-0">
                          <p className="flex items-center gap-2 font-semibold text-ink-900 dark:text-ink-50">
                            <span className="truncate">{p.name}</span>
                            {p.aiNote ? (
                              <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                                Deep-reviewed
                              </span>
                            ) : null}
                          </p>
                          {p.leader ? (
                            <p className="text-xs text-ink-500 dark:text-ink-400">
                              by {p.leader}
                            </p>
                          ) : null}
                          {p.summary ? (
                            <p className="mt-1 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">
                              {p.summary}
                            </p>
                          ) : null}
                          {p.aiNote ? (
                            <div className="mt-2 rounded-md border border-ink-200 bg-ink-50 p-2 dark:border-ink-700/60 dark:bg-ink-800/50">
                              <p className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
                                AI code review
                                {p.aiRepoState ? (
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                      p.aiRepoState === "real"
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                                        : p.aiRepoState === "thin" || p.aiRepoState === "scaffold"
                                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                                          : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                                    }`}
                                  >
                                    repo: {p.aiRepoState}
                                  </span>
                                ) : null}
                              </p>
                              <p className="mt-1 line-clamp-3 text-xs text-ink-600 dark:text-ink-300">
                                {p.aiNote}
                              </p>
                            </div>
                          ) : null}
                          <div className="mt-2 flex flex-wrap gap-2">
                            {extLink(p.demoUrl, "Demo")}
                            {extLink(p.websiteUrl, "Website")}
                            {extLink(p.repoUrl, "Repo")}
                            {/* mobile-only scores */}
                            <span className="ml-auto md:hidden">
                              <span className="rounded-full bg-navy-700 px-2.5 py-0.5 text-xs font-bold text-white dark:bg-lime dark:text-navy-700">
                                AI {Number(p.aiScore).toFixed(1)}
                              </span>{" "}
                              <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-semibold text-ink-500 dark:bg-ink-800 dark:text-ink-400">
                                Judges TBD
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="hidden text-right md:block">
                          <span className="rounded-full bg-navy-700 px-3 py-1 text-sm font-bold text-white dark:bg-lime dark:text-navy-700">
                            {Number(p.aiScore).toFixed(1)}
                          </span>
                        </div>
                        <div className="hidden text-right text-sm font-semibold text-ink-400 dark:text-ink-500 md:block">
                          {p.humanScore != null ? Number(p.humanScore).toFixed(1) : "TBD"}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
