## Engineering PM verdict

**No — not without v0.1 landing first.** Three of my four risk areas (1, 2, 6) are hard build-or-bundle failures that bite at deploy time, and they compound: the `build` script runs `db:migrate && db:seed && next build`, so a missing `DATABASE_URL` or a non-idempotent seed doesn't degrade gracefully — it red-X's the entire Vercel deploy and you have no site at all on launch morning. A missing `AUTH_SECRET` 500s every session-touching layout. Missing `NEXT_PUBLIC_*` vars fail silently and bake permanent `undefined` into the bundle, so you can't hotfix without a rebuild. None of this is visible in local dev. The good news: every blocker is config or a one-line guard, all landable tonight. Once env vars are confirmed in Vercel Production scope and the seed is proven idempotent, this becomes "Yes with caveats." Until then it's a coin-flip on whether the site exists tomorrow.

## What I'd ship in v0.1 (must land before launch tomorrow)

- **Set all M1 env vars in Vercel Production scope** (`DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`, every `NEXT_PUBLIC_*`) — verify in dashboard before triggering build (risks 2, 6). Cross-check against `.env.example`.
- **Prove `src/server/db/seed.ts` is idempotent** — confirm every insert uses upsert / `onConflictDoNothing`. Run it twice against a scratch DB; if the second run throws, it will throw on every redeploy (risk 1).
- **Decouple migrate/seed from build** in `package.json` — change `build` to just `next build`; run `db:migrate && db:seed` as a one-off release step. Removes the entire class of deploy-time DB failures (risks 1, 2).
- **Add `opengraph-image.png` (1200×630) to `/src/app/`** — every share renders a blank card otherwise (risk 3).
- **Re-verify live deadline + prize copy** on the deployed preview — churned in commits `2a9913a`/`afbb65a`/`fb5cd94` right up to launch (risk 8).

## What I'd ship in v0.2 (high-leverage polish, land tonight)

- **Minimal CI gate** — `.github/workflows/ci.yml` running `npm ci && typecheck && build` so a broken build is caught before it reaches Production (risk 8).
- **Add OpenClaw to `src/server/db/seed.ts`** (sponsors insert, `partnersJson` L114/175, `eventSponsors`) OR cut it from static surfaces — pick one, end the 3-vs-4 drift (risks 4, 5).
- **Add `icon.png`/`favicon.ico` to `src/app/`** (risk 7).
- **Add `.worktrees/` to `.gitignore`**, stash/commit `LAUNCH_PLAN.md` — don't ship the worktree dir.

## What I'd ship in v0.5 (nice-to-have, AM if time permits)

- Compress hero `lobster-yacht-bridge.png` (2.1 MB) in `/public/` — LCP risk on mobile launch traffic.
- Remove duplicate `nebius-wordmark.svg` (`/public/` vs `/public/brand/`).
- Fix off-brand mailto `events@agenthack.ai` at `src/app/page.tsx:689`.
- Wire or remove decorative `⌘K` input at `src/app/docs/page.tsx:134`.

## v1.5 / v2.0 (post-launch — note for later)

- Move seeding to an idempotent migration-based data pipeline; never let data mutation ride the build step.
- Add deploy preview smoke test + Vercel rollback runbook (one-command revert to last-good deployment) for the on-call dev.
- Add structured error monitoring (Sentry) — right now a runtime 500 is invisible until a user reports it.

## Open question answers

1. **OpenClaw:** From a data-integrity lens, treat it as workshop-partner-only and remove it from co-host copy — that's the version the DB can actually back without a missing asset 404'ing.
6. **`/sponsors-only`:** Not safe as-is — `noindex` is not access control; an un-gated route exposing pricing is one shared URL away from public, so either add basic auth or assume the pricing is already public.
8. **Deadline:** Pick the hard June 12 cutoff and delete "no deadline drama" — conflicting deadline copy is a support-ticket and trust generator on day one.