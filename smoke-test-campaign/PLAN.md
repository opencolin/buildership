# Smoke-test campaign — forked hackathon repos

**Goal (verbatim):** run a smoke test across all of the forked repos and keep
track of issues and successes, comment on GitHub issues. Fan out workflows and
use worktrees, use a mode council of project managers to decide and spin the
workflows using worktrees for all releases up to v2, use timers (30s ticks),
document all of the plans so other agents can pick up right where you left off.

**Owner org:** https://github.com/BuilderShip — 27 forked submission repos
(26 git forks + `enzo`, whose fork link detached). The `buildership` repo here
is the event website, NOT a target.

---

## Status board (update as you go)

| Phase | State | Notes |
|---|---|---|
| v0.1 — Inventory + access | ✅ done | 27 repos in `targets.tsv`; clone works (~3s); admin on org; issues enabled on forks as needed |
| v0.2 — PM council sets rubric | ✅ done | Run `wf_312f5ae6-06c`. 3 PM agents + chair → locked 6-verdict rubric (see `RUBRIC.md`) |
| v0.5 — Fan-out smoke tests | ✅ done | 27 Sonnet agents, isolated clone dirs. Verdicts below |
| v1.0 — GitHub issue per repo | ✅ done | 27 `🔬 Smoke test` issues filed + verified live (gh search) |
| v1.5 — Aggregate RESULTS.md | ✅ done | `RESULTS.md` written (master table grouped by verdict) |
| v2.0 — Triage + fix PRs | ✅ done | [PR #2](https://github.com/BuilderShip/mmcp-trade-twins-infra/pull/2) re-pins VISU's fastapi-limiter (clean, +1/-1); follow-up comments on the other 4 FAILs |

**Scoreboard (27 repos): ✅ 13 runs-clean · 🔑 9 needs-secrets · ❌ 3 build-fail · ⬜ 2 empty → 22/27 PASS.**

**Where results land:** `smoke-test-campaign/RESULTS.md` (master table) +
`RUBRIC.md` (council rubric) + one GitHub issue per repo in its fork.

### v2.0 outcomes (done)
- **Fix-PR:** VISU — [PR #2](https://github.com/BuilderShip/mmcp-trade-twins-infra/pull/2)
  re-pins `fastapi-limiter` 0.2.0→0.1.6 (0.2.0 ships an empty `__init__`); import
  verified green in a Py3.11 venv. (The fix agent first committed its `.venv`; the
  branch was rebuilt to a clean +1/-1 — watch for this in future fix agents.)
- **Comment — env gap, not a bug:** `eyeLike` (needs cmake+OpenCV in the build env).
- **Comment — not cheaply fixable:** `Apex-AI` (pinned `moss` not on PyPI).
- **Comment — empty:** `BillPayer` (docs-only), `WatchMyWallet` (committed prebuilt zip).

All five FAIL issues now carry a v2.0 follow-up comment. **Campaign complete.**

---

## How to resume (for the next agent)

1. Read this file + `RESULTS.md` (if present) for what's already classified.
2. Target list is `targets.tsv` — `fork-name <TAB> FINALIST|- <TAB> project`.
   Finalists are listed first (test those first).
3. Re-run the smoke workflow: `Workflow({scriptPath: "<session>/.../smoke-*.js"})`
   — agents are idempotent (they skip a repo whose `🔬 Smoke test` issue already
   exists). Or smoke a single repo by hand with the rubric below.
4. The DB connection + masking pattern is in the repo's CLAUDE/session memory.

---

## Smoke-test rubric (baseline — refined by the PM council in v0.2)

Per repo `BuilderShip/<name>`:

1. `git clone --depth 1` into an isolated dir `/tmp/st/<name>` (the smoke phase
   used isolated clone dirs for parallel isolation; the v2.1 pass below uses real
   `git worktree`s — clone once, `git worktree add` per branch/release).
2. Detect stack from manifests: `package.json` (Node), `pyproject.toml` /
   `requirements.txt` (Python), `go.mod` (Go), `Cargo.toml` (Rust),
   `index.html` (static), `Dockerfile`.
3. Find the run command: package.json `scripts` (dev/start/build), Python entry
   (`main.py`/`app.py`/`manage.py`/uvicorn), `Procfile`, `Dockerfile`, README.
4. Note required secrets: `.env.example` or README mentions of API keys →
   `needsSecrets`.
5. **Best-effort build** (timeouts, isolated, `npm install --ignore-scripts`
   first to limit postinstall risk):
   - Node: install → `npm run build` (if a build script exists).
   - Python: venv + `pip install` of requirements/pyproject.
   - Go: `go build ./...`.
   - Static/Docker: inspect only (don't build images).
6. **Classify** (`result`):
   - `runs-clean` — installs/builds and has a clear entrypoint; would start.
   - `needs-secrets` — builds, but needs API keys/env to actually run.
   - `build-fail` — install or build errored (capture first error).
   - `no-entrypoint` — no clear runnable app (library/docs/empty scaffold).
   - `empty` — essentially no code.
   - `clone-fail` — repo unreachable.
7. Open/Update a GitHub issue on the fork with the verdict.

## Safety notes

- Smoke-testing executes untrusted hackathon code. Mitigations: isolated `/tmp`
  clone dirs, hard timeouts on every step, `--ignore-scripts` on npm install,
  no Docker image builds, no privileged ops. Residual risk: build/run steps run
  repo code. These are the organizer's own event submissions (semi-trusted).

## Timer / cadence

- During background workflows: drove off **workflow-completion notifications**
  with 270s `ScheduleWakeup` backstops (that tool floors at 60s).
- **True 30-second ticks** (v2.1): implemented with a `Monitor` heartbeat timer
  (`while …; do echo tick; sleep 30; done`) — Monitor has no 60s floor, so it
  emits a real tick every 30s. Ran during the v2.1 worktree verification.

## v2.1 — literal-compliance pass (real worktrees + 30s ticks)

Two literal requirements were initially substituted; this pass does them for real:
- **Git worktrees:** spun **8 real `git worktree`s**. The VISU v2 fix was verified
  side-by-side in two worktrees of one clone — `master` (`fastapi-limiter==0.2.0`)
  → **ImportError**, `fix/smoke-test-build` (`0.1.6`) → **import OK**. PASS repos
  re-checked each in its own worktree across stacks (Node `appealpilot`, Python
  `loopy`, Rust `claw-vcs`).
- **30-second ticks:** `Monitor` timer (task emitted `tick N/11 @ … — git worktrees
  active: 2` every 30s) paced the pass.

## v2.2 — Nebius-fit deep-dive (worktree-native workflow + 30s ticks)

Workflow `wf_2c83a302-386` — **14 agents, each `isolation: 'worktree'`** (real git
worktrees of this repo, paths confirmed `.claude/worktrees/wf_2c83a302-386-N`) —
deep-read each forked finalist to firm up Nebius Token Factory / AI Cloud fit.
A `Monitor` **30-second heartbeat** (6 ticks at 30s cadence) paced the run.
Findings → `BuilderShip-Finalists-Nebius-Fit.xlsx` (repo root) + `deepdive.json`:
- **10–11 of 14 forked finalists already integrate Nebius** (Appeal Pilot →
  `NEBIUS_BASE_URL`, Leapfrogger → `api.tokenfactory.nebius.com`, Stead → Nebius
  backend **+ an H100 Whisper LoRA fine-tune** on AI Cloud).
- Verified scores corrected the analyst AI Cloud estimates **down** (forked MVPs
  are mostly API-only): true GPU need concentrates on **Stead** (and VISU).
- Token Factory is the dominant fit; the GPU-heavy projects (Watchstander, OORB,
  Mocap, Wharton, TeraQub) weren't forkable so remain analyst estimates.

## Couldn't be forked earlier (out of scope here — no repo to test)

10 repos 404'd at fork time (private/deleted) incl. Watchstander (Top 5),
Actual Apple Intelligence & TurtleTalk (Top 10); 3 had no real repo URL incl.
"Own Your Agent's Work" (Top 5). See prior session summary.
