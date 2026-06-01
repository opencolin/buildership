## Designer PM verdict

**No — not from my lens, not without the two free wins below.** The page itself is structurally complete with a strong, opinionated voice and a heavy hero — that part reads "made by a human with taste," not Bootstrap 3. But the *2-second impression* this launch optimizes for happens off-page: in a Slack/X/iMessage unfurl, on a browser tab, in a sponsor logo row. Right now there is **no OG image** (blank/broken card on every share of a share-driven apply flow), **no favicon** (default browser globe), and a **named co-host with no logo asset and no presence in the hero row**. For an event whose entire growth loop is "post it and tag people," shipping a blank unfurl is a self-inflicted wound. These are 30-minute fixes. Fix the share surface and the OpenClaw asset, and I flip to Yes-with-caveats.

## What I'd ship in v0.1 (must land before launch tomorrow)
- **OG image** — add `opengraph-image.png` (1200×630) to `/src/app/`; Next auto-wires OG + Twitter. Highest-leverage single asset on the whole site. (~30min incl. export)
- **Favicon** — drop `icon.png` into `/src/app/`. Kills the default globe. (~10min)
- **Resolve the OpenClaw logo gap** — `/public/brand/` has no OpenClaw file, but it's named host in the hero "Hosted by" row (`src/app/page.tsx:273-292`). Either add the wordmark or pull the name from that row so it doesn't 404/render a blank slot. Visual-parity blocker. (~20min)
- **Fix rubric typo** — `src/app/page.tsx:47` "how working the working demo actually is." Visible copy, reads sloppy. (~5min)
- **Fix off-brand mailto** — `events@agenthack.ai` at `src/app/page.tsx:689`. A competitor's domain in your sponsor CTA is a taste/trust tell. (~5min)

## What I'd ship in v0.2 (high-leverage polish, land tonight)
- **Compress hero** — `lobster-yacht-bridge.png` is 2.1 MB. On a slow connection the hero paints late and the first impression is a white box. Export to optimized PNG/WebP. (~15min)
- **Reconcile OpenClaw in DB** — `src/server/db/seed.ts` (sponsors insert, partnersJson L114/175, eventSponsors) so live cards don't undercount hosts. Visual count must match the static brand row. (~20min)
- **Wire or hide the /docs ⌘K input** — `src/app/docs/page.tsx:134` is a decorative input with no handler; a dead search box reads "AI assistant default / unfinished." Make it a real link or remove the affordance. (~15min)
- **Remove duplicate** `nebius-wordmark.svg` (`/public/` vs `/public/brand/`) so the asset row pulls one canonical mark. (~5min)

## What I'd ship in v0.5 (nice-to-have, AM if time permits)
- **"Ship it right now" CTA** jumps to "post on social" — tighten the copy/anchor so the visual promise matches the action (`src/app/page.tsx`).
- **Dropped motifs** — "beluga caviar" and the social-share framing appear once and never pay off; either thread them through or cut for a cleaner read.
- **Dark/light parity sweep** — quick pass over the hero, sponsor row, and apply card in both modes to confirm no washed-out logos or low-contrast text.

## v1.5 / v2.0 (post-launch — note for later)
- **Real OG system** — move from a static PNG to a dynamic `opengraph-image.tsx` (per-event title/date/host), so every future event share is on-brand automatically.
- **Brand-asset pipeline** — normalize all sponsor/host logos to one directory, one format, with light/dark variants; kill the `/public` vs `/public/brand` split that caused the duplicate and the missing-asset bug.
- **Design-token pass** — codify spacing/type/color into tokens so the "made by a human" polish survives the next ten content edits without drift.

## Open question answers
1. **OpenClaw host vs partner:** From the visual contract, it's currently presented as a host everywhere *except* where it counts (asset + hero row + DB) — pick host and make all surfaces match, or demote to workshop partner; the half-state is the worst option.
4. **Hard deadline vs "no deadline drama":** The apply card's "no deadline drama" undercuts urgency and contradicts June 12 — keep one firm cutoff, visibly stated near the CTA.
5. **Stale PRD:** Shelve it — add the one-line stale banner to the top of `/Users/colin/buildership/PRD.md` so nobody mistakes a different platform vision for this page; it's not a launch surface, so don't spend reconciliation time tonight.
7. **"Beluga caviar":** Drop it — a motif that appears once and never returns reads like an un-edited first draft, which is exactly the AI-slop tell my lens flags.