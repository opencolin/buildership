# Smoke-test results — BuilderShip forked repos

Generated from workflow `wf_312f5ae6-06c` (27 repos, one smoke agent each, isolated clone dirs).
Every repo also has a `🔬 Smoke test` issue on its `BuilderShip/<repo>` fork.

## Scoreboard

| Verdict | Count | Meaning |
|---|---|---|
| ✅ runs-clean | 13 | installs/builds, clear entrypoint, boots with no secret |
| 🔑 needs-secrets | 9 | build green; needs API keys/env to actually run (expected for these) |
| ❌ build-fail | 3 | entrypoint exists but install/compile/build errored |
| ⬜ empty | 2 | clones but no runnable source (docs-only / prebuilt-only) |

**PASS (runs-clean + needs-secrets): 22 / 27.** FAIL: 5.

## ✅ runs-clean — boots as-is  (13)

| Project | Fork | Stack | Run command | Secrets | Notes / first error |
|---|---|---|---|---|---|
| ★ Appeal Pilot | `appealpilot` [issue](https://github.com/BuilderShip/appealpilot/issues/1) | Node / Next.js 15.3.9 (App Router, React | `npm install && npm run build && npm run ` | no | No errors. npm ci --ignore-scripts exit 0 (362 pkgs). next build exit 0 (compiled, typechecked, 6 pages). Start probe: next start  |
| ★ Armo | `Armo` [issue](https://github.com/BuilderShip/Armo/issues/1) | Electron + Vite + React + TypeScript + P | `npm install && npm run dev  (build: npm ` | no | Install `npm install --ignore-scripts` exit 0 (~2s, 124 pkgs); build `npm run build` (electron-vite) exit 0 (~3s), bundled out/mai |
| ★ Stead | `buildday` [issue](https://github.com/BuilderShip/buildday/issues/1) | Python (stdlib http.server) — requiremen | `pip install -r requirements.txt && pytho` | no | Entrypoint app/server.py (Procfile: `web: python app/server.py`; render.yaml startCommand identical). Install exit 0 (~7s, 5 deps: |
| ★ Doberman | `Doberman-Core` [issue](https://github.com/BuilderShip/Doberman-Core/issues/1) | Python 3.11+ (pyproject.toml, hatchling) | `python3.13 -m venv .venv && .venv/bin/pi` | no | Isolated build in /tmp/st/Doberman-Core (now removed). Clone OK. System python is 3.9.6 but project requires >=3.11 and uses 3.11+ |
| ★ Enzo | `enzo` [issue](https://github.com/BuilderShip/enzo/issues/1) | Next.js 16.2.9 (App Router, Turbopack) + | `cd enzo && npm install && npm run build ` | no | None. npm ci --ignore-scripts exit 0 (~15s, 871 pkgs); npm run build exit 0 (~15s): compiled successfully, TypeScript no errors, 4 |
| ★ Autonomous Go-green | `go-green-ai-operator` [issue](https://github.com/BuilderShip/go-green-ai-operator/issues/1) | Next.js 15 (App Router) · React 19 · Typ | `npm install --ignore-scripts && npm run ` | no | No errors. npm ci rejected on lockfile drift (Missing: @cypress/request@3.0.10, transitive of an optional dep); npm install fallba |
| ★ Stowaway | `stowaway` [issue](https://github.com/BuilderShip/stowaway/issues/1) | Python (pyproject.toml, requires-python  | `make demo  →  python3 -m stowaway.cli au` | no | Entrypoint: stowaway/cli.py (main(); console script stowaway = "stowaway.cli:main"; python3 -m stowaway.cli works via __main__ gua |
| ★ GTM World Model Builder | `world-model-builder` [issue](https://github.com/BuilderShip/world-model-builder/issues/1) | Next.js 15.1.6 (App Router) · React 19 · | `npm install && npm run dev   (or npm run` | no | Clone OK. Node v22.22.3 / npm 10.9.8. `npm ci --ignore-scripts` exit 0 (114 pkgs); `npm run build` exit 0 (Compiled successfully,  |
| Claw VCS | `claw-vcs` [issue](https://github.com/BuilderShip/claw-vcs/issues/1) | Rust (Cargo workspace, 11 crates; editio | `cargo build -p claw-vcs --bin claw  (the` | no | Entrypoint: crates/claw/src/main.rs -> [[bin]] name="claw" (pkg claw-vcs). cargo build exit 0 in ~28s; start probe `claw --help` e |
| Cosmos Claw | `cosmos-claw` [issue](https://github.com/BuilderShip/cosmos-claw/issues/1) | Python 3.9 / FastAPI + uvicorn | `python3 -m venv .venv && .venv/bin/pip i` | no | No errors. pip install exit 0 (~5s); import app.main OK; uvicorn bound :8000 in ~1s; GET / returned HTTP 200. Only a benign urllib |
| Monetize Compute | `monetizecomputehackathon` [issue](https://github.com/BuilderShip/monetizecomputehackathon/issues/1) | Python (stdlib-only, no dependency manif | `python3 run.py --stake 5.00` | no | Entrypoint: run.py -> mc.loop.Agent + mc.server.serve (ThreadingHTTPServer on port 8901). NO dependency manifest by design: grep o |
| PCBlarp | `pcblarp` [issue](https://github.com/BuilderShip/pcblarp/issues/1) | Polyglot monorepo. Primary: Vite 8 + Rea | `npm install && npm run build && npm run ` | no | None. npm install --ignore-scripts exit 0 (236 pkgs); npm run build (vite build) exit 0, 83 modules, dist/ emitted; vite preview s |
| PDT | `pdt` [issue](https://github.com/BuilderShip/pdt/issues/1) | Python 3.11+ CLI (run-pdt) — hatchling b | `uv sync && uv run pdt --help  (server: u` | no | None. uv sync exited 0 (39 pkgs); import of pdt_cli.main + pdt_cli.server exited 0 with no ModuleNotFoundError; `pdt --help` start |

## 🔑 needs-secrets — green build, supply keys to run  (9)

| Project | Fork | Stack | Run command | Secrets | Notes / first error |
|---|---|---|---|---|---|
| ★ Leapfrogger.ai | `bricklist` [issue](https://github.com/BuilderShip/bricklist/issues/1) | Next.js 16.2.9 (App Router, output:stand | `npm install --ignore-scripts; (DATABASE_` | yes | Build is green (next build exit 0: compiled, TypeScript passed, 12/12 static pages, full route table). Only blocker is the require |
| ★ Clawed.chat | `clawed.chat` [issue](https://github.com/BuilderShip/clawed.chat/issues/1) | Node/Bun monorepo (Bun 1.3.13 + Hono bac | `bun install --frozen-lockfile && bun run` | yes | No build error. Install exit 0 (1538 pkgs, ~9.5s); bun run build exit 0 (dist/ emitted). App boot blocked only by startup env-guar |
| ★ Obi | `Local-First-Multimodal-File-Index-via-MCP` [issue](https://github.com/BuilderShip/Local-First-Multimodal-File-Index-via-MCP/issues/1) | Node ^22.13.0 (tested v22.22.3) — Electr | `cd local-rag && npm install && npx elect` | yes | No build error. Install (npm ci --ignore-scripts) exit 0; build (tsc --noEmit && vite build) exit 0, all artifacts emitted. Option |
| ★ Loopy | `loopy` [issue](https://github.com/BuilderShip/loopy/issues/1) | Python 3.10+ (tested 3.13.13); setuptool | `pip install -e ".[dev]"; loopy serve  (a` | yes | None. Install exit 0 (uv pip install -e .[dev], ~7s, equiv to pip). Build proxy: import loopy.completion_cli/server/config OK. Sta |
| ★ Taskbash | `taskbash` [issue](https://github.com/BuilderShip/taskbash/issues/1) | Next.js 15.5 (App Router, React 19) + Ty | `npm install --legacy-peer-deps && npm ru` | yes | next build: "Compiled successfully in 19.7s" + typecheck passed, then failed at page-data collection: "Error: Missing env: SUPABAS |
| Scout | `AdLabs2.0` [issue](https://github.com/BuilderShip/AdLabs2.0/issues/1) | Node.js + TypeScript CLI (ESM, "scout-ag | `npm ci --ignore-scripts && npm run build` | yes | No build error. tsc exit 0; dist/index.js emitted; `node dist/index.js --help` exit 0. Only a runtime env-guard fires on a real ru |
| Cisco analysis agent | `company-analysis-agent` [issue](https://github.com/BuilderShip/company-analysis-agent/issues/1) | Python 3.11 / FastAPI (backend; primary) | `cd backend && pip install -r requirement` | yes | No build error on the pinned Python 3.11. (Note: on Python 3.9 the import fails with TypeError: unsupported operand for \| at agen |
| FleetMind | `fleetmind` [issue](https://github.com/BuilderShip/fleetmind/issues/1) | Python 3.11+ / FastAPI (LangChain agent) | `cp backend/.env.example backend/.env (fi` | yes | Install exit 0 (pip check clean). Build proxy `python -c "import main"` hits runtime secret guard: openai.OpenAIError: api_key mus |
| Barbary Coast Marine | `maritime-compliance` [issue](https://github.com/BuilderShip/maritime-compliance/issues/1) | pnpm monorepo (Node >=20, pnpm 10.33.0); | `cp .env.example .env && docker compose u` | yes | No build error. Start-probe of node dist/server.js (no env) exited 1 with ERR_MODULE_NOT_FOUND packages/db/src/schema/index.js — a |

## ❌ build-fail — needs a fix  (3)

| Project | Fork | Stack | Run command | Secrets | Notes / first error |
|---|---|---|---|---|---|
| ★ VISU | `mmcp-trade-twins-infra` [issue](https://github.com/BuilderShip/mmcp-trade-twins-infra/issues/1) | Python 3.11+ / FastAPI (uvicorn) — prima | `cd mmcp-trade-twins && uvicorn api.main:` | yes | Install green on Py3.11 (uv pip install -r requirements.txt, exit 0). Entry module import fails: api/main.py:5 `from fastapi_limit |
| ApexAI | `Apex-AI` [issue](https://github.com/BuilderShip/Apex-AI/issues/1) | Python FastAPI backend (primary; root re | `cd backend && python -m uvicorn main:app` | yes | pip install -r requirements.txt exits 1: "Could not find a version that satisfies the requirement moss (from versions: none) / No  |
| eyeLike | `eyeLike` [issue](https://github.com/BuilderShip/eyeLike/issues/1) | C++ / OpenCV / CMake (webcam gaze tracke | `mkdir build && cd build && cmake ../ && ` | no | Build could not be configured: `cmake ../` -> "command not found: cmake" (exit 127). cmake, pkg-config, and OpenCV are all absent  |

## ⬜ empty — no runnable source  (2)

| Project | Fork | Stack | Run command | Secrets | Notes / first error |
|---|---|---|---|---|---|
| BillPayer | `BillPayer` [issue](https://github.com/BuilderShip/BillPayer/issues/1) | none (docs-only) | `none found` | no | Repo clones but contains only 2 doc files (README.md + a file named "Demo"), both just linking to a Google Slides demo video. No d |
| WatchMyWallet.org | `WatchMyWallet` [issue](https://github.com/BuilderShip/WatchMyWallet/issues/1) | Pre-built Vite + React SPA distribution  | `none — no dependency manifest and no sou` | no | No runnable source. Repo contains exactly one file: WatchMyWallet__.zip, a zipped Vite/React production build (hashed bundles, no  |

## v2.0 actions (triage + fixes)

| Repo | Action | Link |
|---|---|---|
| VISU (`mmcp-trade-twins-infra`) | **fix-PR** — re-pin `fastapi-limiter` 0.2.0→0.1.6 (import verified in Py3.11 venv) | [PR #2](https://github.com/BuilderShip/mmcp-trade-twins-infra/pull/2) |
| `eyeLike` | comment — build-fail was an env gap (cmake+OpenCV), not a code bug | [issue #1](https://github.com/BuilderShip/eyeLike/issues/1) |
| `Apex-AI` | comment — pinned `moss` isn't on PyPI; team must vendor/replace it | [issue #1](https://github.com/BuilderShip/Apex-AI/issues/1) |
| `BillPayer` | comment — empty (docs-only); push source | [issue #1](https://github.com/BuilderShip/BillPayer/issues/1) |
| `WatchMyWallet` | comment — only a committed prebuilt zip; push source | [issue #1](https://github.com/BuilderShip/WatchMyWallet/issues/1) |

_Note: the VISU fix agent initially committed its `.venv` into the branch; PR #2 was rebuilt to a clean +1/-1._

## Outreach to original repos

Posted a polite, verdict-personalized "thanks for building" issue on each
reachable **original** submitter repo (warm note + link to our fork's smoke-test
issue + their showcase page). **23 posted, 0 failed.** Log: `outreach.json`.

Not reached (3): `isgandarov/enzo` (original 404), `palontologist/eyeLike`
(issues disabled), `ChainMailGlobal/mmcp-trade-twins-infra` (original archived).
