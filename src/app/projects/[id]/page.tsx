import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { AppHeader } from "@/components/app-chrome";
import { db } from "@/server/db";
import { projects, teams, users } from "@/server/db/schema";
import { videoEmbed } from "@/lib/video";
import {
  AiReviewBox,
  extLink,
  WINNER_PROJECT_ID,
  TOP5_PROJECT_IDS,
  TOP10_PROJECT_IDS,
} from "../shared";

export const dynamic = "force-dynamic";

const projectsNav = [
  { label: "Showcase", href: "/projects" },
  { label: "Judges", href: "/judging-panel" },
];

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const rows = await db
    .select({
      id: projects.id,
      name: projects.name,
      summary: projects.summary,
      aiScore: projects.aiScore,
      aiNote: projects.aiNote,
      aiRepoState: projects.aiRepoState,
      humanScore: projects.humanScore,
      videoUrl: projects.videoUrl,
      demoUrl: projects.demoUrl,
      repoUrl: projects.repoUrl,
      websiteUrl: projects.websiteUrl,
      xPostUrl: projects.xPostUrl,
      linkedinPostUrl: projects.linkedinPostUrl,
      isFinalist: projects.isFinalist,
      leader: users.name,
    })
    .from(projects)
    .innerJoin(teams, eq(teams.id, projects.teamId))
    .innerJoin(users, eq(users.id, teams.leaderId))
    .where(eq(projects.id, params.id))
    .limit(1);

  const project = rows[0];
  if (!project) notFound();

  const embed = videoEmbed(project.videoUrl) ?? videoEmbed(project.demoUrl);

  return (
    <>
      <AppHeader links={projectsNav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-8">
            <Link
              href="/projects"
              className="text-sm font-medium text-navy-700 hover:underline dark:text-lime"
            >
              ← Back to projects
            </Link>
            <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="h-display flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                  {project.name}
                  {/* Highest tier only: Winner ⊃ Top 5 ⊃ Top 10 ⊃ Finalist. */}
                  {project.id === WINNER_PROJECT_ID ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink-900">
                      🏆 Winner
                    </span>
                  ) : TOP5_PROJECT_IDS.has(project.id) ? (
                    <span className="inline-flex items-center rounded-full bg-navy-700 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white dark:bg-white dark:text-navy-700">
                      Top 5
                    </span>
                  ) : TOP10_PROJECT_IDS.has(project.id) ? (
                    <span className="inline-flex items-center rounded-full border border-navy-700 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-navy-700 dark:border-ink-300 dark:text-ink-200">
                      Top 10
                    </span>
                  ) : project.isFinalist ? (
                    <span className="rounded-full bg-lime px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-navy-700">
                      ★ Finalist
                    </span>
                  ) : null}
                  {project.aiNote ? (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                      Deep-reviewed
                    </span>
                  ) : null}
                </h1>
                {project.leader ? (
                  <p className="mt-1 text-ink-600 dark:text-ink-300">by {project.leader}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {project.aiScore != null ? (
                  <span className="rounded-full bg-navy-700 px-3 py-1 text-sm font-bold text-white dark:bg-lime dark:text-navy-700">
                    AI {Number(project.aiScore).toFixed(1)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-page max-w-3xl">
            {embed ? (
              <div className="mb-8 aspect-video w-full overflow-hidden rounded-xl border border-ink-200 bg-black dark:border-ink-700">
                {embed.kind === "iframe" ? (
                  <iframe
                    src={embed.src}
                    title={`${project.name} demo video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video src={embed.src} controls playsInline className="h-full w-full" />
                )}
              </div>
            ) : null}

            {project.summary ? (
              <div className="mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  What they&apos;re building
                </h2>
                <p className="mt-2 whitespace-pre-line text-ink-700 dark:text-ink-200">
                  {project.summary}
                </p>
              </div>
            ) : null}

            {project.aiNote ? (
              <div className="mb-6">
                <AiReviewBox note={project.aiNote} state={project.aiRepoState} />
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2 border-t border-ink-200 pt-6 dark:border-ink-700">
              {extLink(project.demoUrl, embed ? "Open demo" : "Demo")}
              {extLink(project.websiteUrl, "Website")}
              {extLink(project.repoUrl, "Repo")}
              {extLink(project.xPostUrl, "X")}
              {extLink(project.linkedinPostUrl, "LinkedIn")}
              {!project.demoUrl &&
              !project.websiteUrl &&
              !project.repoUrl &&
              !project.xPostUrl &&
              !project.linkedinPostUrl ? (
                <span className="text-sm italic text-ink-400 dark:text-ink-500">
                  No links yet.
                </span>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
