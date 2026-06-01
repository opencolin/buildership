All three hero wordmarks exist. Confirmed: no favicon/icon/opengraph file in `src/app/` (Next.js app-dir convention), and no OG image in `/public`.

## Hero
Tagline ("building, bowling, beer, beluga caviar, sunset cruise"), countdown timer, three stat cards, dual CTAs, and the "Hosted by" row render Composio + Nebius + Tavily wordmark SVGs — **all three files exist** (`/public/brand/{composio,nebius,tavily}-wordmark.svg`). **Sharper:** OpenClaw appears as a host in copy everywhere but is missing from the hero logo row — inconsistent. Primary CTA "Ship it right now →" jumps to `#apply` which is mostly "post on social," not actually shipping.

## Sections
- **Apply** — clear 4-step flow + "the bar" card. *Sharper:* step 01 says "Register" but the only register link is Luma; reconcile "no deadline" with the hard June 12 cutoff stated two cards over.
- **Schedule (timeline)** — four numbered phases, clean. *Sharper:* "June 13 finalists" vs. apply card's "announced June 13" — consistent, good; tighten step 04's run-on body.
- **Perks** — six experience cards + sponsor-stack strip. *Sharper:* "beluga caviar" (hero) never reappears; either deliver it in perks or drop it.
- **Sponsors** — renders names as styled text blocks, not logos; Website + Docs links resolve. *Sharper:* OpenClaw links to a personal GitHub (`opencolin/openclaw-deploy`) — reads less credible than the others.
- **Judging** — 40/40/20 split, three cards. Solid.
- **Rubric** — five-axis table + normalization formula. *Sharper:* line 47 "how working the working demo actually is" is a duplicated-word typo (**fix**).
- **FAQ** — eight Q&As, strong voice. Good.
- **CTA** — repeats tags + dates. *Sharper:* "Sponsor inquiry" mails `events@agenthack.ai` — off-brand domain for ship.builders (**verify**).

## Meta/OG
- **layout.tsx `<title>`:** "BuilderShip — Countdown to June 12, finals on the bay"
- **description:** present (Composio + Nebius only; page.tsx override adds Tavily + OpenClaw)
- **og:url:** `https://ship.builders` ✓ · **metadataBase** set ✓
- **OG image path:** **none declared** (no `openGraph.images`, no `twitter.images`)
- **/og-image.png:** **does NOT exist** — no `og*.png`/`opengraph*.png` in `/public`, and no `opengraph-image`/`icon`/`favicon` in `src/app/`
- **favicon:** **none** — no icon file anywhere

## Risks
- No OG image + `summary_large_image` card → social shares render blank/broken. Launch-blocker for a share-driven apply flow.
- No favicon → default globe in tabs/bookmarks.
- "how working the working demo actually is" typo sits in the public rubric data.
- `events@agenthack.ai` mailto is a different brand than ship.builders — looks like leftover boilerplate.
- OpenClaw inconsistency: named as co-host throughout but absent from hero logos and backed by a personal GitHub repo.

## Quick wins
- Add `/public/og-image.png` (1200×630) and wire `openGraph.images` + `twitter.images` in layout.tsx.
- Drop an `icon.png`/`favicon.ico` into `src/app/`.
- Fix the duplicated-word typo on page.tsx line 47.
- Confirm or replace the `events@agenthack.ai` sponsor-inquiry address.
- Either add OpenClaw to the hero "Hosted by" row or stop calling it a host.
- Align "no deadline drama" (apply card) with the firm June 12 cutoff.