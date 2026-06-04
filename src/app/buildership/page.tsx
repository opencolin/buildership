"use client";

/**
 * BuilderShip — event landing page.
 * Aesthetic: "nautical chart, after dark" — a maritime navigation chart for a voyage
 * where builders board a ship, build an AI agent in 24h, and ship it before they dock.
 *
 * NOTE: event facts below (date, vessel, prizes, schedule) are realistic PLACEHOLDERS —
 * confirm/replace with the real BuilderShip details.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Big_Shoulders_Display, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { partners, liveStats } from "@/lib/data";
import "./buildership.css";

const cvar = (k: string, v: string | number): CSSProperties => ({ [k]: v }) as CSSProperties;

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

// ── Event facts (PLACEHOLDERS — confirm) ──────────────────────────────────────
const DEPART_ISO = "2026-06-13T09:00:00-07:00";
const COORDS = { lat: "37.7950° N", lon: "122.2780° W" };

const PRIZES = [
  { tier: "GRAND PRIZE", name: "The Captain's Cut", value: "$20,000", note: "Best overall agent. Cash + a Nebius GPU credit haul." },
  { tier: "TRACK", name: "Best Agent on Nebius", value: "$10,000", note: "Shipped + running on Nebius Serverless." },
  { tier: "TRACK", name: "Best Use of Token Factory", value: "$7,500", note: "Smartest open-weights model routing." },
  { tier: "TRACK", name: "The Figurehead — Best Demo", value: "$5,000", note: "Four minutes. Bring the room to its feet." },
  { tier: "WILDCARD", name: "Show Us Your Claws", value: "$5,000", note: "Crowd favorite, chosen by the deck." },
];

const SCHEDULE = [
  { t: "09:00", k: "ALL ABOARD", d: "Boarding, coffee, and crew assignments at the gangway." },
  { t: "10:00", k: "CAST OFF", d: "Opening colors. Sponsor tracks + judging criteria announced." },
  { t: "11:00", k: "BUILD BEGINS", d: "The 24-hour clock starts. Token Factory keys go live." },
  { t: "19:00", k: "OFFICE HOURS", d: "Sponsor workshops on the lower deck. Dinner topside." },
  { t: "00:00", k: "MIDNIGHT RAMEN", d: "Bottomless noodles. The ship hums." },
  { t: "11:00", k: "SHIP IT", d: "Pencils down, +1 day. Push to production before you dock." },
  { t: "12:30", k: "DEMOS", d: "Four minutes each, in front of the whole crew." },
  { t: "14:30", k: "AWARDS · DISEMBARK", d: "Colors lowered. Winners crowned. Gangway down." },
];

// Real sponsor roster from the platform data; Nebius flies the flag as host.
const HOST = "Nebius";
const FLEET = partners.filter((p) => p.name !== HOST).map((p) => p.name);

// ──────────────────────────────────────────────────────────────────────────────

function useCountdown(target: string) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      setLeft({
        d: Math.floor(ms / 86_400_000),
        h: Math.floor((ms / 3_600_000) % 24),
        m: Math.floor((ms / 60_000) % 60),
        s: Math.floor((ms / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return left;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="100" cy="100" r="92" strokeOpacity="0.5" />
        <circle cx="100" cy="100" r="70" strokeOpacity="0.3" />
        <circle cx="100" cy="100" r="40" strokeOpacity="0.2" />
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i * 5 * Math.PI) / 180;
          const r1 = i % 6 === 0 ? 78 : 86;
          // round so server + client serialize identical strings (no hydration mismatch)
          const r = (n: number) => Math.round(n * 100) / 100;
          return (
            <line
              key={i}
              x1={r(100 + Math.cos(a) * r1)}
              y1={r(100 + Math.sin(a) * r1)}
              x2={r(100 + Math.cos(a) * 92)}
              y2={r(100 + Math.sin(a) * 92)}
              strokeOpacity={i % 6 === 0 ? 0.6 : 0.25}
            />
          );
        })}
      </g>
      {/* star */}
      <g>
        <polygon points="100,18 110,100 100,108 90,100" fill="currentColor" fillOpacity="0.85" />
        <polygon points="100,182 90,100 100,92 110,100" fill="currentColor" fillOpacity="0.35" />
        <polygon points="18,100 100,90 108,100 100,110" fill="currentColor" fillOpacity="0.5" />
        <polygon points="182,100 100,110 92,100 100,90" fill="currentColor" fillOpacity="0.5" />
      </g>
      <text x="100" y="14" textAnchor="middle" className="bs-rose-label" fill="currentColor">N</text>
    </svg>
  );
}

export default function BuilderShipLanding() {
  const left = useCountdown(DEPART_ISO);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "BuilderShip — Build something worth shipping.";
  }, []);

  // Scroll-reveal as progressive enhancement: content is visible by default (SSR /
  // no-JS / reduced-motion all show everything). Only once JS is ready do we arm the
  // hide-then-reveal animation — and we instantly reveal whatever is already on screen
  // so there is no flash for above-the-fold content.
  useEffect(() => {
    const root = rootRef.current;
    const els = root?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!root || !els?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // leave visible
    root.classList.add("bs-ready");
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`${display.variable} ${body.variable} ${mono.variable} bs-root`}>

      {/* fixed chart backdrop */}
      <div className="bs-chart" aria-hidden="true">
        <div className="bs-grid" />
        <div className="bs-glow" />
        <div className="bs-noise" />
        <svg className="bs-route" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className="bs-coast" d="M-40 250 C 220 170, 420 330, 700 250 S 1180 120, 1500 280" />
          <path className="bs-coast bs-coast-2" d="M-40 640 C 260 560, 540 720, 820 600 S 1260 520, 1500 660" />
          <path className="bs-track" d="M120 760 C 360 660, 520 520, 760 470 S 1140 300, 1300 150" />
          <circle className="bs-port" cx="120" cy="760" r="6" />
          <circle className="bs-port bs-port-end" cx="1300" cy="150" r="6" />
        </svg>
      </div>

      {/* ── NAV ───────────────────────────────────────────────────────────── */}
      <header className="bs-nav">
        <a href="#top" className="bs-wordmark" aria-label="BuilderShip home">
          <ShipGlyph />
          <span>
            Builder<span className="bs-accent">Ship</span>
          </span>
        </a>
        <nav className="bs-nav-links" aria-label="Primary">
          <a href="#manifest">Manifest</a>
          <a href="#voyage">Voyage</a>
          <a href="#bounty">Bounty</a>
          <a href="#fleet">Fleet</a>
        </nav>
        <div className="bs-nav-right">
          <span className="bs-host">
            <i aria-hidden="true" /> Hosted by <b>Nebius</b>
          </span>
          <a href="#apply" className="bs-btn bs-btn-sm">
            Ship it <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="bs-hero" aria-label="BuilderShip">
          <p className="bs-eyebrow" data-reveal>
            <span className="bs-dot" /> 24-HOUR AI-AGENT HACKATHON · ABOARD A SHIP · OAKLAND ESTUARY
          </p>

          <h1 className="bs-title">
            <span className="bs-title-line" data-reveal style={cvar("--i", 0)}>
              BUILDER
            </span>
            <span className="bs-title-line bs-title-ship" data-reveal style={cvar("--i", 1)}>
              SHIP
              <ShipGlyph className="bs-title-glyph" />
            </span>
          </h1>

          <p className="bs-lede" data-reveal style={cvar("--i", 2)}>
            Board a vessel in the Oakland estuary. Build an AI agent in twenty-four hours on Nebius.
            <strong> Ship it before you dock.</strong>
          </p>

          <div className="bs-cta-row" data-reveal style={cvar("--i", 3)}>
            <a href="#apply" className="bs-btn bs-btn-lg">
              Request a boarding pass <span aria-hidden="true">→</span>
            </a>
            <a href="#manifest" className="bs-btn bs-btn-ghost bs-btn-lg">
              View the manifest
            </a>
          </div>

          {/* instrument panel: countdown + coordinates */}
          <div className="bs-panel" data-reveal style={cvar("--i", 4)}>
            <div className="bs-countdown" role="timer" aria-label="Time until departure">
              <span className="bs-panel-label">DEPARTURE IN</span>
              <div className="bs-clock">
                {(["d", "h", "m", "s"] as const).map((u, idx) => (
                  <div key={u} className="bs-clock-unit">
                    <b>{left ? (u === "d" ? left.d : pad(left[u])) : "--"}</b>
                    <span>{{ d: "DAYS", h: "HRS", m: "MIN", s: "SEC" }[u]}</span>
                    {idx < 3 && <i className="bs-colon" aria-hidden="true">:</i>}
                  </div>
                ))}
              </div>
            </div>
            <dl className="bs-coords">
              <div>
                <dt>VESSEL</dt>
                <dd>M/V Mainframe</dd>
              </div>
              <div>
                <dt>BERTH</dt>
                <dd>Jack London Sq.</dd>
              </div>
              <div>
                <dt>LAT</dt>
                <dd>{COORDS.lat}</dd>
              </div>
              <div>
                <dt>LON</dt>
                <dd>{COORDS.lon}</dd>
              </div>
            </dl>
          </div>

          <CompassRose className="bs-rose" />
        </section>

        {/* ── TICKER ──────────────────────────────────────────────────────── */}
        <div className="bs-ticker" aria-hidden="true">
          <div className="bs-ticker-track">
            {Array.from({ length: 2 }).map((_, r) => (
              <span key={r} className="bs-ticker-row">
                {[
                  "NOW BOARDING",
                  "$50K+ IN PRIZES",
                  "24 HOURS",
                  "120 BERTHS",
                  "OPEN-WEIGHTS WELCOME",
                  "SHIP YOUR AGENT",
                  "POWERED BY TOKEN FACTORY",
                ].map((w, i) => (
                  <span key={i} className="bs-ticker-item">
                    {w} <em>✦</em>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── MANIFEST / WHAT IT IS ───────────────────────────────────────── */}
        <section id="manifest" className="bs-section" aria-labelledby="manifest-h">
          <SectionLabel n="01" title="THE MANIFEST" />
          <div className="bs-manifest">
            <div className="bs-manifest-lede" data-reveal>
              <h2 id="manifest-h" className="bs-h2">
                A hackathon that actually ships.
              </h2>
              <p>
                Most hackathons end with a slide deck. BuilderShip ends with a deployed agent. You get a berth, a
                crew, twenty-four hours, and the full Nebius stack — then you put your build to sea in front of
                judges who'd rather read your logs than your pitch.
              </p>
              <p className="bs-manifest-claw">
                Bring open weights, bring your claws.{" "}
                <ClawGlyph />
              </p>
            </div>
            <ul className="bs-cards">
              {[
                { i: "▲", h: "Build on Nebius", p: "Token Factory keys + Nebius Serverless from minute one. Route any open-weights model; deploy without leaving the boat." },
                { i: "◆", h: "Ship to production", p: "Judging rewards what runs. A live URL beats a mockup. Demo from a real deployment, not localhost." },
                { i: "✦", h: "$50K+ bounty", p: "Cash, GPU credits, and hardware across five tracks. Every berth has a shot at the Captain's Cut." },
                { i: "●", h: "A crew worth meeting", p: "120 builders, 25 sponsors, one boat. The best agents and the people who fund them, all on deck." },
              ].map((c, idx) => (
                <li key={c.h} className="bs-card" data-reveal style={cvar("--i", idx)}>
                  <span className="bs-card-icon" aria-hidden="true">
                    {c.i}
                  </span>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* stat soundings */}
          <div className="bs-stats" data-reveal>
            {[
              { n: "24", l: "HOURS AT SEA" },
              { n: "120", l: "BERTHS" },
              { n: "$50K+", l: "IN PRIZES" },
              { n: `${liveStats.partnerCompanies}`, l: "SPONSORS ABOARD" },
            ].map((s) => (
              <div key={s.l} className="bs-stat">
                <b>{s.n}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── VOYAGE / SCHEDULE ───────────────────────────────────────────── */}
        <section id="voyage" className="bs-section" aria-labelledby="voyage-h">
          <SectionLabel n="02" title="THE VOYAGE" />
          <h2 id="voyage-h" className="bs-h2 bs-h2-center" data-reveal>
            Ship's log — one tide, end to end.
          </h2>
          <ol className="bs-log">
            {SCHEDULE.map((s, idx) => (
              <li key={idx} className="bs-log-row" data-reveal style={cvar("--i", Math.min(idx, 5))}>
                <span className="bs-log-time">{s.t}</span>
                <span className="bs-log-knot" aria-hidden="true" />
                <span className="bs-log-body">
                  <b>{s.k}</b>
                  <em>{s.d}</em>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── BOUNTY / PRIZES ─────────────────────────────────────────────── */}
        <section id="bounty" className="bs-section" aria-labelledby="bounty-h">
          <SectionLabel n="03" title="THE BOUNTY" />
          <h2 id="bounty-h" className="bs-h2 bs-h2-center" data-reveal>
            $50,000+ in cash, credits & cargo.
          </h2>
          <div className="bs-prizes">
            {PRIZES.map((p, idx) => (
              <article
                key={p.name}
                className={`bs-prize ${idx === 0 ? "bs-prize-grand" : ""}`}
                data-reveal
                style={cvar("--i", Math.min(idx, 4))}
              >
                <span className="bs-prize-tier">{p.tier}</span>
                <span className="bs-prize-value">{p.value}</span>
                <h3>{p.name}</h3>
                <p>{p.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── FLEET / SPONSORS ────────────────────────────────────────────── */}
        <section id="fleet" className="bs-section" aria-labelledby="fleet-h">
          <SectionLabel n="04" title="THE FLEET" />
          <div className="bs-flag" data-reveal>
            <span className="bs-flag-tag">FLAGSHIP · HOST</span>
            <span className="bs-flag-name">NEBIUS</span>
            <span className="bs-flag-note">Token Factory · Serverless · GPU cloud</span>
          </div>
          <ul className="bs-fleet" aria-label="Sponsors">
            {FLEET.map((name, idx) => (
              <li key={name} className="bs-fleet-cell" data-reveal style={cvar("--i", Math.min(idx % 8, 7))}>
                <span aria-hidden="true" className="bs-fleet-flag" />
                {name}
              </li>
            ))}
          </ul>
          <div className="bs-sponsor-cta" data-reveal>
            <div>
              <h3 className="bs-h3">Want your flag on the mast?</h3>
              <p>A berth in front of 120 hand-picked agent builders — recruiting, adoption, and brand, in one tide.</p>
            </div>
            <a className="bs-btn" href="mailto:colin@dabl.club?subject=Sponsoring%20BuilderShip">
              Sponsor BuilderShip <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* ── APPLY / BOARDING PASS ───────────────────────────────────────── */}
        <section id="apply" className="bs-section bs-apply" aria-labelledby="apply-h">
          <SectionLabel n="05" title="ALL ABOARD" />
          <h2 id="apply-h" className="bs-h2 bs-h2-center" data-reveal>
            Request your boarding pass.
          </h2>
          <form className="bs-pass" data-reveal onSubmit={(e) => e.preventDefault()}>
            <div className="bs-pass-main">
              <div className="bs-pass-head">
                <span className="bs-pass-mark">
                  <ShipGlyph /> BuilderShip
                </span>
                <span className="bs-pass-cls">BOARDING PASS · GROUP A</span>
              </div>
              <div className="bs-pass-grid">
                <label className="bs-pass-field">
                  <span>PASSENGER</span>
                  <input type="text" name="name" placeholder="Your name" autoComplete="name" />
                </label>
                <label className="bs-pass-field">
                  <span>HAILING SIGNAL (EMAIL)</span>
                  <input type="email" name="email" placeholder="you@ship.it" autoComplete="email" required />
                </label>
                <div className="bs-pass-meta">
                  <div>
                    <span>FROM</span>
                    <b>YOUR TERMINAL</b>
                  </div>
                  <div>
                    <span>TO</span>
                    <b>PRODUCTION</b>
                  </div>
                  <div>
                    <span>DEPART</span>
                    <b>13 JUN · 09:00</b>
                  </div>
                  <div>
                    <span>BERTH</span>
                    <b>47 / 120</b>
                  </div>
                </div>
              </div>
              <button type="submit" className="bs-btn bs-btn-lg bs-pass-submit">
                Ship it <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="bs-pass-stub" aria-hidden="true">
              <div className="bs-pass-stub-rot">BUILDERSHIP · OAKLAND</div>
              <div className="bs-barcode">
                {Array.from({ length: 34 }).map((_, i) => (
                  <i key={i} style={cvar("--w", `${(i % 4) + 1}px`)} />
                ))}
              </div>
              <span className="bs-pass-seat">47A</span>
            </div>
          </form>
          <p className="bs-fineprint" data-reveal>
            Applications reviewed on a rolling basis · open weights & first-time captains encouraged · bring a laptop and your claws.
          </p>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bs-footer">
        <div className="bs-footer-top">
          <a href="#top" className="bs-wordmark bs-wordmark-lg" aria-label="BuilderShip home">
            <ShipGlyph />
            <span>
              Builder<span className="bs-accent">Ship</span>
            </span>
          </a>
          <p className="bs-footer-claw">
            Show us your claws. <ClawGlyph />
          </p>
        </div>
        <div className="bs-footer-bottom">
          <span>© 2026 BuilderShip · Hosted by Nebius · Oakland, CA</span>
          <span className="bs-footer-links">
            <a href="#apply">Apply</a>
            <a href="#fleet">Sponsor</a>
            <a href="https://github.com/opencolin">GitHub</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="bs-seclabel" data-reveal>
      <span className="bs-seclabel-n">{n}</span>
      <span className="bs-seclabel-line" />
      <span className="bs-seclabel-t">{title}</span>
    </div>
  );
}

function ShipGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="none">
      <path d="M3 14h18l-2.2 4.2a2 2 0 0 1-1.8 1.1H7a2 2 0 0 1-1.8-1.1L3 14Z" fill="currentColor" />
      <path d="M6 14V8h7l4 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8V4l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ClawGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M4 5c3 1 4 3 4 6M4 11c3-1 4-1 6 1" />
      <path d="M20 5c-3 1-4 3-4 6M20 11c-3-1-4-1-6 1" />
      <path d="M9 13c1.5 1.5 4.5 1.5 6 0" />
      <path d="M12 14v6M9 20h6" />
    </svg>
  );
}

