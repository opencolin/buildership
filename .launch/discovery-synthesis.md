# BuilderShip Launch Readiness — Consolidated Discovery Synthesis

Six parallel reader reports synthesized. Launch is tomorrow. Below: ordered risks, quick wins, per-subsystem summaries, and open questions for the PM council.

---

## Top 8 risks for launch tomorrow

1. **`db:seed` runs inside the Vercel build step (`build` = `db:migrate && db:seed && next build`)** — a non-idempotent seed will hard-fail every prod/preview deploy on a unique-constraint crash. **Do:** read `src/server/db/seed.ts`, confirm upserts/`onConflictDoNothing` before any deploy; ideally pull migrate/seed out of `build` into a one-off release command.
2. **Required env vars likely unset in Vercel Production — `DATABASE_URL` / `AUTH_SECRET`** — build runs `db:migrate`+`db:seed` so a missing `DATABASE_URL` fails the build before any page renders; missing `AUTH_SECRET` 500s any session-touching layout. **Do:** set all M1 env vars in Vercel Production scope now, redeploy.
3. **No OG image anywhere** (no `openGraph.images`/`twitter.images` in `layout.tsx`; no `og*.png`/`opengraph-image.*` in `/public` or `/src/app`) — every Slack/X/iMessage share of this share-driven apply flow renders a blank/broken card. **Do:** add `opengraph-image.png` (1200×630) to `/src/app` to auto-wire OG + Twitter tags.
4. **OpenClaw partner count contradiction: static surfaces say 4, DB-backed surfaces show 3** — `data.ts:107` + `page.tsx:148` + metadata (`page.tsx:12`) name OpenClaw, but `seed.ts` omits it from `partnersJson` (114, 175), the `sponsors` insert (36-56), and `eventSponsors` (144-146); it's only a workshop partner (`seed.ts:203-210`). Live DB cards undercount partners and drop a named co-host. **Do:** add OpenClaw to the three seed locations, or stop naming it as the 4th partner.
5. **OpenClaw logo asset does not exist** (`/public/brand/` has no openclaw file) while it's named as host throughout and absent from the hero "Hosted by" row (`page.tsx:273-292`) — the sponsor row will 404/render blank if it expects the logo. **Do:** add the wordmark SVG and put it in the hero row, or drop OpenClaw from host copy entirely.
6. **`NEXT_PUBLIC_*` vars are inlined at build time** — if absent when the Vercel build runs they are permanently `undefined` in the bundle (silent breakage, not a 500). **Do:** confirm `NEXT_PUBLIC_APP_URL` and all `NEXT_PUBLIC_*` are present in Production scope *before* triggering the build.
7. **No favicon/icon anywhere** (no `icon`/`favicon` in `src/app/`) — default browser globe in tabs and bookmarks on a launch-day landing page. **Do:** drop `icon.png`/`favicon.ico` into `src/app/`.
8. **No CI gate + half-built feature shipped hidden** (`.github/workflows` absent; commit `3bb8b6d` hides IDE/Workspace CTAs as "feature not ready"; date/prize copy churned right up to launch in `2a9913a`/`afbb65a`/`fb5cd94`). **Do:** re-verify deadline/prize text on the live page and add a minimal `npm ci && typecheck && test` GH Action as a deploy gate.

---

## Top 12 quick wins (under 15 min each)

1. **Add OG image** — drop `opengraph-image.png` (1200×630) into `/src/app/` (Next auto-wires OG + Twitter). *(assets, homepage)*
2. **Add favicon** — drop `icon.png`/`favicon.ico` into `src/app/`. *(homepage)*
3. **Fix duplicated-word typo** — `page.tsx:47` "how working the working demo actually is" (lives in public rubric data). *(homepage)*
4. **Fix off-brand contact email** — `events@agenthack.ai` at `page.tsx:689` (CTA "Sponsor inquiry") → a real BuilderShip/ship.builders address. *(homepage, prd-vs-built)*
5. **Add `.worktrees/` to `.gitignore`** and commit or stash `LAUNCH_PLAN.md` so the worktrees dir is never committed. *(ops)*
6. **Wire or remove the `/docs` ⌘K search input** — `src/app/docs/page.tsx:134` is a decorative `<input>` with no handler, implies search that doesn't exist. *(flows)*
7. **Add OpenClaw wordmark to hero "Hosted by" row** — `page.tsx:273-292` (requires the asset from QW #12 / risk #5). *(homepage, data)*
8. **Add OpenClaw to `seed.ts`** — `sponsors` insert, `partnersJson` (lines 114, 175), and `eventSponsors`. *(data)*
9. **Reconcile "no deadline" vs hard cutoff** — apply card's "no deadline drama" vs the firm June 12 cutoff stated two cards over. *(homepage)*
10. **Add stale-PRD banner** — one line at top of `/Users/colin/buildership/PRD.md` noting it describes a separate platform vision, not this landing page. *(prd-vs-built)*
11. **Verify the two non-BuilderShip Luma URLs** — `clawcamp-human-tech` (`data.ts:217`) and `clawcamp-5-18` (`data.ts:236`) point to different Luma pages than `luma.com/ship.builders`; confirm intentional, not stale. *(flows)*
12. **Remove duplicate `nebius-wordmark.svg`** — exists at both `/public/brand/nebius-wordmark.svg` and `/public/nebius-wordmark.svg` (drift risk); also compress hero `lobster-yacht-bridge.png` (2.1 MB) if time permits. *(assets)*

---

## Per-subsystem summary

**Homepage & meta** — Structurally complete and strong in voice: hero, countdown, stat cards, dual CTAs, and eight well-built sections (apply, schedule, perks, sponsors, judging, rubric, FAQ, CTA). The gaps are share/polish, not structure: no OG image and no favicon (both launch-relevant for a share-driven flow), a duplicated-word typo in the public rubric (`page.tsx:47`), an off-brand `events@agenthack.ai` mailto (`page.tsx:689`), and OpenClaw inconsistency (named as host everywhere but missing from the hero logo row). Smaller copy nits: primary CTA "Ship it right now →" jumps to `#apply` which is mostly "post on social," "beluga caviar" never reappears after the hero, and "no deadline" conflicts with the June 12 cutoff.

**Data & consistency** — Core facts are solid and consistent across `data.ts`/`seed.ts`/`page.tsx`: June 12 deadline, June 14 boat day, 40-builder capacity, $50K + DGX Spark prize, and the `luma.com/ship.builders` URL (no stale `/buildership` found). One major fault line: the partner roster. OpenClaw is the 4th partner in static surfaces (`data.ts:107`, `page.tsx:148`, metadata `page.tsx:12`) but absent everywhere in `seed.ts` (only a workshop partner), so DB-driven surfaces show 3 and static show 4. Compounding it, four different host/sponsor/organizer framings coexist (`data.ts:104` "Composio and Nebius," hero's 3 logos, `seed.ts:144` single host = Nebius, `page.tsx:534` "Each sponsor is an organizer").

**Flows & routes** — 30 routes total; the five inspected funnels are largely sound. The primary RSVP path (`/events/[slug]`) is correct and clear — renders "RSVP on Luma →" to `luma.com/ship.builders` in both hero and sidebar. No TODO/FIXME/XXX markers anywhere in `.tsx`. Issues are minor: the `/docs` ⌘K search box (line 134) is decorative-only and looks broken; the event schedule is hardcoded inline (T+0:00…T+7:00) so every event shows the same agenda; two non-BuilderShip events point to different Luma URLs (confirm not stale); and `/sponsors-only` is `noindex` but not auth-gated (acceptable if the link stays private) and carries an internal June 14-vs-29th date inconsistency before sending.

**Brand assets & share** — Hero, boat (10 JPGs), full brand SVG lockup set, and event PNGs all present; sponsor wordmarks for Composio, Nebius, Tavily exist. Two real gaps: **no OG image** exists in any conventional location (broken social previews — highest-impact), and **no OpenClaw asset** anywhere in `/public` (row will 404/blank if it expects one). Performance/hygiene notes: hero `lobster-yacht-bridge.png` is 2.1 MB and `wake-skyline.jpg` 904 KB (heavy above-the-fold), and `nebius-wordmark.svg` is duplicated in two locations. Hero image is `aria-hidden` decorative (empty alt), so it carries no SEO/accessibility text.

**Ops & deploy** — Highest concentration of launch-blockers. The `build` script runs `db:migrate && db:seed` against prod DB inside Vercel's build container — non-idempotent seed = failed deploys and concurrent-deploy races. Required env vars (`DATABASE_URL`, `AUTH_SECRET`, GitHub OAuth, Resend, `NEXT_PUBLIC_*`) must be set in Production or the build/homepage breaks; `NEXT_PUBLIC_*` must exist at build time or they're permanently undefined. No `vercel.json` (all config is dashboard defaults), and the BullMQ `worker` has no serverless entry — confirm it runs elsewhere. Branding drift in `package.json` (`codecruise`) and `.env.example` (`ClawCruise`) vs the live `BuilderShip`/`ship.builders`. No CI workflows exist — Vercel build is the only gate. Hygiene: `.worktrees/` should be gitignored; `LAUNCH_PLAN.md` is uncommitted.

**PRD vs built** — Severe divergence: the PRD documents a sprawling multi-product "Nebius Builders" platform (marketing site + builder app + event-manager + cloud IDE + workshops + 5-tier pricing + leaderboard/ELO), while the team shipped a single-page "BuilderShip" event landing — effectively two different companies. Shipped-but-not-in-PRD: the 5-axis rubric, the social-post application flow, the full June 12/14 schedule. PRD-promised-but-absent: workshops player (PRD's #1 Phase-1 deliverable), the cloud IDE + Nebius one-click deploy + judge telemetry (the PRD's entire competitive wedge), pricing, and the builder/event-manager apps. Tone clashes hard (enterprise B2B telemetry vs pirate/"walk the plank"/caviar/yacht), and sponsor lists barely overlap (PRD: Anthropic/AWS/GitHub/OpenAI/Telnyx/Wordware; site: Composio/Nebius/Tavily/OpenClaw). The PRD is effectively stale and will misalign anyone scoping from it.

---

## Open questions (for PM council)

1. **Is OpenClaw a BuilderShip co-host/sponsor or only a workshop partner?** This is the single most repeated contradiction (data #1/#2, homepage, assets #5). Resolving it cascades: seed rows, hero logo, a net-new wordmark asset, and all "Hosted by" copy. Need a decision before fixing anything downstream.
2. **What is the canonical host/sponsor/organizer model?** Four framings coexist — `data.ts:104` "Composio and Nebius" (2 hosts), hero's 3 logos, `seed.ts:144` single host (Nebius), `page.tsx:534` "Each sponsor is an organizer." Pick one and align copy + `role` values.
3. **Is the application flow actually "shipping" or "posting on social"?** Primary CTA "Ship it right now →" and apply step 01 "Register" both resolve to social-post / Luma, not a build/submit action. Positioning call: does the headline promise match the funnel?
4. **Hard deadline or "no deadline drama"?** The apply card's "no deadline" language directly conflicts with the firm June 12 cutoff stated two cards over. Which is the real policy?
5. **Should the stale PRD be reconciled or explicitly shelved?** The shipped product is a different scope entirely. Council call: rewrite PRD to the event reality, formally mark it as a separate platform vision, or accept the drift — and reconcile the divergent sponsor wall (Anthropic/AWS/OpenAI vs the 4 real sponsors) so investor/sponsor expectations match what ships.
6. **Is `/sponsors-only` (noindex, un-gated, contains pricing/tiers) safe to leave link-only,** or does it need auth before launch given it exposes internal pricing to anyone with the URL?
7. **Deliver or drop "beluga caviar"?** Named in the hero but never reappears in perks — either a perk to honor or a line to cut.