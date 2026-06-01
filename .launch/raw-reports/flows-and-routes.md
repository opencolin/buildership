Now I have everything. The grep confirms no TODO/FIXME/XXX markers in any `.tsx` file. The RSVP wiring is data-driven, and notably the BuilderShip event points to `luma.com/ship.builders` but two other events point to different Luma URLs.

## Route inventory

**30 routes** total (`page.tsx` files under `src/app`). The five inspected: public event detail (`/events/[slug]`), builder login (`/builders/login`), the internal sponsor pitch (`/sponsors-only`), sponsor docs hub (`/docs`), and the workshops index (`/workshops`).

## Per-flow notes

- **`/events/[slug]`** — Public event landing, the primary RSVP funnel. Anyone with the link arrives here. RSVP path is **correct and clear**: when `event.rsvpUrl` exists it renders "RSVP on Luma →" (hero + sidebar, both `target="_blank"`), and the BuilderShip event's `rsvpUrl` is `https://luma.com/ship.builders` (data.ts:108). Looks solid. One smell: the schedule block is hardcoded inline (T+0:00…T+7:00) rather than per-event, so every event shows the same agenda.
- **`/builders/login`** — Auth entry for builders submitting projects. Lands here from "Register →" (the no-RSVP fallback). Thin wrapper over `<LoginCard>`; fine. Not an RSVP path itself.
- **`/sponsors-only`** — Internal sponsor sales pitch, `noindex`. Intended audience: prospective co-hosts via direct link. No public RSVP (correct — CTAs are mailto + Cal.com). Dates read **June 3 → 14, 2026**, but the timeline cards say boat day is June 14 while the build/judging copy implies the 29th ("finalists named the night of the 29th") — internal date inconsistency worth a check before sending.
- **`/docs`** — Sponsor SDK quickstart hub. Audience: accepted builders. No RSVP needed. The "Search docs… (⌘K)" input is **non-functional** (plain `<input>`, no handler/⌘K binding) — looks broken to users.
- **`/workshops`** — Tag-filterable workshop video index. Audience: builders/public. No RSVP. Clean; empty-tag state is handled.

## Broken/stub flows

- **Docs search box** (`/docs` line 134): decorative only, implies search that doesn't exist.
- **No TODO/FIXME/XXX markers** anywhere in `.tsx` — nothing flagged in-code as launch-blocking.

## Risks

- **RSVP URL fragmentation:** BuilderShip → `luma.com/ship.builders`, but `clawcamp-human-tech` and `clawcamp-5-18` events (data.ts:217, 236) point to different Luma pages. Confirm those are intentional, not stale.
- **`/sponsors-only` is noindex but not auth-gated** — anyone with the URL sees pricing/tiers. Acceptable if the link stays private; flag if not.
- **Hardcoded event schedule** misrepresents non-BuilderShip events.

## Quick wins

1. Wire or remove the `/docs` ⌘K search input.
2. Reconcile the June 14 vs. 29th dates in `/sponsors-only`.
3. Verify the two non-BuilderShip Luma URLs are current.
4. Move the event schedule into per-event data so it isn't identical everywhere.