# BuilderShip Launch Punch List

*Head of Product synthesis — 5 council verdicts (Product, Engineering, Marketing/Growth, Designer, Risk/Ops) + discovery. Default bias: ship clean tomorrow.*

**Verdict tally:** 2 "Yes with caveats" (Product, Risk/Ops), 3 "No until v0.1 lands" (Engineering, Marketing, Designer). Unanimous: **v0.1 must land tonight before we launch.** The OG image and OpenClaw resolution are flagged by all 5.

---

## Council decisions (resolved open questions)

1. **Is OpenClaw a co-host/sponsor or only a workshop partner?**
   **Resolution: Workshop partner only.** The seed DB — the source of truth — already classifies it as a workshop partner, and no logo asset exists. Four of five PMs (Eng, Marketing, Risk/Ops, Designer) default to the lower claim rather than over-promise a co-host we can't render. *Override path:* if Colin confirms a signed co-host commitment AND supplies a wordmark tonight, promote everywhere. Absent both, demote to workshop partner and strip the name from all host surfaces so nothing 404s in a screenshot.

2. **What is the canonical host/sponsor/organizer model?**
   **Resolution: Three buckets, per Risk/Ops.** One host (BuilderShip / ship.builders), tiered sponsors, and workshop partners as a distinct third category. Collapse the four coexisting framings into exactly these three across all surfaces.

3. **Is the application flow "shipping" or "posting on social"?**
   **Resolution: Name the real action.** Unanimous among the PMs who weighed in (Product, Marketing, Designer): the CTA must match where it scrolls. If step one is "post your build," the button says "Share what you built" (or "Ship + post"), never "Ship it right now" pointing at a social anchor. A CTA that lies costs trust at the conversion moment.

4. **Hard deadline or "no deadline drama"?**
   **Resolution: Hard June 12 cutoff, stated plainly. "No deadline drama" line is deleted.** All five PMs agree. Recommended reframe (Product): "one clean deadline, no extension games." Beyond conversion, Risk/Ops flags the contradiction as a refund/dispute liability — it must go.

5. **Reconcile or shelve the stale PRD?**
   **Resolution: Shelve it.** Add a one-line stale banner atop `PRD.md` noting it describes a separate platform vision, not this landing page. Not a launch surface — spend zero reconciliation time tonight (Designer, Risk/Ops).

6. **Is `/sponsors-only` (noindex, un-gated, contains pricing) safe link-only?**
   **Resolution: No.** `noindex` is not access control. *Disagreement on remedy:* Eng/Risk-Ops want basic auth ideally; Marketing wants it stripped from all shareable nav + OG metadata. **Default that ships tonight:** get explicit sign-off from Colin that public pricing is intended (fastest), AND keep the route out of all shareable nav/OG. If Colin says pricing is NOT meant to be public, add basic auth before launch. Erring toward shipping: the one-line Colin confirmation unblocks launch without code.

7. **Deliver or drop "beluga caviar"?**
   **Resolution: Drop it — unless it pays off within the same scroll.** *Disagreement:* Marketing argues to keep it (an absurd, quotable detail earns the screenshot). Product, Designer favor cutting an orphaned reference that reads as an unedited first draft / AI-slop tell. **Default (errs toward shipping the cleaner read):** cut it tonight if reconciliation takes more than a trivial edit; if a one-line payoff is fast, keep + pay it off. Not a blocker either way — lands in v0.5.

---

## v0.1 — critical pre-launch (TONIGHT, blocks launch)

1. **Set all M1 env vars in Vercel Production scope** — `Vercel dashboard` (cross-check `.env.example`) — confirm `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL` and every `NEXT_PUBLIC_*` are set in Production *before* triggering build; missing DB/secret red-X's the deploy, missing `NEXT_PUBLIC_*` bakes permanent `undefined`. — **S** — Engineering *(risks 2, 6)*.
2. **Decouple migrate/seed from build** — `package.json` — change `build` to just `next build`; run `db:migrate && db:seed` as a one-off release step to remove the entire class of deploy-time DB failures. — **S** — Engineering *(risks 1, 2)*.
3. **Prove `seed.ts` is idempotent** — `src/server/db/seed.ts` — confirm every insert uses upsert / `onConflictDoNothing`; run twice against a scratch DB and verify the second run doesn't throw. — **M** — Engineering, Risk/Ops *(risk 1)*.
4. **Add OG image** — `src/app/opengraph-image.png` (1200×630; BuilderShip wordmark, date, prize hook, lobster motif) — Next auto-wires OG + Twitter; every share of this share-driven flow currently renders blank. — **S** — **all 5 PMs** *(risk 3)*.
5. **Add favicon** — `src/app/icon.png` — kills the default browser globe on a launch-day tab. — **S** — Marketing, Designer, Engineering *(risk 7)*.
6. **Resolve OpenClaw to one model (workshop partner) across all surfaces** — `src/data.ts:107`, `src/app/page.tsx:12,148`, `src/app/page.tsx:273-292` (hero row), `src/server/db/seed.ts` (partnersJson L114/175, sponsors L36-56, eventSponsors L144-146) — make every surface agree; no contradiction survives a screenshot. — **M** — **all 5 PMs** *(risks 4, 5)*.
7. **Add or remove OpenClaw logo to match the decision** — `/public/brand/` (add wordmark) **or** `src/app/page.tsx:273-292` (strip from hero "Hosted by" row) — prevents a 404/blank slot. Per Q1 default: strip. — **S** — Designer, Marketing, Risk/Ops *(risk 5)*.
8. **Resolve "no deadline drama" vs June 12 cutoff** — `src/app/page.tsx`, `src/data.ts` — keep the hard June 12 deadline, delete the "no deadline drama" line; reframe as "one clean deadline." — **S** — **all 5 PMs** *(risk, open Q4)*.
9. **Fix "Ship it right now" CTA mismatch** — `src/app/page.tsx` — relabel the CTA to match the action it scrolls to ("Share what you built" / "Ship + post"), or repoint it. — **S** — Product, Marketing, Designer *(open Q3)*.
10. **Fix off-brand contact email** — `src/app/page.tsx:689` — `events@agenthack.ai` → a real `ship.builders` address; a competitor's domain on the sponsor CTA is a forwarded-screenshot embarrassment and loses leads. — **S** — Product, Marketing, Designer, Risk/Ops.
11. **Fix duplicated-word typo** — `src/app/page.tsx:47` — "how working the working demo actually is" in primary rubric copy; typos in the first screenshot get quote-tweeted. — **S** — Product, Marketing, Designer.
12. **Re-verify live deadline + prize copy on the deployed preview** — deployed preview of `src/app/page.tsx` — copy churned in commits `2a9913a`/`afbb65a`/`fb5cd94` right up to launch; confirm the live page is correct. — **S** — Engineering *(risk 8)*.

---

## v0.2 — high-leverage polish (TONIGHT, ship before sleep)

1. **Minimal CI gate** — `.github/workflows/ci.yml` — `npm ci && typecheck && build` so a broken build is caught before Production; critical given day-of redeploys under time pressure. — **S** — Engineering, Risk/Ops *(risk 8)*.
2. **Compress hero image** — `/public/lobster-yacht-bridge.png` (2.1 MB → optimized PNG/WebP) — direct mobile LCP/bounce win on shared landing traffic. — **S** — all 5 PMs touched it (Product, Eng, Marketing, Designer) *(quick win 12)*.
3. **Gate or pre-clear `/sponsors-only` pricing** — `src/app/sponsors-only/` — get Colin's explicit sign-off that public pricing is intended AND keep the route out of shareable nav/OG; add basic auth if not meant to be public. — **M** — Risk/Ops, Engineering, Marketing *(open Q6)*.
4. **Add OpenClaw wordmark to hero row** *(only if promoted to co-host in v0.1; otherwise skip — already stripped)* — `src/app/page.tsx:273-292`. — **S** — Marketing, Designer *(quick win 7)*.
5. **Wire or remove the decorative `/docs` ⌘K input** — `src/app/docs/page.tsx:134` — a search box with no handler reads "AI-default / unfinished"; make it a real link or remove the affordance. — **S** — Product, Designer, Engineering *(quick win 6)*.
6. **Remove duplicate `nebius-wordmark.svg`** — `/public/nebius-wordmark.svg` vs `/public/brand/nebius-wordmark.svg` — keep one canonical mark. — **S** — Designer, Engineering *(quick win 12)*.
7. **Add `.worktrees/` to `.gitignore` + stash/commit `LAUNCH_PLAN.md`** — `.gitignore` — don't ship the worktree dir. — **S** — Engineering, Risk/Ops *(quick win 5)*.
8. **Add Twitter card `creator`/`site` handle** — `src/app/layout.tsx` — attribute shares back to the BuilderShip/Colin account to compound reach. — **S** — Marketing.

---

## v0.5 — nice-to-have (AM tomorrow if time permits)

1. **Resolve "beluga caviar"** — `src/app/page.tsx` — cut the orphaned reference, or pay it off once within the same scroll (see Q7 — Marketing dissents toward keeping). — **S** — Product, Designer, Marketing.
2. **Verify the two non-BuilderShip Luma URLs** — `src/data.ts:217` (clawcamp-human-tech), `src/data.ts:236` (clawcamp-5-18) — confirm they resolve to the intended pages; dead/wrong RSVP links are silent conversion leaks. — **S** — Product, Marketing, Risk/Ops *(quick win 11)*.
3. **Add stale-PRD banner** — `PRD.md` (top) — one line noting it describes a separate platform vision, not this landing page. — **S** — Designer, Risk/Ops *(quick win 10)*.
4. **Add an FAQ entry: deadline + "what does shipping mean"** — `src/app/page.tsx` — once copy is reconciled, preempt the two questions prospects will actually ask. — **S** — Product.
5. **Hardcoded event schedule sanity check** — event schedule component — confirm boat-day times match the real June 14 run-of-show. — **S** — Risk/Ops.
6. **Dark/light parity sweep** — hero, sponsor row, apply card — quick pass in both modes for washed-out logos / low-contrast text. — **S** — Designer.

---

## v1.5 — post-launch reactive (week 1)

- **Instrument the funnel** — UTM + analytics on every share/RSVP CTA (CTA clicks → Luma); today there is zero visibility into where prospects drop off. *(Product, Marketing)*
- **On-site intent capture** — email/waitlist before the Luma handoff so we own the lead and can measure drop-off rather than going dark at the boundary. *(Product)*
- **Structured error monitoring** — add Sentry; a runtime 500 is currently invisible until a user reports it. *(Engineering)*
- **Deploy preview smoke test + Vercel rollback runbook** — one-command revert to last-good deployment for the on-call dev. *(Engineering)*
- **"Wall of ships" social-proof surface** — embed accepted applicants' shared posts to make the apply-by-posting loop self-reinforcing. *(Marketing)*
- **Weather/cancellation contingency surface** — a boat event has no rain-date or refund/cancellation policy on-site; publish one + a fast "event status" banner mechanism before the sail. *(Risk/Ops)*
- **Capacity/waitlist handling** — define behavior at Luma sellout and over-capacity at the dock (manifest vs. headcount). *(Risk/Ops)*

## v2.0 — structural (week 1-2 post-event)

- **Dynamic per-event OG system** — move from static PNG to `opengraph-image.tsx` per `/events/[slug]` (title/date/host) so every share renders bespoke, on-brand creative as the program scales. *(Product, Marketing, Designer)*
- **Idempotent migration-based data pipeline** — never let data mutation ride the build step. *(Engineering)*
- **Brand-asset pipeline** — normalize all sponsor/host logos to one directory, one format, with light/dark variants; kill the `/public` vs `/public/brand` split that caused the duplicate + missing-asset bugs. *(Designer)*
- **Design-token pass** — codify spacing/type/color into tokens so polish survives the next ten content edits without drift. *(Designer)*
- **Real sponsor CMS / access-controlled deal room** — replace the un-gated `/sponsors-only` page with authenticated sponsor materials. *(Risk/Ops)*

---

## Items DEFERRED or REJECTED

- **Reconcile the PRD to the built site** — REJECTED for tonight. Shelved with a one-line banner instead (Q5); it's not a launch surface, so reconciliation is zero-value pre-launch.
- **Basic auth on `/sponsors-only` as the default tonight** — DEFERRED to conditional. Colin's one-line sign-off that pricing is public unblocks launch faster; auth only if he says pricing is not meant to be public (Q6).
- **Promote OpenClaw to co-host (logo in hero + full seed entry)** — DEFERRED unless Colin confirms a signed commitment AND supplies a wordmark tonight; default is demote-to-partner (Q1). The v0.2 "add wordmark to hero" item is contingent on this override.
- **"Beluga caviar" keep-and-pay-off** — SPLIT DECISION, defaulted to cut in v0.5. Marketing's keep-it case is logged but loses to the cleaner-read default unless the payoff edit is trivial (Q7).
- **Build a real on-site apply funnel / lead capture** — DEFERRED to v1.5. The Luma handoff is correct and works for launch; owning the lead is a week-1 improvement, not a blocker.
- **Full sponsor CMS / authenticated deal room** — DEFERRED to v2.0; tonight's `/sponsors-only` decision is the stopgap.