## Asset inventory
**Hero** (`/public/hero/`): one image — `lobster-yacht-bridge.png` (2.1 MB). Filename suggests a lobster mascot on a yacht near a bridge — the AgentHack/ClawCruise lobster-on-a-boat theme.

**Boat** (`/public/boat/`, 10 imgs, JPG): aerial-docked, bay-profile, bow-sunset-bridge, galley-interior, marina-sunset, night-lights, rainbow-cruising, wake-skyline, yacht-bow, yacht-bridge. `wake-skyline.jpg` is heavy at 904 KB.

**Brand** (`/public/brand/`): full lockup/wordmark/mark SVG set, plus event PNGs (agenthack, clawcruise, buildship, foundership).

**Sponsor logos:** composio ✓ (`composio-wordmark.svg`), nebius ✓ (`nebius-wordmark.svg`, also duplicated at `/public/nebius-wordmark.svg`), tavily ✓ (`tavily-wordmark.svg`, added May 21). **openclaw ✗ — no openclaw asset exists** in `/public/brand/` or anywhere in `/public`.

**Venues** (`/public/venues/`): bicycle, farmhouse, plank subdirs (not enumerated this pass).

**Hero reference** — `page.tsx:248` uses `/hero/lobster-yacht-bridge.png`, rendered `aria-hidden` as a decorative background (empty `alt`), so it carries no SEO/accessibility text.

## OG/share readiness
**No OG image exists.** None of `/og.png`, `/og-image.png`, `/opengraph-image.png`, or any `opengraph-image.*` / `twitter-image.*` was found in `/public` or `/src/app`. Links shared to Slack/X/iMessage will render with no preview card — a real liability for an event/RSVP page.

## Risks
- **Missing OG image** = broken social-share previews (highest-impact gap for a shareable launch page).
- **openclaw logo absent** — if the sponsor row expects it, it will 404 or render blank.
- **Oversized assets:** hero `lobster-yacht-bridge.png` (2.1 MB) and `wake-skyline.jpg` (904 KB) are large for above-the-fold; several boat JPGs exceed 450 KB.
- **Duplicate** `nebius-wordmark.svg` in two locations — minor drift risk.

## Quick wins
- Add `opengraph-image.png` (1200×630) to `/src/app` so Next auto-wires OG + Twitter tags.
- Compress the hero PNG (or convert to WebP/AVIF) to cut LCP weight.
- Confirm whether openclaw is an expected sponsor; add the wordmark or drop it from the row.