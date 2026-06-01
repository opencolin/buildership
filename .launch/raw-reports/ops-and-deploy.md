Everything I need is gathered. Here's the launch-day review.

---

## Env vars

App name mismatch worth flagging: `package.json` says `codecruise`, env defaults reference `ClawCruise`/`codecruise.events`, but recent commits are all `BuilderShip` / `ship.builders`. The `.env.example` is stale relative to the live branding.

**Required for the site to boot (M1):**
- `DATABASE_URL`, `DATABASE_URL_DIRECT` — Postgres
- `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` — Auth.js + GitHub OAuth
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` — magic-link
- `NEXT_PUBLIC_APP_URL`

**Would 500 the homepage on Vercel prod if missing:**
- `DATABASE_URL` — top suspect. `npm run build` runs `db:migrate` + `db:seed`; the build itself fails without it before a page ever renders.
- `AUTH_SECRET` — next-auth beta throws on missing secret in prod; any layout touching the session 500s.
- `NEXT_PUBLIC_*` are inlined at build — if absent at build time they're permanently `undefined` in the bundle (silent, not a 500, but broken).

Most optional vars (Redis, Pusher, R2, Nebius, Composio) are M2 and shouldn't crash the marketing homepage *unless* a server component imports them eagerly — worth a grep before launch.

## Build pipeline

`build` = `db:migrate && db:seed && next build`. **This is risky.** Running migrate+seed inside the Vercel build step means:
- Every prod deploy (and every preview deploy sharing the URL) runs `seed.ts`. If seed is not idempotent (no `onConflictDoNothing`/upsert), you get duplicate rows or a unique-constraint crash that **fails the entire deploy**.
- Migrations run from Vercel's build container against prod DB — concurrent deploys can race. Verify `seed.ts` before launch; ideally move migrate/seed to a one-off release command, not `build`.

## Vercel config

None. No `vercel.json` or `vercel.ts`. So build command, regions, function memory, and cron are all dashboard-only / defaults. The BullMQ `worker` has no serverless entry — it must run elsewhere (not Vercel functions); confirm it's deployed.

## Recent commit risk

- `3bb8b6d Hide IDE / Open Workspace CTAs (feature not ready)` — half-built feature shipped hidden.
- Churn on dates/prizes (`2a9913a`, `afbb65a`, `fb5cd94`) — copy was changing right up to now; re-verify deadline/prize text on the live page.
- **Uncommitted:** `LAUNCH_PLAN.md` (modified) and `.worktrees/` (untracked) — `.worktrees/` should be in `.gitignore` so it's never accidentally committed.

## Risks

1. `db:seed` in the build path can hard-fail prod deploys if non-idempotent.
2. Branding drift (`codecruise`/`ClawCruise` vs `BuilderShip`) in env + package name.
3. No CI (`.github/workflows` absent) — nothing runs `typecheck`/`test`/`lint` before deploy; Vercel build is the only gate.

## Quick wins

- Read `src/server/db/seed.ts` and confirm upserts before next deploy.
- Set all required env vars in Vercel **Production** scope now; redeploy.
- Add `.worktrees/` to `.gitignore`; commit or stash `LAUNCH_PLAN.md`.
- Add a minimal GH Action: `npm ci && npm run typecheck && npm run test`.