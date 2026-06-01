The data files don't include OpenClaw in the seed sponsors. Let me verify the LAUNCH_PLAN.md context and confirm there are no other OpenClaw references in the seed that I'm missing, but I have enough to produce the review. Let me check the partners arrays once more against page.tsx — the page hero lists 3 wordmarks but text says 4.

I have everything needed.

## Consistency check

| Fact | Status |
|---|---|
| Submission deadline June 12, 2026 | ✓ (data.ts:104, seed.ts:104/128, page.tsx throughout) |
| Boat day June 14, 2026 | ✓ (consistent everywhere) |
| Capacity 40 builders | ✓ (data.ts:105, seed.ts:110/132, page.tsx:309/357) |
| Prize $50K credits + DGX Spark | ✓ (data.ts:104, page.tsx:270/220); seed adds "+ a walk off the plank" (seed.ts:112/133) — stylistic, not a conflict |
| Luma URL luma.com/ship.builders | ✓ (data.ts:108, seed.ts:113/134, page.tsx:339) — no stale `/buildership` found |
| Partners: 4 (Composio, Nebius, Tavily, OpenClaw) | ✗ inconsistent — see below |
| Hosts vs sponsors language | ✗ inconsistent — see below |

## Inconsistencies found

1. **Partner count: 4 vs 3.** OpenClaw is the 4th partner in `data.ts:107` (BuilderShip `partners`), `page.tsx:148` (sponsor card), and metadata/copy ("Hosted by Composio, Nebius, Tavily, and OpenClaw", page.tsx:12). But it is **absent everywhere in seed.ts**: `partnersJson` only lists Nebius/Composio/Tavily (seed.ts:114, 175), the `sponsors` insert has 3 rows (seed.ts:36-56), and `eventSponsors` wires only 3 (seed.ts:144-146). OpenClaw appears in seed only as a *workshop partner* (seed.ts:203-210), not a BuilderShip sponsor. So DB-backed surfaces will show 3, static surfaces show 4.

2. **Hero wordmarks show only 3.** page.tsx:273-292 renders "Hosted by" with Composio, Nebius, Tavily wordmarks — OpenClaw missing, contradicting the adjacent metadata and FAQ tags that name 4.

3. **"Hosted by" vs "sponsoring" language clash.** data.ts:104 says "hosted by Composio and Nebius" (2 hosts). page.tsx:273 says "Hosted by" (3 logos). seed.ts:144 assigns Nebius `role: "host"`, Composio/Tavily `role: "primary"` (1 host). page.tsx:534 section titled "Sponsors & organizers" / "Each sponsor is an organizer." Four different framings of who hosts/sponsors/organizes.

## Risks

- Live site (DB-driven event cards, sponsor lists) will undercount partners as 3 and omit OpenClaw, while hero copy promises 4 — visible contradiction to applicants and to OpenClaw as a partner.
- Hero logo row missing OpenClaw reads as an oversight or a dropped sponsor.

## Quick wins

- Add OpenClaw to seed.ts: `sponsors` insert, `partnersJson` (lines 114, 175), and `eventSponsors`.
- Add OpenClaw wordmark to hero row (page.tsx:273-292).
- Pick one host model (data.ts:104 "Composio and Nebius" vs seed's single host) and align copy + `role` values.