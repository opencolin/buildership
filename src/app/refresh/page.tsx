import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "BuilderShip — refreshed direction" },
  robots: { index: false, follow: false },
};

/*
  Refreshed design direction — exploration at /refresh (not linked from nav).
  Inspiration: the "ETH CRUISE" poster (ignoring ETH). Built with french-claude
  craft: near-black canvas, one vivid accent (spring green) + electric blue,
  a holographic faceted crystal over wavy water, heavy uppercase display type,
  a pixel mark, capsule framing, and motion as choreography (reveal + stagger,
  reduced-motion safe).
*/

const STYLES = `
  .rf {
    --ink: #07080a;
    --ink-2: #0c0e12;
    --paper: #f4f7f5;
    --muted: #8b938e;
    --green: #7df7a3;
    --green-bright: #9dffb9;
    --blue: #3d6bff;
    --line: rgba(125, 247, 163, 0.18);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    background: var(--ink);
    color: var(--paper);
    font-feature-settings: "tnum" 1;
  }
  .rf ::selection { background: var(--green); color: #06291a; }

  /* Display type — heavy, wide, uppercase grotesque feel */
  .rf-display {
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
  }
  .rf-mono { font-family: var(--font-jetbrains, "JetBrains Mono", monospace); }

  /* Green edge frames (poster side bands) */
  .rf-frame-l, .rf-frame-r {
    position: absolute; top: 0; bottom: 0; width: clamp(10px, 2.2vw, 28px);
    background: linear-gradient(180deg, var(--green) 0%, #57e58a 60%, var(--green) 100%);
    z-index: 5;
  }
  .rf-frame-l { left: 0; }
  .rf-frame-r { right: 0; }

  /* The capsule scene */
  .rf-capsule {
    position: relative;
    border-radius: clamp(56px, 9vw, 140px);
    overflow: hidden;
    background:
      radial-gradient(120% 80% at 50% -10%, #16306b 0%, #0b1b40 38%, #060d20 70%, #05070f 100%);
    box-shadow:
      0 0 0 1px rgba(125, 247, 163, 0.12),
      0 40px 120px -40px rgba(61, 107, 255, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    isolation: isolate;
  }

  /* Crystal glow + slow breathing drift */
  .rf-crystal { filter: drop-shadow(0 0 60px rgba(125, 247, 163, 0.35)) drop-shadow(0 0 120px rgba(61, 107, 255, 0.35)); }
  @media (prefers-reduced-motion: no-preference) {
    .rf-crystal { animation: rf-float 9s var(--ease-out) infinite alternate; }
    .rf-glint { animation: rf-glint 7s ease-in-out infinite; }
  }
  @keyframes rf-float {
    from { transform: translateY(-1.2%) rotate(-0.6deg); }
    to   { transform: translateY(1.6%) rotate(0.6deg); }
  }
  @keyframes rf-glint { 0%,100% { opacity: 0.35; } 50% { opacity: 0.85; } }

  /* Reveal + stagger */
  @media (prefers-reduced-motion: no-preference) {
    .rf-reveal { opacity: 0; animation: rf-up 0.7s var(--ease-out) forwards; }
    .rf-stagger > * { opacity: 0; animation: rf-up 0.7s var(--ease-out) forwards; }
    .rf-stagger > *:nth-child(1) { animation-delay: 0.05s; }
    .rf-stagger > *:nth-child(2) { animation-delay: 0.12s; }
    .rf-stagger > *:nth-child(3) { animation-delay: 0.19s; }
    .rf-stagger > *:nth-child(4) { animation-delay: 0.26s; }
  }
  @keyframes rf-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

  /* The Lift */
  .rf-btn {
    transition: transform 0.15s var(--ease-spring), box-shadow 0.2s var(--ease-out), background 0.2s var(--ease-out);
  }
  .rf-btn:hover { transform: translateY(-2px); }
  .rf-btn-green:hover { box-shadow: 0 10px 30px -8px rgba(125, 247, 163, 0.6); }
  .rf-btn:active { transform: translateY(0); }

  /* Pixel mark */
  .rf-pix { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; width: 56px; }
  .rf-pix i { aspect-ratio: 1; background: var(--green); display: block; }
  .rf-pix i.off { background: transparent; }
`;

// Holographic faceted crystal (abstract quartz point — not the ETH diamond)
function Crystal() {
  return (
    <svg
      className="rf-crystal"
      width="320"
      height="440"
      viewBox="0 0 200 320"
      fill="none"
      aria-hidden
      style={{ maxWidth: "42vw" }}
    >
      <defs>
        <linearGradient id="fTL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d7fbe6" />
          <stop offset="1" stopColor="#7df7a3" />
        </linearGradient>
        <linearGradient id="fTR" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdd9ff" />
          <stop offset="1" stopColor="#3d6bff" />
        </linearGradient>
        <linearGradient id="fBLu" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#7df7a3" />
          <stop offset="1" stopColor="#11305a" />
        </linearGradient>
        <linearGradient id="fBRu" x1="1" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#3d6bff" />
          <stop offset="1" stopColor="#0a1733" />
        </linearGradient>
        <linearGradient id="fBL" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#2fe0c0" />
          <stop offset="1" stopColor="#081626" />
        </linearGradient>
        <linearGradient id="fBR" x1="1" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#b79bff" />
          <stop offset="1" stopColor="#0a1020" />
        </linearGradient>
        <linearGradient id="core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e1b3a" />
          <stop offset="1" stopColor="#060c1c" />
        </linearGradient>
      </defs>

      {/* core seam for depth */}
      <polygon points="100,20 122,112 100,300 78,112" fill="url(#core)" opacity="0.9" />

      {/* top facets */}
      <polygon points="100,20 40,112 100,112" fill="url(#fTL)" />
      <polygon points="100,20 160,112 100,112" fill="url(#fTR)" />
      {/* upper body */}
      <polygon points="40,112 100,112 100,206 40,206" fill="url(#fBLu)" />
      <polygon points="160,112 100,112 100,206 160,206" fill="url(#fBRu)" />
      {/* bottom facets */}
      <polygon points="40,206 100,206 100,300" fill="url(#fBL)" />
      <polygon points="160,206 100,206 100,300" fill="url(#fBR)" />

      {/* specular glint */}
      <polygon className="rf-glint" points="100,20 78,112 100,112" fill="#ffffff" opacity="0.5" />
      <polygon points="100,206 100,300 84,232" fill="#ffffff" opacity="0.08" />
    </svg>
  );
}

function Water() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0"
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      style={{ height: "34%" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="rf-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e2a5e" />
          <stop offset="1" stopColor="#040813" />
        </linearGradient>
      </defs>
      <path d="M0,60 C200,20 360,90 600,60 C840,30 1000,92 1200,56 L1200,200 L0,200 Z" fill="url(#rf-water)" />
      <path d="M0,96 C220,64 380,120 600,96 C820,72 1000,124 1200,92 L1200,200 L0,200 Z" fill="#071026" opacity="0.85" />
      <path d="M0,60 C200,20 360,90 600,60 C840,30 1000,92 1200,56" fill="none" stroke="#7df7a3" strokeOpacity="0.35" strokeWidth="2" />
    </svg>
  );
}

export default function RefreshPage() {
  return (
    <main className="rf relative min-h-screen overflow-hidden">
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="rf-frame-l" aria-hidden />
      <div className="rf-frame-r" aria-hidden />

      {/* faint grid wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,247,163,1) 1px, transparent 1px), linear-gradient(90deg, rgba(125,247,163,1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-[8vw] py-10 sm:py-14">
        {/* top row */}
        <header className="rf-reveal flex items-center justify-between">
          <span className="rf-display text-lg tracking-tight sm:text-xl">BuilderShip</span>
          <span className="rf-mono text-xs tracking-[0.25em] text-[color:var(--muted)]">SF · JUN 14 2026</span>
        </header>

        {/* headline */}
        <div className="mt-10 sm:mt-14">
          <p className="rf-reveal rf-mono mb-5 text-xs tracking-[0.3em] text-[color:var(--green)]">
            AN OPENCLAW HACKATHON · ON A YACHT
          </p>
          <h1 className="rf-display text-[clamp(3rem,11vw,8.5rem)]">
            <span className="rf-reveal block">Hack the</span>
            <span className="rf-reveal block" style={{ color: "var(--green)" }}>
              High&nbsp;Seas
            </span>
          </h1>
        </div>

        {/* capsule scene */}
        <div className="rf-reveal mt-10 flex flex-1 items-center justify-center sm:mt-12" style={{ animationDelay: "0.2s" }}>
          <div className="rf-capsule grid h-[clamp(360px,52vh,560px)] w-full max-w-3xl place-items-center">
            <Crystal />
            <Water />
          </div>
        </div>

        {/* bottom row: copy + CTAs + pixel mark */}
        <div className="mt-10 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-[color:var(--paper)]/80">
              The best builders of the bay board a yacht for one day of heads-down hacking.
              <span className="text-[color:var(--green)]"> $50K credits and a DGX Spark</span> for the winner.
            </p>
            <div className="rf-stagger mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="https://luma.com/ship.builders"
                className="rf-btn rf-btn-green rounded-full px-7 py-3.5 text-sm font-semibold text-[#06291a]"
                style={{ background: "var(--green)" }}
              >
                Sign up to hack →
              </Link>
              <Link
                href="/"
                className="rf-btn rounded-full border border-[color:var(--line)] px-6 py-3.5 text-sm font-semibold text-[color:var(--paper)]"
              >
                Current site
              </Link>
            </div>
          </div>

          <div className="flex items-end justify-between gap-8 sm:flex-col sm:items-end">
            <div className="rf-display text-[clamp(2.5rem,7vw,5rem)] leading-none">
              14<span className="ml-2 text-[0.42em] align-top text-[color:var(--muted)]">JUN</span>
            </div>
            <div className="rf-pix" aria-hidden>
              {/* a small green pixel/checker mark */}
              {[1,0,1,1, 0,1,1,0, 1,1,0,1, 1,0,1,1].map((v, i) => (
                <i key={i} className={v ? "" : "off"} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
