import type { Metadata } from "next";
import { AppHeader } from "@/components/app-chrome";
import { BERLIN_PROJECTS, type BerlinProject } from "./data";

export const metadata: Metadata = {
  title: "AI Agents Hackathon — Berlin · Project Showcase",
  description:
    "Projects from the AI Agents Hackathon 2026 in Berlin — agentic AI + on-chain payments (Circle, x402, Nebius, Tavily, Algorand).",
};

const nav = [
  { label: "AI Agents Hackathon", href: "/berlin" },
  { label: "BuilderShip", href: "/projects" },
];

const trackShort = (t: string) =>
  t.startsWith("Agent Infrastructure")
    ? "Agent Infrastructure"
    : t.startsWith("Agentic Commerce")
      ? "Agentic Commerce"
      : t || "Project";

// Faithful display tidy-ups for the sponsor/bonus tags.
const fixTag = (s: string) => s.replace(/tavilly/i, "Tavily");

function LinkPill({
  href,
  label,
  emphasis,
}: {
  href: string;
  label: string;
  emphasis?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        emphasis
          ? "inline-flex items-center gap-1 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-navy-700 transition hover:bg-lime-300"
          : "inline-flex items-center gap-1 rounded-full border border-ink-200 px-3 py-1 text-xs font-medium text-ink-700 transition hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800"
      }
    >
      {label} ↗
    </a>
  );
}

function Card({ p }: { p: BerlinProject }) {
  const l = p.links;
  const hasLinks = l.repo || l.live || l.demo || l.x || l.telegram;
  return (
    <article className="card flex flex-col">
      <h3 className="text-lg font-semibold leading-snug text-ink-900 dark:text-ink-50">
        {p.name}
      </h3>
      {p.oneLiner ? (
        <p className="mt-1 text-sm font-medium text-navy-700 dark:text-lime">{p.oneLiner}</p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-navy-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white dark:bg-white dark:text-navy-700">
          {trackShort(p.focusTrack)}
        </span>
        {p.bonusTracks.map((t) => (
          <span
            key={t}
            className="rounded-full bg-ink-100 px-2.5 py-0.5 text-[10px] font-semibold text-ink-600 dark:bg-ink-800 dark:text-ink-300"
          >
            {fixTag(t)}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs text-ink-500 dark:text-ink-400">
        by <span className="font-medium text-ink-700 dark:text-ink-200">{p.builder}</span>
        {p.team && p.team.toLowerCase() !== p.builder.toLowerCase() ? ` · ${p.team}` : ""}
        {p.date ? ` · ${p.date}` : ""}
      </p>

      {p.description || p.whatBuilt ? (
        <details className="group mt-3">
          <summary className="cursor-pointer list-none text-sm font-semibold text-navy-700 marker:content-none hover:underline dark:text-lime">
            <span className="group-open:hidden">Project details ▾</span>
            <span className="hidden group-open:inline">Hide details ▴</span>
          </summary>
          {p.description ? (
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-700 dark:text-ink-200">
              {p.description}
            </p>
          ) : null}
          {p.whatBuilt ? (
            <div className="mt-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Built during the hackathon
              </h4>
              <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                {p.whatBuilt}
              </p>
            </div>
          ) : null}
        </details>
      ) : null}

      <div className="mt-auto flex flex-wrap gap-2 border-t border-ink-100 pt-4 dark:border-ink-800">
        {l.demo ? <LinkPill href={l.demo} label="Demo" emphasis /> : null}
        {l.live ? <LinkPill href={l.live} label="Live" emphasis /> : null}
        {l.repo ? <LinkPill href={l.repo} label="Repo" /> : null}
        {l.x ? <LinkPill href={l.x} label="X" /> : null}
        {l.telegram ? <LinkPill href={l.telegram} label="Telegram" /> : null}
        {!hasLinks ? (
          <span className="text-xs italic text-ink-400 dark:text-ink-500">No links provided</span>
        ) : null}
      </div>
    </article>
  );
}

export default function BerlinShowcase() {
  const projects = BERLIN_PROJECTS;
  const sponsors = Array.from(
    new Set(projects.flatMap((p) => p.bonusTracks.map(fixTag))),
  ).sort();

  return (
    <>
      <AppHeader links={nav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Berlin · June 2026
            </p>
            <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl">
              AI Agents Hackathon
            </h1>
            <p className="mt-3 max-w-2xl text-ink-600 dark:text-ink-300">
              {projects.length} projects building the agentic economy — autonomous AI agents
              that research, decide, and pay on-chain. Tracks span agentic commerce (x402 /
              USDC payments) and agent infrastructure (identity, reputation, verifiable logs).
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
                Partners:
              </span>
              {sponsors.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink-200 px-2.5 py-0.5 text-[11px] font-medium text-ink-600 dark:border-ink-700 dark:text-ink-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-page">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p) => (
                <Card key={`${p.name}-${p.builder}`} p={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
