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
| v2.0 — Triage + fix PRs | ⏳ running | fix-PR the fixable `build-fail` (VISU dep pin); clarifying comments on env-only / unfixable / empty |

**Scoreboard (27 repos): ✅ 13 runs-clean · 🔑 9 needs-secrets · ❌ 3 build-fail · ⬜ 2 empty → 22/27 PASS.**

**Where results land:** `smoke-test-campaign/RESULTS.md` (master table) +
`RUBRIC.md` (council rubric) + one GitHub issue per repo in its fork.

### v2.0 triage decision
- **Fix-PR (cheap, code):** `mmcp-trade-twins-infra` (VISU) — `fastapi-limiter==0.2.0`
  ships an empty `__init__`; re-pin to a version exporting `FastAPILimiter`.
- **Comment only — env gap, not a bug:** `eyeLike` (C++; needs cmake+OpenCV in the
  build env — code is fine).
- **Comment only — not cheaply fixable:** `Apex-AI` (pinned `moss` not on PyPI).
- **Comment only — empty:** `BillPayer` (docs-only), `WatchMyWallet` (committed prebuilt zip).

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

1. `git clone --depth 1` into an **isolated dir** `/tmp/st/<name>` (this is our
   "worktree" per repo — git worktrees are per-repo so they don't apply to
   external forks; isolated clone dirs give the same parallel isolation).
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

- `ScheduleWakeup` clamps to a 60s minimum, so true 30s ticks aren't possible.
  Primary signal is the **workflow-completion notification** (no polling needed);
  a long fallback wakeup guards against a hung run.

## Couldn't be forked earlier (out of scope here — no repo to test)

10 repos 404'd at fork time (private/deleted) incl. Watchstander (Top 5),
Actual Apple Intelligence & TurtleTalk (Top 10); 3 had no real repo URL incl.
"Own Your Agent's Work" (Top 5). See prior session summary.
