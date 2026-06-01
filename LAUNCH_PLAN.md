# BuilderShip Launch Plan — handoff doc

> **Other agents:** this is your starting point. Read this in full, then check
> the **Status board** to see where the work stopped and the **Open worktrees**
> section to see what's in flight. Resume by picking the next undone item on
> the prioritized punch list (`/PUNCHLIST.md`, written by the synthesis phase).

## Goal

Review the plan for the event, the website copy, and operational details, and
ship every meaningful improvement we can land before the public launch
**tomorrow** (the Twitter/LinkedIn announcement post drops, the homepage and
event page go from soft-launch to canonical, and the Luma registration starts
collecting RSVPs at scale).

Source of the goal: `/goal` Stop-hook set 2026-05-28 by Colin.

## Operating model

### 1. PM Council (5 modes)

A "mode council" of five PM perspectives reviews the current state in
parallel. Each PM produces structured findings + a punch list. A synthesis
agent then merges into one prioritized punch list (`PUNCHLIST.md`).

| Mode | Focus | What it scores |
|---|---|---|
| **Product PM** | User journey, messaging clarity, conversion to RSVP | Hero copy, FAQ, application flow, RSVP friction, mobile UX |
| **Engineering PM** | Build/runtime/data reliability, launch-day risks | Type checks, broken links, dead routes, env vars, DB seeds, Vercel readiness |
| **Marketing/Growth PM** | Launch mechanics, share-ability, channel readiness | OG image, meta tags, share URL flow, X/LinkedIn assets, video CTA |
| **Designer PM** | Visual polish, hierarchy, AI-slop detection | Typography, spacing, color contrast, dark/light parity, hero imagery |
| **Risk/Ops PM** | Cancellation paths, refunds, legal, day-of safety | Boat capacity, waiver language, weather contingency, sponsor commitments |

### 2. Release roadmap (v0.1 → v2.0)

Each release is a separate worktree under `.worktrees/`. Worktrees let us work
on multiple parallel changes without conflicting and give us a clean commit
boundary to review before merging to `main`.

| Release | Window | Purpose | Branch / worktree |
|---|---|---|---|
| **v0.1** | tonight | Critical blockers found by council (broken links, typos, missing OG image, RSVP path bugs) | `.worktrees/v0.1-critical` |
| **v0.2** | tonight | High-value polish (copy tightening, FAQ adds, design micro-fixes) | `.worktrees/v0.2-polish` |
| **v0.5** | tonight or AM | Net-new content (sponsor docs cleanup, schedule clarity, social proof) | `.worktrees/v0.5-content` |
| **v1.0** | tomorrow AM | Launch tag — the announcement state of the site | `main` tagged `v1.0` |
| **v1.5** | first 24h post-launch | Reactive fixes from incoming feedback | `.worktrees/v1.5-reactive` |
| **v2.0** | week 1 post-launch | Structural improvements (e.g. real event registration backend, leaderboard, judge portal polish) | `.worktrees/v2.0-structural` |

Anything beyond v2.0 is out of scope for this goal.

### 3. Workflow phases

Run as separate `Workflow` invocations so each phase's output is human-visible
and the next phase's prompt can adapt.

1. **Discovery** — parallel readers map the current state. Output: structured
   inventory of pages, copy blocks, data entries, asset references, broken
   links, env vars, deploy config. Persisted to `/.launch/discovery.json`.
2. **Council** — 5 PM modes in parallel, each receiving the discovery
   inventory + an explicit lens prompt. Output: structured findings per PM.
   Persisted to `/.launch/council/<mode>.json`.
3. **Synthesis** — one senior-PM agent merges all 5 council outputs into a
   single prioritized punch list with severity, release-bucket assignment,
   and rough effort. Output: `PUNCHLIST.md`.
4. **Implementation** — per-release worktree agents. Each release worktree
   runs a `Workflow` that fans out non-conflicting tasks in parallel. Output:
   commits + diffs reviewed before merge.
5. **Review & merge** — code-reviewer agent reads each worktree diff. Approved
   diffs merge to `main` (v0.1, v0.2, v0.5 to land before v1.0 tag).

### 4. Timing

User asked for "30-second ticks" of progress. The runtime clamps wakeup
delays to 60s minimum, and `/goal` keeps me alive without explicit wakeups,
so the practical interpretation is: **frequent inline progress updates,
sequential workflows, no long blocking waits**. If I do need to wait on an
external (e.g. CI, deploy), I'll log it and move to parallel work.

## Status board

> Update this section as work progresses. Other agents read this to know where
> to resume.

| Phase | Status | Artifact | Started | Finished |
|---|---|---|---|---|
| Discovery | **DONE** (wf_24a26928-b9b) | `/.launch/discovery-synthesis.md` + `/.launch/raw-reports/` | 2026-05-28 | 2026-05-28 |
| Council | **DONE** (wf_3cacae24-015) | `/.launch/council/*.md` (5 PMs) | 2026-05-28 | 2026-05-28 |
| Synthesis | **DONE** | `/PUNCHLIST.md` | 2026-05-28 | 2026-05-28 |
| v0.1 critical | **MERGED to main** (9/12 done; 3 pending Colin) | `main` @ `cff0bd9` | 2026-05-28 | 2026-06-01 |
| v0.2 polish | **worktree ready** | `.worktrees/v0.2-polish` (branch `v0.2-polish`) | 2026-05-28 | |
| v0.5 content | **worktree ready** | `.worktrees/v0.5-content` (branch `v0.5-content`) | 2026-05-28 | |
| v1.0 launch tag | not started (needs v0.2 + v0.5 first) | `main` @ `v1.0` | | |
| v1.5 reactive | post-launch | `.worktrees/v1.5-reactive` | | |
| v2.0 structural | post-launch | `.worktrees/v2.0-structural` | | |

## Open worktrees

> Track active worktrees here. Format: `branch — purpose — last-commit-sha — owner-agent`.

**v0.1-critical** (merged + landed on main):
- Cohort 40 → 30 finalists (homepage, layout, OG, share-button, data, seed)
- Typo fix (page.tsx:47 "how working the working demo")
- Off-brand mailto (page.tsx:689 — agenthack.ai → collin@dabl.club)
- OG image (`src/app/opengraph-image.tsx` — 1200x630, lobster-yacht theme, ship.builders + sponsor wordmarks)
- Favicon (`src/app/icon.svg` — copy of public/brand/buildership-mark.svg)
- "no deadline drama" → "one clean deadline, no extension games"
- CTA "Ship it right now →" → "Show us your claws →" (matches section eyebrow)
- Auth slug bug fix (CODE_CRUISE_SLUG = "code-cruise" → BUILDERSHIP_SLUG = "buildership")
- Build decoupling: `build` is now just `next build`; `release` runs migrate+seed separately
- Satori display:flex hotfix on OG image

**v0.1 items deferred to Colin** (needs his input before I touch):
- Vercel Production env vars (DATABASE_URL, AUTH_SECRET, AUTH_GITHUB_*, NEXT_PUBLIC_*) — dashboard action
- OpenClaw resolution (council default = demote to workshop partner; Colin can override by confirming co-host commitment + supplying wordmark)
- `/sponsors-only` pricing intent confirmation (public OK, or needs auth?)

**v0.2-polish** (next, queued):
- CI gate (.github/workflows/ci.yml)
- Hero image compression (lobster-yacht-bridge.png 2.1 MB)
- /sponsors-only gating (pending Colin Q above)
- Wire/remove decorative ⌘K input on /docs
- Remove duplicate /public/nebius-wordmark.svg
- Twitter card creator/site handle

## Conventions for resuming agents

- Code voice: brand voice (em dashes OK, no AI slop vocabulary), see existing
  page copy for the standard.
- Commit voice: imperative, "why" in the body, sign with the
  `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` trailer.
- Deploy: pushes to `origin/main` trigger Vercel auto-deploy. **Do NOT push
  worktree branches to `main` without merging through PR or fast-forward
  from a reviewed branch.**
- Untouchables this sprint: anything in `src/server/db/` schema (migrations
  are risky pre-launch), anything that requires a real Composio/Nebius/Tavily
  API key (use mock data), the seed runs at build time so seed edits must be
  idempotent and tested.
- If you see `.proof/` directories — those are review artifacts from the
  `steipete/speaking` PR, leave alone.

## Decisions already made (don't re-litigate)

- Sponsor order on docs page: Composio first
- Sponsor logos in hero: Composio, Nebius, Tavily (in that order)
- Luma URL: `https://luma.com/ship.builders` (changed today; if you see
  `luma.com/buildership` anywhere, that's a bug — fix it)
- Tavily wordmark uses `dark:invert` (its SVG is dark-fill, opposite of
  Composio's white-fill SVG)
- BuilderShip event row added to `steipete/speaking` PR #2 (pending review)

## What "done" looks like

- v0.1 + v0.2 + v0.5 merged to main
- main tagged `v1.0`
- Vercel production deploy of `v1.0` verified green (homepage, /events/buildership, /docs all 200, no console errors)
- A short launch-readiness summary written to `/LAUNCH_READY.md` listing what was changed, what was deferred, and any known issues
