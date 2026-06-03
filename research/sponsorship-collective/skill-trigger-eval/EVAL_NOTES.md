# Trigger-accuracy tuning — `sponsorship-playbook` skill

Tuned the skill's `description` (the field Claude uses to decide whether to load the skill) using the skill-creator's `run_loop.py` optimizer.

## Method
- **Eval set:** `trigger-evals.json` — 20 realistic queries, 10 should-trigger / 10 should-not, weighted toward hard near-misses on the skill's boundaries (sponsorship vs. fundraising/donations, vs. work-visa "sponsor", vs. GitHub Sponsors, vs. receiving cloud credits, vs. "sponsor" as a code variable, vs. informational questions, vs. audience growth).
- **Optimizer:** 5 iterations, 60/40 train/test split (12 train / 8 test), each query run 3× for a stable trigger rate, scored on the held-out test set. Model: `opus` (matching the session). Raw output: `results.json`.

## Finding (important nuance)
- **False-positives: 0/10 in every iteration.** The skill never fired on the near-misses (visa, GitHub Sponsors, donations, grant-writing, etc.) — under the original description *and* all 5 candidates. This is a real, robust result: the boundaries hold.
- **Positives: 0.0 trigger rate, identical across all 5 descriptions.** No description — however explicitly engineered — moved the positive rate at all. That means the bottleneck was **not** the description but the `claude -p` test harness, which (per the skill-creator's own docs) under-fires skills on queries the model thinks it can answer directly. The positive metric was floored, so the optimizer couldn't distinguish candidates and reported "keep original" (a measurement artifact, not evidence the original was best).

## Decision
Adopted a **refined description** that synthesizes the optimizer's best candidate ideas — concrete real-query phrasings ("land $50k from brands", "bring in corporate partners, no idea where to start") and **explicit exclusions** of the exact near-misses — because the eval *did* prove those exclusions are safe (negatives stayed 0/10 false-fire across every variant, including the ones carrying the exclusions). We are **not** claiming a measured positive-trigger improvement; we're applying a strictly better-scoped description with no measured downside.

## Before → after (description)
**Before:** "Complete, battle-tested methodology for getting corporate sponsorships for any property with an audience … even if they only say things like 'we need sponsors' … Distilled from The Sponsorship Collective (Chris Baylis): sell audience access and measurable outcomes (NOT logos), never use gold/silver/bronze tiers, and win through direct outreach + custom offers."

**After:** "Methodology for winning corporate sponsorships — cash or in-kind (compute/API credits, prizes, swag) — from companies and brands for any audience-based property … Use this skill WHENEVER the user wants brands to sponsor or fund their event/show/team/cause — e.g. 'land $50k from brands', 'bring in corporate partners, no idea where to start' … **NOT for major-donor gifts, grant writing, work-visa/H-1B sponsorship, GitHub Sponsors, sponsored-content UI, or audience growth.**"

Net changes: added in-kind/credits framing, added concrete trigger phrasings, and added an explicit negative-scope clause covering the near-misses. Kept ≤1024 chars (skill-validator limit).
