import type { ReactNode } from "react";

// The grand-prize winner — gets a "Winner" badge across the showcase.
export const WINNER_PROJECT_ID = "4a6d2944-08b7-407e-9113-db37193775b4"; // Appeal Pilot

// The top 5 finalists — get a "Top 5" badge.
export const TOP5_PROJECT_IDS = new Set([
  "4a6d2944-08b7-407e-9113-db37193775b4", // Appeal Pilot
  "861a99fb-ae6d-4506-89ad-ade72dc2bb40", // Own your agent's work
  "772d9726-f1e1-46aa-a399-afcdb40cace2", // Loopy
  "ba205492-b877-44fd-8054-f5fb356314c9", // Watchstander
  "219d4228-bb9d-47f1-9475-14358d6d6fc8", // Stead
]);

// Row shape shared by the server-rendered pinned card and the client list.
export type ShowcaseProject = {
  id: string;
  name: string;
  summary: string | null;
  aiScore: string | null;
  aiNote: string | null;
  aiRepoState: string | null;
  humanScore: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
  websiteUrl: string | null;
  videoUrl: string | null;
  isFinalist: boolean;
  leader: string | null;
};

export function extLink(href: string | null, label: string): ReactNode {
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

export function medalClass(rank: number) {
  return rank === 1
    ? "bg-amber-400 text-ink-900"
    : rank === 2
      ? "bg-ink-300 text-ink-900 dark:bg-ink-400"
      : rank === 3
        ? "bg-amber-700 text-white"
        : "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300";
}

export function AiReviewBox({ note, state }: { note: string; state: string | null }) {
  return (
    <div className="mt-2 rounded-md border border-ink-200 bg-ink-50 p-2 dark:border-ink-700/60 dark:bg-ink-800/50">
      <p className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
        AI code review
        {state ? (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              state === "real"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                : state === "thin" || state === "scaffold"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                  : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
            }`}
          >
            repo: {state}
          </span>
        ) : null}
      </p>
      <p className="mt-1 line-clamp-3 text-xs text-ink-600 dark:text-ink-300">{note}</p>
    </div>
  );
}
