"use client";

import { useMemo, useState } from "react";

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
};

const PAGE = 90;

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

export function ProjectsBrowser({ projects }: { projects: JudgeProject[] }) {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<"all" | "hacker" | "founder">("all");
  const [needDemo, setNeedDemo] = useState(false);
  const [needSite, setNeedSite] = useState(false);
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (needDemo && !p.demo) return false;
      if (needSite && !p.website) return false;
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
  }, [projects, q, role, needDemo, needSite]);

  const shown = filtered.slice(0, visible);

  function reset() {
    setVisible(PAGE);
  }

  const roleTabs: { key: typeof role; label: string }[] = [
    { key: "all", label: "All" },
    { key: "hacker", label: "Hackers" },
    { key: "founder", label: "Founders" },
  ];

  return (
    <section className="section">
      <div className="container-page">
        {/* Controls */}
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
              <button
                onClick={() => {
                  setNeedDemo((v) => !v);
                  reset();
                }}
                className={
                  needDemo
                    ? "rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-navy-700"
                    : "rounded-full border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
                }
              >
                Has demo
              </button>
              <button
                onClick={() => {
                  setNeedSite((v) => !v);
                  reset();
                }}
                className={
                  needSite
                    ? "rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-navy-700"
                    : "rounded-full border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
                }
              >
                Has website
              </button>
            </div>
          </div>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {filtered.length !== projects.length ? ` of ${projects.length}` : ""}
          </p>
        </div>

        {/* Grid */}
        {shown.length === 0 ? (
          <p className="py-16 text-center text-ink-500 dark:text-ink-400">
            No projects match your search.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((p) => (
              <article key={p.id} className="card flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-snug text-ink-900 dark:text-ink-50">
                    {p.name}
                  </h3>
                  {p.status === "submitted" ? (
                    <span className="pill-lime shrink-0">Submitted</span>
                  ) : null}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-500 dark:text-ink-400">
                  {p.leader ? <span>{p.leader}</span> : null}
                  {p.role ? (
                    <span className="rounded-full bg-ink-100 px-2 py-0.5 font-medium text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                      {p.role}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 line-clamp-5 grow whitespace-pre-line text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                  {p.building || (
                    <span className="italic text-ink-400 dark:text-ink-500">
                      No description provided.
                    </span>
                  )}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-100 pt-4 dark:border-ink-800">
                  {p.demo ? <LinkPill href={p.demo} label="Demo" emphasis /> : null}
                  {p.website ? (
                    <LinkPill href={p.website} label="Website" emphasis />
                  ) : null}
                  {p.x ? <LinkPill href={p.x} label="X" /> : null}
                  {p.linkedin ? (
                    <LinkPill href={p.linkedin} label="LinkedIn" />
                  ) : null}
                  {p.repo ? <LinkPill href={p.repo} label="Repo" /> : null}
                  {!p.demo &&
                  !p.website &&
                  !p.x &&
                  !p.linkedin &&
                  !p.repo ? (
                    <span className="text-xs italic text-ink-400 dark:text-ink-500">
                      No links yet
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}

        {visible < filtered.length ? (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE)}
              className="btn-outline"
            >
              Load more ({filtered.length - visible} remaining)
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
