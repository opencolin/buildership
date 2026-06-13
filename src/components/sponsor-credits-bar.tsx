"use client";

import { useState } from "react";

type Sponsor = {
  name: string;
  tagline: string;
  offer: string;
  code: string | null;
  href: string;
  cta: string;
};

const SPONSORS: Sponsor[] = [
  {
    name: "Composio",
    tagline: "Agent tooling & 1,000+ integrations",
    offer: "3 months Starter free",
    code: "SHIP_BUILDERS",
    href: "https://composio.dev",
    cta: "Claim",
  },
  {
    name: "Nebius Token Factory",
    tagline: "Fast, low-cost inference",
    offer: "$50–100 to start",
    code: "BUILDER-SHIP-HACK",
    href: "https://nebius.com/promo-code?utm_promo_event_code=2026-06-builder-ship-hack-sf&utm_promo_product_type=Token_Factory&utm_promo_activation_code=BUILDER-SHIP-HACK&utm_source=luma",
    cta: "Activate",
  },
  {
    name: "Nebius AI Cloud",
    tagline: "GPU & Serverless credits",
    offer: "$100 — Serverless AI Builders Challenge",
    code: null,
    href: "https://nebius.com/serverless-ai-builders-challenge?utm_source=luma",
    cta: "Enter challenge",
  },
  {
    name: "Tavily",
    tagline: "Real-time web search & extraction",
    offer: "Search credits",
    code: "TVLY-7CCN692Z",
    href: "https://tavily.com",
    cta: "Claim",
  },
  {
    name: "mem0",
    tagline: "Long-term memory for agents",
    offer: "3 months Starter free",
    code: "SHIPBUILDERS",
    href: "https://mem0.ai/?via=colin",
    cta: "Claim",
  },
];

function CodeChip({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      title="Click to copy"
      onClick={() => {
        navigator.clipboard?.writeText(code).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="inline-flex items-center gap-1 rounded-md border border-dashed border-ink-300 bg-ink-50 px-2 py-0.5 font-mono text-xs font-medium text-ink-700 transition hover:border-navy-700 hover:text-navy-700 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-200 dark:hover:border-lime dark:hover:text-lime"
    >
      {copied ? "Copied ✓" : code}
    </button>
  );
}

export function SponsorCreditsBar() {
  return (
    <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
      <div className="container-page py-5">
        <p className="text-sm text-ink-600 dark:text-ink-300">
          Our sponsors are covering your stack so you can{" "}
          <span className="font-semibold text-ink-900 dark:text-ink-50">
            ship without watching the meter
          </span>
          :
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SPONSORS.map((s) => (
            <div key={s.name} className="card flex flex-col gap-1 p-4">
              <p className="font-semibold leading-tight text-ink-900 dark:text-ink-50">
                {s.name}
              </p>
              <p className="text-xs text-ink-500 dark:text-ink-400">{s.tagline}</p>
              <p className="mt-1 text-sm font-medium text-ink-700 dark:text-ink-200">
                {s.offer}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                {s.code ? <CodeChip code={s.code} /> : null}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto text-xs font-semibold text-navy-700 hover:underline dark:text-lime"
                >
                  {s.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
