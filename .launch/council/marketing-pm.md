# Marketing/Growth PM verdict

**No — not without v0.1 landing first.** From a virality lens, this site has one fatal flaw: **there is no OG image** (risk 3, quick win 1). This is a share-driven apply flow whose entire CTA is "post on social," yet every X/Slack/iMessage share renders a blank or broken card. The launch *is* the OG image, and right now it doesn't exist. Worse, the partner story contradicts itself across surfaces (OpenClaw 4-vs-3, missing logo, missing seed entry), so the first thing a sharp follower notices is a co-host that's named but invisible — an instant credibility leak. The voice and structure are genuinely strong, but a launch tweet today would drive clicks to a card that looks broken and a "Hosted by" row that's incomplete. Land the four mission-critical fixes and this flips to a confident yes by tonight.

## What I'd ship in v0.1 (must land before launch tomorrow)
- **OG image** — add `opengraph-image.png` (1200×630) to `/src/app/`. This is THE launch asset. Must show: BuilderShip wordmark, date, prize hook, lobster motif. (risk 3, QW1)
- **Favicon** — drop `icon.png` into `/src/app/`. A default globe in the tab is a credibility tell on day one. (risk 7, QW2)
- **Resolve OpenClaw once** — pick "co-host" or "workshop partner" and make every surface agree: `src/server/db/seed.ts` (partnersJson 114/175, sponsors 36-56, eventSponsors 144-146), `src/app/page.tsx:148`, metadata `page.tsx:12`, `data.ts:107`. If co-host, the logo asset must exist or the hero row 404s. If not, strip the name everywhere. No contradiction can survive a screenshot. (risks 4, 5; QW8)
- **Off-brand contact email** — `page.tsx:689` `events@agenthack.ai` → a real `ship.builders` address. A competitor's domain in your sponsor CTA is a forwarded-screenshot embarrassment. (QW4)

## What I'd ship in v0.2 (high-leverage polish, land tonight)
- **Fix rubric typo** — `page.tsx:47` "how working the working demo actually is." Typos in the first screenshot get quote-tweeted. (QW3)
- **OpenClaw wordmark in hero "Hosted by" row** — `page.tsx:273-292` (only if you confirmed co-host in v0.1). (QW7)
- **Compress hero `lobster-yacht-bridge.png`** (2.1 MB) — `/public/`. LCP on the shared landing page; mobile clickers bounce on slow heroes. (QW12)
- **"Ship it right now" CTA honesty** — the button promises shipping but scrolls to "post on social." Align label to action so the share story isn't a bait-and-switch. (Homepage summary)

## What I'd ship in v0.5 (nice-to-have, AM if time permits)
- **Reconcile "no deadline drama" vs June 12 cutoff** — `page.tsx` apply card. Mixed urgency messaging weakens the share hook. (QW9)
- **Wire or remove `/docs` ⌘K input** — `src/app/docs/page.tsx:134`. Dead search erodes polish if a sharer deep-links docs. (QW6)
- **Twitter card `creator`/`site` handle** — add to `layout.tsx` so shares attribute back to the BuilderShip/Colin account and compound reach.
- **Verify non-BuilderShip Luma URLs** — `data.ts:217`, `data.ts:236`. (QW11)

## v1.5 / v2.0 (post-launch — note for later)
- **Dynamic per-event OG images** (`opengraph-image.tsx` route) so every `/events/[slug]` share renders its own titled card — turns each shared link into bespoke creative.
- **UTM + analytics instrumentation** on every share/RSVP CTA so you can actually measure which channel and which tweet converts.
- **"Wall of ships" social-proof surface** — embed accepted applicants' shared posts to make the apply-by-posting loop self-reinforcing.

## Open question answers
1. **OpenClaw co-host or workshop partner?** Pick one and make every surface match — but if there's no logo asset by tonight, demote to workshop partner so nothing renders blank in a screenshot.
3. **Shipping or posting on social?** Call it "ship + post" but make the CTA label match where it scrolls; today's bait-and-switch undercuts the share narrative.
4. **Hard deadline or no drama?** Keep the June 12 deadline — scarcity is the single best share/urgency driver; drop the "no deadline drama" line.
6. **Is `/sponsors-only` safe link-only?** No — pricing on an un-gated page is a forwarded-screenshot risk; at minimum keep it out of all shareable nav and OG metadata.
7. **Beluga caviar?** Keep it — one absurd, memorable detail is exactly the quotable hook that earns a screenshot; just make it pay off once on the page.