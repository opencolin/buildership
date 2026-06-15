"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { videoEmbed } from "@/lib/video";
import { WINNER_PROJECT_ID, TOP5_PROJECT_IDS } from "./shared";
import { scoreProject } from "./actions";

export type JudgeProject = {
  id: string;
  name: string;
  team: string | null;
  leader: string | null;
  role: string | null;
  building: string | null;
  demo: string | null;
  website: string | null;
  repo: string | null;
  x: string | null;
  linkedin: string | null;
  status: string;
  myOverall: number | null;
  myNotes: string;
  avg: number | null;
  scoreCount: number;
  finalist: boolean;
  aiScore: string | null;
};

const PAGE = 90;

function LinkPill({ href, label, emphasis }: { href: string; label: string; emphasis?: boolean }) {
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

function ScoreControl({ project }: { project: JudgeProject }) {
  const [overall, setOverall] = useState<number | null>(project.myOverall);
  const [notes, setNotes] = useState(project.myNotes);
  const [avg, setAvg] = useState<number | null>(project.avg);
  const [count, setCount] = useState(project.scoreCount);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedTick, setSavedTick] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  function save(nextOverall: number, nextNotes: string) {
    setError(null);
    start(async () => {
      const res = await scoreProject({
        projectId: project.id,
        overall: nextOverall,
        notes: nextNotes || null,
      });
      if (res.ok) {
        setAvg(res.avg);
        setCount(res.count);
        setSavedTick((t) => t + 1);
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <div className="mt-4 border-t border-ink-100 pt-4 dark:border-ink-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          Your rating
        </span>
        <span className="text-xs text-ink-500 dark:text-ink-400">
          {avg != null ? (
            <>
              avg <span className="font-semibold text-ink-700 dark:text-ink-200">{avg.toFixed(1)}</span>
              {" · "}
              {count} {count === 1 ? "judge" : "judges"}
            </>
          ) : (
            "not scored yet"
          )}
        </span>
      </div>
      <div
        className="mt-2 flex items-center gap-1"
        onMouseLeave={() => setHover(null)}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = n <= (hover ?? overall ?? 0);
          return (
            <button
              key={n}
              type="button"
              disabled={pending}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(n)}
              onClick={() => {
                setOverall(n);
                save(n, notes);
              }}
              className="text-3xl leading-none transition disabled:opacity-50"
            >
              <span className={filled ? "text-amber-400" : "text-ink-300 dark:text-ink-600"}>
                ★
              </span>
            </button>
          );
        })}
      </div>
      <input
        type="text"
        defaultValue={notes}
        placeholder={overall ? "Add a note (optional)" : "Pick a rating first to add a note"}
        disabled={!overall || pending}
        onBlur={(e) => {
          const v = e.target.value;
          if (overall && v !== notes) {
            setNotes(v);
            save(overall, v);
          }
        }}
        className="input mt-2 text-sm disabled:opacity-50"
      />
      <p className="mt-1 h-4 text-xs">
        {error ? (
          <span className="text-red-600 dark:text-red-400">{error}</span>
        ) : pending ? (
          <span className="text-ink-400">Saving…</span>
        ) : savedTick > 0 ? (
          <span className="text-emerald-600 dark:text-emerald-400">Saved ✓</span>
        ) : null}
      </p>
    </div>
  );
}

export function ProjectsBrowser({
  projects,
  canScore,
}: {
  projects: JudgeProject[];
  canScore: boolean;
}) {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<"all" | "hacker" | "founder">("all");
  const [needDemo, setNeedDemo] = useState(false);
  const [needSite, setNeedSite] = useState(false);
  const [unscored, setUnscored] = useState(false);
  const [finalistsOnly, setFinalistsOnly] = useState(false);
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (finalistsOnly && !p.finalist) return false;
      if (needDemo && !p.demo) return false;
      if (needSite && !p.website) return false;
      if (unscored && p.avg != null) return false;
      const r = (p.role ?? "").toLowerCase();
      if (role === "hacker" && !r.includes("hacker")) return false;
      if (role === "founder" && !r.includes("founder")) return false;
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        (p.building ?? "").toLowerCase().includes(needle) ||
        (p.leader ?? "").toLowerCase().includes(needle) ||
        (p.team ?? "").toLowerCase().includes(needle)
      );
    });
  }, [projects, q, role, needDemo, needSite, unscored, finalistsOnly]);

  const shown = filtered.slice(0, visible);
  const reset = () => setVisible(PAGE);

  const roleTabs: { key: typeof role; label: string }[] = [
    { key: "all", label: "All" },
    { key: "hacker", label: "Hackers" },
    { key: "founder", label: "Founders" },
  ];
  const chip = (active: boolean) =>
    active
      ? "rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-navy-700"
      : "rounded-full border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800";

  return (
    <section className="section">
      <div className="container-page">
        <div className="sticky top-16 z-10 -mx-6 mb-8 border-b border-ink-200 bg-ink-50/90 px-6 py-4 backdrop-blur dark:border-ink-800 dark:bg-ink-800/90 md:top-[72px]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                reset();
              }}
              placeholder="Search projects, builders, ideas…"
              className="input lg:max-w-md"
            />
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-1 rounded-full border border-ink-200 p-1 dark:border-ink-700">
                {roleTabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      setRole(t.key);
                      reset();
                    }}
                    className={
                      role === t.key
                        ? "rounded-full bg-navy-700 px-3 py-1 text-xs font-semibold text-white dark:bg-lime dark:text-navy-700"
                        : "rounded-full px-3 py-1 text-xs font-medium text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <button onClick={() => { setFinalistsOnly((v) => !v); reset(); }} className={chip(finalistsOnly)}>★ Finalists</button>
              <button onClick={() => { setNeedDemo((v) => !v); reset(); }} className={chip(needDemo)}>Has demo</button>
              <button onClick={() => { setNeedSite((v) => !v); reset(); }} className={chip(needSite)}>Has website</button>
              {canScore ? (
                <button onClick={() => { setUnscored((v) => !v); reset(); }} className={chip(unscored)}>Unscored</button>
              ) : null}
            </div>
          </div>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {filtered.length !== projects.length ? ` of ${projects.length}` : ""}
          </p>
        </div>

        {shown.length === 0 ? (
          <p className="py-16 text-center text-ink-500 dark:text-ink-400">No projects match your search.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((p) => (
              <article
                key={p.id}
                className={`card flex flex-col ${p.finalist ? "ring-2 ring-lime" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-snug text-ink-900 dark:text-ink-50">
                    <Link href={`/projects/${p.id}`} className="hover:underline">{p.name}</Link>
                  </h3>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {p.id === WINNER_PROJECT_ID ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-900">
                        🏆 Winner
                      </span>
                    ) : null}
                    {TOP5_PROJECT_IDS.has(p.id) ? (
                      <span className="inline-flex items-center rounded-full bg-navy-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white dark:bg-white dark:text-navy-700">
                        Top 5
                      </span>
                    ) : null}
                    {p.aiScore != null ? (
                      <span className="rounded-full bg-navy-700 px-2.5 py-0.5 text-sm font-bold text-white dark:bg-lime dark:text-navy-700">
                        AI {Number(p.aiScore).toFixed(1)}
                      </span>
                    ) : null}
                    {p.finalist ? (
                      <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-700">
                        ★ Finalist
                      </span>
                    ) : null}
                    {p.status === "submitted" ? <span className="pill-lime">Submitted</span> : null}
                  </div>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-500 dark:text-ink-400">
                  {p.leader ? <span>{p.leader}</span> : null}
                  {p.role ? (
                    <span className="rounded-full bg-ink-100 px-2 py-0.5 font-medium text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                      {p.role}
                    </span>
                  ) : null}
                  {videoEmbed(p.demo) ? (
                    <Link
                      href={`/projects/${p.id}`}
                      className="inline-flex items-center gap-1 rounded-full border border-ink-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-600 transition hover:border-navy-700 hover:text-navy-700 dark:border-ink-600 dark:text-ink-300 dark:hover:border-lime dark:hover:text-lime"
                    >
                      ▶ Video
                    </Link>
                  ) : null}
                </div>

                <p className="mt-3 line-clamp-5 grow whitespace-pre-line text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                  {p.building || <span className="italic text-ink-400 dark:text-ink-500">No description provided.</span>}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-100 pt-4 dark:border-ink-800">
                  {p.demo ? <LinkPill href={p.demo} label="Demo" emphasis /> : null}
                  {p.website ? <LinkPill href={p.website} label="Website" emphasis /> : null}
                  {p.x ? <LinkPill href={p.x} label="X" /> : null}
                  {p.linkedin ? <LinkPill href={p.linkedin} label="LinkedIn" /> : null}
                  {p.repo ? <LinkPill href={p.repo} label="Repo" /> : null}
                  {!p.demo && !p.website && !p.x && !p.linkedin && !p.repo ? (
                    <span className="text-xs italic text-ink-400 dark:text-ink-500">No links yet</span>
                  ) : null}
                </div>

                {canScore ? (
                  <ScoreControl project={p} />
                ) : (
                  <a
                    href="/builders/login?callbackUrl=/projects"
                    className="mt-4 block border-t border-ink-100 pt-4 text-center text-sm font-semibold text-navy-700 hover:underline dark:border-ink-800 dark:text-lime"
                  >
                    Sign in to score →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        {visible < filtered.length ? (
          <div className="mt-10 text-center">
            <button onClick={() => setVisible((v) => v + PAGE)} className="btn-outline">
              Load more ({filtered.length - visible} remaining)
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
