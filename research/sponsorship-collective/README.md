# The Sponsorship Collective — Research Archive

Complete extraction and synthesis of the public knowledge of **The Sponsorship Collective** (Chris Baylis) — *"how to get sponsorships."* Built from their website, blog, and entire YouTube channel.

## 🎯 Start here

**[`00_MASTER_PLAYBOOK.md`](00_MASTER_PLAYBOOK.md)** — the capstone. The complete operating system in one document: philosophy, the end-to-end process, funnel math, every stage (audience → valuation → prospecting → outreach → discovery → proposals → closing → fulfillment → renewal), anti-patterns, a verbatim scripts library, glossary, case studies, industry playbooks, and a tailored **BuilderShip application plan**.

## 📚 What's inside

| Folder / file | Contents |
|---|---|
| `00_MASTER_PLAYBOOK.md` | **The synthesis** (~7,500 words). Read this first. |
| `digests/merged_A–D.md` | **Deep reference** (~74,000 words). 4 comprehensive, deduplicated thematic digests across 20 sections (Philosophy, Process, Audience, Inventory, Valuation, Activation, Prospecting, Outreach, Discovery, Proposals, Negotiation, Fulfillment, Renewal, Scaling, **Funnel Math**, **Scripts**, **Glossary**, **Anti-patterns**, **Case Studies**, **Industry Playbooks**). |
| `digests/blog_chunk_00–11.md` | 12 raw extraction digests (one per ~37 blog posts). |
| `digests/tx_chunk_00–04.md` | 5 raw extraction digests (one per ~36 video transcripts). |
| `blog/` | **433** blog posts as clean markdown (~880K words). |
| `transcripts/` | **177** YouTube video transcripts as plain text (~350K words). |
| `pages/` | **64** site pages (How We Do It, Client Love, Services, The Sponsorship Bible, industry pages, etc.). |
| `manifests/` | File-list chunks used to parallelize extraction. |
| `_raw_vtt/` | Raw `.vtt` captions (intermediate; the `.txt` in `transcripts/` are the usable form). |
| `scrape_blog.py`, `vtt_to_text.py` | The reproducible scrapers (re-run to refresh). |
| `all_post_urls.txt`, `yt_video_list.txt`, etc. | Source URL/video inventories. |

## 🧠 The thesis in three lines

1. **Sponsorship is marketing, not philanthropy.** Companies buy **access to your audience** and **measurable outcomes**, never logos, your cause, or your enthusiasm.
2. **The work that closes deals is direct outreach** to a named human asking for a 15-minute discovery meeting — *not* polishing proposals or blasting gold/silver/bronze packages.
3. **The funnel is knowable:** ~**200 contacts → 45 meetings → 15 proposals → 5 sponsors @ $50K = $250K/yr** = just **4 outreaches a week.**

## 🔁 How this was built

YouTube channel enumerated and captioned with `yt-dlp` (185 videos → 177 with transcripts); blog + pages enumerated from the WordPress sitemaps and scraped to markdown; the full corpus was extracted by parallel sub-agents into 17 chunk digests, consolidated into 4 merged digests, and synthesized into the master playbook.

*Source: https://sponsorshipcollective.com + https://www.youtube.com/c/thesponsorshipcollective. Extracted June 2026 for BuilderShip sponsorship groundwork.*
