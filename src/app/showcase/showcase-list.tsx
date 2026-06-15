"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { videoEmbed } from "@/lib/video";
import { AiReviewBox, extLink, type ShowcaseProject } from "./shared";

const VIDEO_PILL =
  "inline-flex shrink-0 items-center gap-1 rounded-full border border-ink-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-600 transition hover:border-navy-700 hover:text-navy-700 dark:border-ink-600 dark:text-ink-300 dark:hover:border-lime dark:hover:text-lime";

function ProjectCard({ p }: { p: ShowcaseProject }) {
  const hasVideo = videoEmbed(p.videoUrl) ?? videoEmbed(p.demoUrl);
  return (
    <li className="card grid grid-cols-1 items-start gap-4 md:grid-cols-[1fr_6rem] md:items-center">
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2 font-semibold text-ink-900 dark:text-ink-50">
          <Link href={`/showcase/${p.id}`} className="truncate hover:underline">
            {p.name}
          </Link>
          {p.isFinalist ? (
            <span className="shrink-0 rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-700">
              Finalist
            </span>
          ) : null}
          {hasVideo ? (
            <Link href={`/showcase/${p.id}`} className={VIDEO_PILL}>
              ▶ Video
            </Link>
          ) : null}
          {p.aiNote ? (
            <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
              Deep-reviewed
            </span>
          ) : null}
        </p>
        {p.leader ? <p className="text-xs text-ink-500 dark:text-ink-400">by {p.leader}</p> : null}
        {p.summary ? (
          <p className="mt-1 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">{p.summary}</p>
        ) : null}
        {p.aiNote ? <AiReviewBox note={p.aiNote} state={p.aiRepoState} /> : null}
        <div className="mt-2 flex flex-wrap gap-2">
          {extLink(p.demoUrl, "Demo")}
          {extLink(p.websiteUrl, "Website")}
          {extLink(p.repoUrl, "Repo")}
          {/* mobile-only scores */}
          <span className="ml-auto md:hidden">
            <span className="rounded-full bg-navy-700 px-2.5 py-0.5 text-xs font-bold text-white dark:bg-lime dark:text-navy-700">
              AI {p.aiScore != null ? Number(p.aiScore).toFixed(1) : "—"}
            </span>
          </span>
        </div>
      </div>
      <div className="hidden text-right md:block">
        <span className="rounded-full bg-navy-700 px-3 py-1 text-sm font-bold text-white dark:bg-lime dark:text-navy-700">
          {p.aiScore != null ? Number(p.aiScore).toFixed(1) : "—"}
        </span>
      </div>
    </li>
  );
}

const columnHeader = (
  <div className="mb-2 hidden grid-cols-[1fr_6rem] gap-4 px-5 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400 md:grid">
    <span>Project</span>
    <span className="text-right">AI score</span>
  </div>
);

export function ShowcaseList({
  items,
  hasPinned,
}: {
  items: ShowcaseProject[];
  hasPinned: boolean;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        (p.leader ?? "").toLowerCase().includes(needle) ||
        (p.summary ?? "").toLowerCase().includes(needle),
    );
  }, [items, q]);

  const finalists = filtered.filter((p) => p.isFinalist);
  const rest = filtered.filter((p) => !p.isFinalist);

  return (
    <>
      {hasPinned ? (
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          Full leaderboard
        </h2>
      ) : null}

      <div className="sticky top-16 z-10 -mx-6 mb-4 border-b border-ink-200 bg-ink-50/90 px-6 py-3 backdrop-blur dark:border-ink-800 dark:bg-ink-800/90 md:top-[72px]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, builders, ideas…"
            aria-label="Search projects"
            className="input sm:max-w-md"
          />
          <p className="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {filtered.length !== items.length ? ` of ${items.length}` : ""}
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-ink-500 dark:text-ink-400">
          No projects match &ldquo;{q.trim()}&rdquo;.
        </p>
      ) : (
        <>
          {finalists.length > 0 ? (
            <section className="mb-10">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-700 dark:text-lime">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-lime" />
                Finalists · on the boat ({finalists.length})
              </h3>
              {columnHeader}
              <ol className="space-y-3">
                {finalists.map((p) => (
                  <ProjectCard key={p.id} p={p} />
                ))}
              </ol>
            </section>
          ) : null}

          {rest.length > 0 ? (
            <section>
              {finalists.length > 0 ? (
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  All projects
                </h3>
              ) : null}
              {columnHeader}
              <ol className="space-y-3">
                {rest.map((p) => (
                  <ProjectCard key={p.id} p={p} />
                ))}
              </ol>
            </section>
          ) : null}
        </>
      )}
    </>
  );
}
