## Product PM verdict
**Yes with caveats.** From a conversion lens, the core funnel works: 30 routes resolve, the primary RSVP path (`/events/[slug]` → `luma.com/ship.builders`) is correct and consistent, and the voice is strong. But every share of this share-driven apply flow currently renders a blank card (no OG image) — that is a conversion bug, not polish, and it bleeds reach on day one. Two messaging contradictions ("no deadline drama" vs. a hard June 12 cutoff; "Ship it right now" CTA that actually means "post on social") will confuse the exact prospect we're trying to convert, and a 2.1 MB hero PNG punishes mobile LCP. None of these block the build; all of them tax the funnel. Fix the OG card and the two copy contradictions tonight and we launch clean.

## What I'd ship in v0.1 (must land before launch tomorrow)
- Add `opengraph-image.png` (1200×630) to `/src/app/` — blank social cards directly suppress click-through on a share-driven flow. (~20min)
- Resolve "no deadline drama" vs. June 12 cutoff in `src/app/page.tsx` — pick one (recommend: keep June 12, reframe as "one clean deadline, no extensions games"). Mixed signals kill apply intent. (~10min)
- Fix the "Ship it right now" CTA in `page.tsx` that jumps to "post on social" — either relabel the CTA to match the action or repoint it; a CTA that lies erodes trust at the decision moment. (~15min)
- Fix off-brand contact email `events@agenthack.ai` at `page.tsx:689` → a `ship.builders` address — wrong-brand email on the sponsor CTA reads as a copy-paste site. (~5min)
- Fix duplicated-word typo `page.tsx:47` ("how working the working demo") — visible in primary rubric copy. (~5min)
- Add `icon.png`/`favicon.ico` to `src/app/` — default globe in tab signals unfinished. (~5min)

## What I'd ship in v0.2 (high-leverage polish, land tonight)
- Reconcile OpenClaw host framing site-wide so cards don't undercount/imply a missing co-host — pick one model and align `data.ts:107`, `page.tsx:148`, hero row `page.tsx:273-292`, and `seed.ts` (or drop OpenClaw from host copy entirely if it's workshop-only). Reader-facing inconsistency erodes credibility.
- Compress hero `lobster-yacht-bridge.png` (2.1 MB) — direct mobile LCP / bounce win.
- Wire or remove the decorative `/docs` ⌘K input at `src/app/docs/page.tsx:134` — a search box that does nothing is a trust ding.

## What I'd ship in v0.5 (nice-to-have, AM if time permits)
- Decide on "beluga caviar" callback in `page.tsx` — either pay off the setup later in the page or cut the orphaned reference; minor delight/coherence.
- Verify the two non-BuilderShip Luma URLs (`data.ts:217`, `data.ts:236`) resolve to the intended pages — dead/wrong RSVP links are silent conversion leaks.
- Add a one-line FAQ entry covering the deadline + "what does shipping mean" once copy is reconciled — preempts the two questions prospects will actually ask.

## v1.5 / v2.0 (post-launch — note for later)
- Build a real apply funnel with on-site intent capture (email/waitlist) before the Luma handoff, so we own the lead and can measure drop-off rather than going dark at the boundary.
- Instrument the funnel (CTA clicks → Luma) with analytics; today there's zero visibility into where prospects fall off.
- Add a lightweight, dynamic OG image per event/cohort so every share is on-message as the program scales.

## Open question answers
3. **Shipping vs. posting:** The CTA must name the real action — if step one is "post your build on social," label it that ("Share what you built"), never "Ship it right now"; mismatched verbs cost trust at the exact conversion moment.
4. **Deadline:** Commit to the hard June 12 cutoff and kill the "no deadline drama" line — a real deadline drives urgency and conversion; the contradiction does neither.
7. **Beluga caviar:** Drop it unless it pays off within the same scroll — an orphaned luxury gag is friction, not delight, for a first-time visitor.