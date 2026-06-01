I have enough to assess. The PRD describes a sprawling multi-product "Nebius Builders" platform (marketing site + builder app + event-manager app + cloud IDE + workshops), while the shipped site is a single-page event landing for "BuilderShip" — a different product entirely.

## PRD vs shipped

| PRD section | Status | Note |
|---|---|---|
| H1 Hero + tagline ("operating layer for OpenClaw events") | ✗ | Site is an event landing ("Best builders of the bay"); rotating title, not PRD copy |
| 5-axis judging rubric | ✓+ | Not in PRD at all, but shipped on-site (`#rubric`): working demo, integration depth, usefulness, code quality, pitch |
| Application flow (post on social, tag) | ✓+ | Shipped (`#apply`, FAQ) — also absent from PRD |
| Schedule (June 12 / June 14) | ✓+ | Full timeline + finals-day schedule shipped; PRD has no dates |
| Sponsor stack | ⚠️ | Site: Composio, Nebius, Tavily, OpenClaw. PRD partner wall: Anthropic, AWS, GitHub, Nebius, OpenAI, Telnyx, Wordware — almost no overlap |
| Workshops surface (`/workshops`) | ✗ | PRD Phase 1 priority; not on home page |
| Cloud IDE + Deploy / Token Factory telemetry | ✗ | Core PRD wedge; absent |
| Builder Console / Teams / profile | ✗ | Only `/builders/login` links exist |
| Event-manager portal | ✗ | Absent |
| Pricing (5 tiers) | ✗ | Absent |
| Leaderboard / ELO | ⚠️ | Mentioned ("leaderboard June 13"); no page |

## Tone/positioning drift
Severe. PRD = enterprise B2B SaaS in clean Nebius brand grammar ("integration telemetry," "events flywheel"). Shipped = playful single-event hype (pirate/"walk the plank," "beluga caviar," kayak race, yacht). These read as two different companies. Product name changed Nebius Builders → BuilderShip. The PRD's explicit "no terminal/`.sh` motifs" rule is respected.

## Missing-from-site that PRD promised
1. **Workshops player + "Running OpenClaw on Nebius" seed** — PRD's #1 post-skeleton deliverable (Phase 1). Nowhere.
2. **Cloud IDE + one-click Nebius deploy + judge telemetry overlay** — the entire competitive wedge of the PRD. Absent.
3. **Pricing table + builder/event-manager apps** — the actual product surface; site is purely an event flyer.

## Risks
- The PRD is effectively stale — it documents a platform; the team shipped an event site. Anyone using PRD.md to scope work will be badly misaligned.
- Investor/sponsor mismatch: PRD promises Anthropic/AWS/OpenAI logos the site doesn't carry.
- Stray contact `mailto:events@agenthack.ai` (page.tsx:689) — wrong-brand leftover.

## Quick wins
- Add a one-line banner to PRD.md noting it describes a separate platform vision, not this landing page.
- Fix `events@agenthack.ai` to a real BuilderShip/sponsor address.
- Reconcile the sponsor list: either update PRD §H11 to the 4 real sponsors or add the missing logos.

Files: `/Users/colin/buildership/PRD.md`, `/Users/colin/buildership/src/app/page.tsx`, `/Users/colin/buildership/src/app/docs/page.tsx`.