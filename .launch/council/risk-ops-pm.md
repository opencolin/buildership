## Risk/Ops PM verdict
**Yes with caveats.** From a day-of-ops lens, the RSVP path that actually matters for June 14 boat day is sound: 30 routes resolve, `/events/[slug] → luma.com/ship.builders` is correct, and capacity/date/prize facts are internally consistent. But the launch carries two uncovered liabilities I will not sign off on silently. First, the **sponsor-commitment integrity problem** (Risks 4/5): we name OpenClaw as a host across static surfaces while DB cards undercount it and its logo 404s — a paying/co-hosting partner seeing themselves dropped or rendered as a broken image on launch day is a relationship incident, not a typo. Second, **`/sponsors-only` ships pricing un-gated** (Risk 6, open Q6): noindex is not access control, and a leaked sponsor-rate sheet is a commercial-exposure event with no "what if it leaks" answer on file. Neither is a build-breaker, but both are exactly the "have we said it?" gaps my lens exists to catch. Ship, but close these tonight.

## What I'd ship in v0.1 (must land before launch tomorrow)
- **Resolve OpenClaw host/sponsor truth** — pick "co-host" or "workshop partner only," then make `src/data.ts:107`, `src/app/page.tsx:12,148`, and `src/server/db/seed.ts` (partnersJson 114/175, sponsors 36-56, eventSponsors 144-146) agree. (~30min)
- **Add or remove OpenClaw logo** — if host, drop the wordmark in `/public/brand/`; if not, strip it from `page.tsx:273-292` so nothing 404s on the hero "Hosted by" row. (~15min)
- **Confirm seed idempotency** — verify `onConflictDoNothing`/upserts in `src/server/db/seed.ts` so the in-build seed can't crash a redeploy mid-day. (~20min)
- **Fix off-brand sponsor contact** — `src/app/page.tsx:689` `events@agenthack.ai` → a real ship.builders inbox; a dead/wrong sponsor-inquiry address on launch day loses leads. (~10min)

## What I'd ship in v0.2 (high-leverage polish, land tonight)
- **Gate or pre-clear `/sponsors-only` pricing** — at minimum confirm with Colin that the pricing sheet is OK to be publicly reachable; ideally add basic auth. `src/app/sponsors-only/` (route per synthesis). (~20min)
- **Reconcile "no deadline drama" vs hard June 12 cutoff** — pick one across apply card + copy; ambiguity drives refund/"but you said no deadline" disputes. `src/app/page.tsx`, `src/data.ts`. (~15min)
- **Verify the two non-BuilderShip Luma URLs** resolve to the intended pages — `src/data.ts:217` (clawcamp-human-tech), `src/data.ts:236` (clawcamp-5-18). (~10min)

## What I'd ship in v0.5 (nice-to-have, AM if time permits)
- **Stale-PRD banner** — one line atop `/Users/colin/buildership/PRD.md` so no sponsor/partner reads it as the live commitment. (~5min)
- **Hardcoded event schedule sanity check** — confirm the boat-day times in the schedule component match the real June 14 run-of-show. (~15min)
- **`.worktrees/` to `.gitignore`** and stash `LAUNCH_PLAN.md` — hygiene, no ops impact. (~5min)

## v1.5 / v2.0 (post-launch — note for later)
- **Weather/cancellation contingency surface** — a boat event has no rain-date or refund/cancellation policy anywhere on-site; add a published policy + a fast "event status" banner mechanism before the next sail.
- **Capacity/waitlist handling** — RSVP delegates entirely to Luma; define what happens at sellout and over-capacity at the dock (manifest vs. headcount).
- **Real sponsor CMS / access-controlled deal room** — replace the un-gated `/sponsors-only` page with authenticated sponsor materials.
- **CI deploy gate** — `.github/workflows` with `npm ci && typecheck && test` so day-of redeploys can't ship a broken build under time pressure.

## Open question answers
1. **OpenClaw role:** Treat as workshop partner only unless Colin confirms a signed co-host commitment — the seed data (its source of truth) already says partner, so default to the lower claim rather than over-promise a co-host.
2. **Canonical host/sponsor/organizer model:** One host (BuilderShip/ship.builders), tiered sponsors, workshop partners as a distinct third bucket — collapse the four coexisting framings into exactly these three.
4. **Deadline:** Hard June 12 cutoff stated plainly — "no deadline drama" is a refund/dispute liability and must go.
6. **`/sponsors-only` safety:** No — pricing reachable by URL is a commercial-exposure risk; gate it or get explicit sign-off that public pricing is intended before launch.