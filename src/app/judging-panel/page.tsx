import type { Metadata } from "next";
import { AppHeader } from "@/components/app-chrome";

export const metadata: Metadata = {
  title: "Judges — BuilderShip",
  description: "Meet the judges scoring BuilderShip on the bay.",
};

const nav = [
  { label: "Projects", href: "/judges" },
  { label: "Showcase", href: "/showcase" },
  { label: "Judges", href: "/judging-panel" },
  { label: "Schedule", href: "/events" },
];

type Judge = {
  name: string;
  title: string;
  bio: string | null;
  linkedin: string | null;
  x: string | null;
  github: string | null;
  website: string | null;
};

const JUDGES: Judge[] = [
  { name: "Dhravya Shah", title: "Supermemory", bio: "Founder, Supermemory — memory infrastructure for AI.", linkedin: "https://linkedin.com/in/dhravyashah", x: "https://x.com/DhravyaShah", github: "https://github.com/dhravya", website: "https://dhravya.dev" },
  { name: "Jian Liao", title: "Agentbase · CTO", bio: "The AI OS for companies.", linkedin: "https://linkedin.com/in/jian-liao", x: "https://x.com/jianxliao", github: "https://github.com/jlia0", website: "https://agentbase.sh" },
  { name: "Aurora Feng", title: "Neural Motion · Founder", bio: "A robotics neolab building a generative video-action model for universal embodiment transfer across robots and domains.", linkedin: "https://linkedin.com/in/aurora-feng", x: "https://x.com/aurorafeng_01", github: null, website: "https://neural-motion.com" },
  { name: "Nicole Mossmer", title: "ICONIQ · Investor", bio: "Venture investor.", linkedin: "https://linkedin.com/in/nicolemossmer", x: "https://x.com/nmossmer", github: null, website: null },
  { name: "Dominic Damoah", title: "MoltPod · CTO", bio: "Building MoltPod.", linkedin: "https://linkedin.com/in/dominic-damoah", x: "https://x.com/DamoahDominic", github: "https://github.com/damoahdominic", website: "https://moltpod.com" },
  { name: "Kevin Lott", title: "Backblaze", bio: "Everything: SaaS, agents, MCP.", linkedin: "https://linkedin.com/in/kevin-lott-447b0239", x: null, github: null, website: "https://backblaze.com" },
  { name: "Nikita Ahuja", title: "C3 AI", bio: "Enterprise AI applications.", linkedin: "https://linkedin.com/in/ahuja-nikita", x: null, github: null, website: null },
  { name: "Rayyan Zahid", title: "ImmersiveCommons", bio: "Building ManageOS.ai.", linkedin: "https://linkedin.com/in/rayyanzahid", x: "https://x.com/rayyanzahidai", github: "https://github.com/rayyanzahid", website: "https://www.immersivecommons.com" },
  { name: "Pat Santiago", title: "ottoM8", bio: null, linkedin: null, x: null, github: null, website: null },
];

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "?"
  );
}

function LinkPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-700 transition hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800"
    >
      {label} ↗
    </a>
  );
}

export default function JudgingPanel() {
  return (
    <>
      <AppHeader links={nav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              The panel
            </p>
            <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Meet the judges
            </h1>
            <p className="mt-2 max-w-2xl text-ink-600 dark:text-ink-300">
              The founders, operators, and investors scoring projects on the bay, June 14.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container-page">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {JUDGES.map((j) => (
                <article key={j.name} className="card flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime text-base font-bold text-navy-700">
                      {initials(j.name)}
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-ink-900 dark:text-ink-50">{j.name}</h2>
                      <p className="truncate text-sm text-ink-500 dark:text-ink-400">{j.title}</p>
                    </div>
                  </div>
                  {j.bio ? (
                    <p className="mt-3 grow text-sm leading-relaxed text-ink-700 dark:text-ink-200">{j.bio}</p>
                  ) : (
                    <div className="grow" />
                  )}
                  {j.linkedin || j.x || j.github || j.website ? (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-100 pt-4 dark:border-ink-800">
                      {j.website ? <LinkPill href={j.website} label="Website" /> : null}
                      {j.linkedin ? <LinkPill href={j.linkedin} label="LinkedIn" /> : null}
                      {j.x ? <LinkPill href={j.x} label="X" /> : null}
                      {j.github ? <LinkPill href={j.github} label="GitHub" /> : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
