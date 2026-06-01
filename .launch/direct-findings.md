# Direct findings (pre-discovery)

Captured by the orchestrator agent before discovery workflow completed.
These are concrete, file-level observations from running checks directly.

## Confirmed launch blockers

### 1. No OG image — shared links will look broken on launch
**File:** `src/app/layout.tsx` lines 12-26
**Evidence:**
- `openGraph` and `twitter` metadata blocks set but **no `images` key**
- `twitter.card = "summary_large_image"` declared
- No `src/app/opengraph-image.{png,tsx}`, no `src/app/twitter-image.{png,tsx}`
- No `public/og*` or `public/opengraph*` or `public/twitter*` images
**Impact:** When Colin posts `ship.builders` on X/LinkedIn/iMessage tomorrow, the preview card will be **text only** (and on Twitter, the `summary_large_image` declaration without an image often renders as a broken/tiny card).
**Fix path (v0.1):** Add `src/app/opengraph-image.tsx` using Next.js ImageResponse with the lobster hero art and key BuilderShip messaging. Auto-doubles as Twitter image.

### 2. No favicon
**Evidence:** No `src/app/icon.*`, `src/app/favicon.*`, or `public/favicon.*`
**Impact:** Generic globe icon in browser tabs.
**Fix path (v0.1):** Drop a `src/app/icon.png` (Next App Router auto-routes it).

## Confirmed minor risks

### 3. No robots.txt / sitemap.xml
Not strictly launch-blocking, but SEO-cold-start is slower without them.
**Fix (v0.2):** `src/app/robots.ts` + `src/app/sitemap.ts`.

### 4. No vercel.json / vercel.ts
Not necessarily a problem — Next.js auto-detect handles it — but means there's
no explicit cron config, no rewrites, no cache headers. **Decision:** leave
unless council flags a need.

### 5. Build runs db:migrate + db:seed before next build
**File:** `package.json` scripts
**Evidence:** `"build": "npm run db:migrate && npm run db:seed && next build"`
**Risk:** If Vercel build env doesn't have `DATABASE_URL` set, build fails. If
seed has any non-idempotent insert that hits a conflict, build fails.
**Validate:** Confirm Vercel env vars include `DATABASE_URL` and the seed is
idempotent (it uses `onConflictDoUpdate` for events — looks OK).

## Confirmed: not blocking

- TypeScript `tsc --noEmit` clean (0 errors)
- 7 TODOs in tree; the visible one (`src/server/routers/projects.ts:161`) is a
  background worker queue, doesn't block the public homepage.
- No hardcoded localhost/example.com URLs in public-facing pages.

## Notes for the council

- Default theme is "orange" + dark, hardcoded in the theme script at
  `src/app/layout.tsx`. The hero looks great in dark; the page may render
  poorly if a user lands with light mode forced. Worth a quick check.
- The theme script is dense and untested — if anything breaks, it'll be subtle.
- The font set includes `Trade Winds` (the pirate-y display font) — confirm
  this is intentional brand voice or it'll feel costume-y to some visitors.
