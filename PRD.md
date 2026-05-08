# Nebius Builders — Product Requirements Document

**Document version:** v0.2 (Nebius rebrand)
**Date:** 2026-05-06
**Source material:**
- Functional model: [hackersquad.io](https://hackersquad.io) public marketing site, three logged-in HTML captures (`/builders/dashboard`, `/builders/dashboard/profile`, `/builders/teams`), [docs.hackersquad.io](https://docs.hackersquad.io) full sitemap.
- Brand model: [nebius.com](https://nebius.com) (visual system, IA, tone).
- Product anchor: [github.com/opencolin/openclaw-deploy](https://github.com/opencolin/openclaw-deploy) (Cloud IDE & deploy targets reframed around Token Factory + Contree + Nebius Serverless).

> Product name: **Nebius Builders** — a HackerSquad-style operating layer for **AI builder events on Nebius**, using the official Nebius brand system. Built inside Nebius for brand / marketing / legal review.

---

## 1. Executive Summary

**Nebius Builders** is a vertically-integrated **operating layer for AI builder events on Nebius** (hackathons, ClawCamps, hack nights, demo nights, mini-conferences, meetups). It bundles five products that competitors usually split across 5+ tools:

1. **Marketing site + event directory** — discovery, social proof, pricing, in the Nebius visual system.
2. **Builder app** — registration, teams, projects, video submissions, leaderboard, in-room interaction.
3. **Event-manager app** — event CRUD, partner sponsors, prizes, volunteers, blasts, projects review, AI feedback analytics, post-event summary.
4. **Cloud IDE + Deploy** — warm Nebius workspace containers backed by **Token Factory** for inference and **Nebius Serverless** (CPU + GPU) for deploy targets. One-command `nebius` install/deploy mirroring [opencolin/openclaw-deploy](https://github.com/opencolin/openclaw-deploy).
5. **Workshops & Webinars library** — recorded sessions teaching builders to install, configure, and ship AI agents on Nebius.

The product wedge versus Devpost / Luma / Hopin: **integration telemetry**. Sponsors see real SDK calls and runtime metrics in builder projects, not badge scans. The wedge versus generic "AI agent platforms": **the events flywheel** — every workshop, hack night, and demo creates training material and live evidence of what Nebius Token Factory + Contree can do.

**Primary KPIs** (inferred from reference site): builders ranked, events run, projects shipped, partner companies, workshop watch-minutes.

---

## 2. Personas & Roles

| Persona | Role flag in user model | What they do |
|---|---|---|
| **Builder** | default | Discover events, register, form teams, build in cloud IDE, submit projects + demo video, demo on-stage, give feedback, climb leaderboard. |
| **Squad Leader** | `squadManager: true` | Run a regional builder community; apply via form; gets dashboard access after team approval. |
| **Volunteer** | builder + per-event volunteer assignment | Sign up for opportunities (check-in, lunch, setup/teardown). |
| **Speaker** | builder invited & approved per event | Auto-emailed a form; on approval, gets **Present** button on builder dashboard. |
| **Event Manager** | per-event team-access entry | Full event-management portal access for one or more events. |
| **Company Admin** | linked through `activeCompanyId` | Run a company profile; pick plan; create/host events once company is verified. |
| **Platform Admin** | `admin: true` | Approve companies, manage tiered plans, prize fulfillment, support escalation. |
| **Ghost user** | `isGhostUser: true` | Pre-created shell accounts (e.g., for invited speakers/teammates that haven't logged in yet). |

Cross-cutting fields visible on the user record: `phone`, `linkedInUrl`, `githubUrl`, `discordHandle`, `twitterHandle`, `personProfileId`, `blaxelVolumeName` (cloud IDE volume), `themeColorMode`, `themeTerminalMode`, `failedLoginAttempts`, `lockedUntil`, `sessionInvalidatedAt`, `emailVerificationToken(+Expires)`, `passwordResetToken(+Expires)`, `passwordHash`.

---

## 3. Information Architecture (URL Inventory)

### Public marketing site (`hackersquad.io`)
- `/` — Home (hero, live stats, active events, IDE preview, pricing, partners, testimonials, transmission contact form)
- `/developers` — Builder pitch + sub-pages
  - `/events` — Public event directory
  - `/leaderboard` — Public ELO/standings board
  - `/ide` — Cloud IDE marketing
  - `/judge-application` — Apply as judge
  - `/squad-leader` — Apply as Squad Leader
- `/businesses` — Company pitch + sub-pages
  - `/host-event`, `/sponsor`, `/pricing`, `/devrel-toolkit`, `/case-studies`
- `/pricing` — Plan table (Free / Starter / Pro / Scale / Enterprise)
- `/about`, `/careers`, `/press`, `/contact`, `/privacy`
- `/builders/login`, `/companies/login` — role-split auth entry points

### Builder app (auth required)
- `/builders/dashboard` — Nebius-styled home: Upcoming Events, Past Events, Total Demos counter, per-event cards (Join Event / Volunteer / Register), online indicator. Title in nav: **Builder Console**.
- `/builders/dashboard/profile` — avatar, name, email, phone, member-since (UI: `[ User Profile ]`, `-- End of Profile Configuration --`).
- `/builders/teams` — teams as leader and as member, pending invitations, project details rollup per team.
- `/builders/dashboard/events/[eventId]/builder` — per-event builder hub.
- `/builders/dashboard/events/[eventId]/volunteer` — per-event volunteer hub.
- `/builders/dashboard/events/[eventId]/project` — `project.sh` tab (project submission form + video recorder).
- (Implied) `/builders/dashboard/events/[eventId]/team` — team roster + invitations.
- (Implied) `/builders/dashboard/events/[eventId]/ide` — Cloud IDE workspace.
- (Implied) `/builders/dashboard/events/[eventId]/feedback` — submit feedback on tools/APIs.
- (Implied) `/builders/dashboard/events/[eventId]/present` — speaker/demo present button.

### Event-manager app (auth + per-event grant)
- `/events/[eventId]/manage` — top-level event manager portal with sections:
  - **Settings** → Team Access (add managers by email)
  - **Partner Companies**
  - **Prizes**
  - **Volunteers**
  - **Speakers**
  - **Live Speakers** (base-station live viewer with Start Session)
  - **Live Demos** (base-station ops dashboard)
  - **Projects** (vertical expandable list + filters)
  - **Feedback** (AI analytics + CSV export + raffle)
  - **Blasts** (in-product announcements)
  - **Photo Gallery** (uploads feed post-event summary)
  - **Post-event Summary** (auto-generated)

### Company portal
- `/companies/dashboard` — events, plan, billing, DevRel tools.
- `/companies/dashboard/events/new` — event creation (gated on company-verified status).
- `/companies/access-denied` — verification not yet complete.

### Workshops & Webinars (public)
- `/workshops` — index, filterable by tag/partner/host (seeded with **Running OpenClaw on Nebius**).
- `/workshops/[slug]` — player + transcript + chapters + "Run on Nebius →" CTA.

### Docs (mirrors HackerSquad doc surface, retargeted)
- `/docs/quickstart`, `/docs/index`
- `/docs/builders/create-a-team`, `/docs/builders/submit-a-project`, `/docs/builders/install-nebius-cli`
- `/docs/event-managers/create-an-event`, `/docs/event-managers/host-an-event`, `/docs/event-managers/manage-event-managers`, `/docs/event-managers/manage-partner-companies`, `/docs/event-managers/manage-prizes`, `/docs/event-managers/manage-volunteers`, `/docs/event-managers/manage-feedback`, `/docs/event-managers/capture-live-demos`, `/docs/event-managers/capture-live-presentations`, `/docs/event-managers/view-projects`, `/docs/event-managers/send-event-blast`, `/docs/event-managers/share-event-link`, `/docs/event-managers/post-event-summary`
- `/docs/openclaw/local-install`, `/docs/openclaw/docker`, `/docs/openclaw/nebius-cpu-serverless`, `/docs/openclaw/nebius-gpu-serverless`, `/docs/openclaw/token-factory` — installation paths from `openclaw-deploy`.
- `/api-reference/openapi.json`, `/llms.txt` — machine-readable surfaces.

---

## 4. Feature Catalog

### 4.1 Marketing Home (`/`)

The marketing site mirrors HackerSquad's information density but adopts the Nebius layout grammar (full-bleed hero with dual CTA, alternating feature blocks with case-study card rails, customer logo wall, generous whitespace, neutral background with green accent).

| # | Feature | Notes |
|---|---|---|
| H1 | Hero | Headline: **"The operating layer for AI builder events on Nebius."** Sub: "Builders ship. Sponsors see real integration telemetry. Workshops on tap." Dual CTA in Nebius style: **Start building** (primary, `/builders/login`) and **Host an event** (secondary, `/companies/login`). |
| H2 | Live stats strip | Builders online · Events live · Workshops watched — live or 30s-polled. |
| H3 | Active events ticker | Cards: city slug, title, `LIVE` / `T-HH:MM` / weekday-date format, deep-link to event page. |
| H4 | "A league for shippers" | Builder pitch. CTA: **Enter the league →** (`/builders/login`). |
| H5 | "Stop chasing developers" | Business pitch. CTA: **Talk to us →** scrolls to contact form. |
| H6 | "Developer marketing, rewritten" | Old-vs-new GTM contrast block. |
| H7 | Cloud IDE + Deploy preview | Animated TypeScript snippet using the Nebius agent SDK + Token Factory, with telemetry overlay (cold start, model latency, sub-agent count, deploy status). |
| H8 | Workshop spotlight | Featured card: **Running OpenClaw on Nebius** with hosts, duration, "Watch →" CTA. Followed by a horizontal rail of recent workshops. |
| H9 | Active events grid | Unauthenticated mirror of dashboard cards. |
| H10 | Pricing table | 5 tiers (§6). |
| H11 | Partner logos | Customer/partner wall in Nebius case-study style (Anthropic, AWS, GitHub, **Nebius**, OpenAI, Telnyx, Wordware, etc.). |
| H12 | Testimonial | DevRel quote w/ attribution. |
| H13 | Contact form | Primary CTA: **Send**. Posts to a Nebius-team mailbox (e.g. `builders@nebius.com`, replace with the real address). |
| H14 | Footer | Nebius-style multi-column: Product · Resources · Solutions · Pricing · Security · Programs · Company · Legal. Region note (San Francisco), response-time promise, copyright. |
| H15 | Top nav | Builders · Businesses · Events · Workshops · IDE · Pricing · Docs · **Log in**. |

### 4.2 Auth & Onboarding

- **OAuth providers:** GitHub (recommended), Google, LinkedIn. Same-email accounts across providers auto-merge into one identity.
- **Password fallback:** `passwordHash` exists on user model — email+password with verification token, reset token, lockout after `failedLoginAttempts`, `sessionInvalidatedAt` for forced logout.
- **Two front doors:** `/builders/login` and `/companies/login` route to the same auth core but funnel to role-specific onboarding.
- **Onboarding flows:**
  - **Builder:** sign in → dashboard. No mandatory profile fields beyond name/email pulled from OAuth.
  - **Squad Leader:** application form (background, community vision) → email approval → dashboard surface unlocks.
  - **Company:** sign in → create company (name, logo, description, website) → verification review by HackerSquad team → on approval, can create events.

### 4.3 Builder App

**Visual language:** Nebius brand system applied to a builder console — clean cards on neutral surfaces, green accent for status and primary actions, structured H1/H2/H3 hierarchy, generous whitespace, no terminal/scanline motifs. Section headers use sentence case ("Upcoming events", "Past events"), action chips use plain-text labels.

#### 4.3.1 Builder Console (dashboard)
- Top nav with avatar + sign-out, plus quick-launch for the IDE.
- Online status pill (subtle green dot, no pulse animation).
- **Upcoming events** section: cards with cover image, title, date/time, location (full street address or "Online"), category chip (Hack Day / Hack Night / Hackathon / Meetup / Mini Conference / Demo Night), state chip (Live now / T-HH:MM / Completed), CTA buttons (Join event / Register / Volunteer).
- **Past events** section.
- **Total demos** counter (per-builder lifetime).
- **Watch next** rail surfacing recent workshops.
- Cards link to per-event sub-routes (`/builder` for participants, `/volunteer` for volunteers, external Luma fallback for non-platform events).

#### 4.3.2 Profile (`/builders/dashboard/profile`)
- Avatar (OAuth profile image by default), Name, Email, Phone, Member since.
- Read-only summary card; editable form below for `linkedInUrl`, `githubUrl`, `discordHandle`, `twitterHandle`, `phone`.
- Theme toggles: `themeColorMode` (light/dark) only — no terminal-mode toggle in the rebrand.

#### 4.3.3 Teams (`/builders/teams`)
- Sections: **Teams as Leader**, **Teams as Member**, **Pending Invitations**.
- Each team: id, name, event (id, name, startDateTime), invitations[], projectDetails[].
- Actions for leader: rename team, invite teammate by email/handle, remove member, delete team, hand off leadership.
- Actions for member: leave team.
- Pending invitations: accept / decline.
- "Find teammates" Discord deep link helper (per docs: post project idea, skills, looking-for).

#### 4.3.4 Per-event Builder hub
- **Overview:** event details, schedule, resources (markdown), blasts feed.
- **Team tab:** team roster + invitations.
- **`project.sh` tab:** form fields:
  - Project name (required)
  - Project description (required)
  - Technologies used (multi-select with "Other technologies" free text)
  - Team members (auto-populated from team)
  - GitHub repository URL
  - Contact-permission checkbox (allows partner outreach)
  - Save: `./save_project.sh`
- **Video submission:** screen-share picker + camera + mic; record in-browser; auto-upload; required for judging.
- **Feedback tab:** submit per-tool/per-API feedback on partner companies.
- **Present button:** appears for approved speakers and demo-slot holders; opens demo request flow.
- **Volunteer tab** (if signed up): assigned shifts.

#### 4.3.5 Cloud IDE (Contree workspace + code-server) & Nebius Deploy

**Architecture: workspace ≠ deploy target.**
- **Workspace runtime:** [Contree](https://docs.contree.dev/) (Nebius's sandbox API — VM-level isolation, container efficiency, Git-like branching of execution state).
- **Editor frontend:** **code-server** (VS Code in browser), running inside the Contree sandbox and reverse-proxied to the builder's URL. Auth via short-lived signed token tied to the user's session.
- **Deploy targets:** Nebius CPU Serverless (production), Nebius GPU Serverless / NemoClaw (custom local models), Docker (portable), local (`npm install -g @nebius/cli`). Mirrors [opencolin/openclaw-deploy](https://github.com/opencolin/openclaw-deploy).

**Workspace lifecycle:**
1. Builder clicks **Open IDE** on a per-event hub.
2. Backend allocates a Contree instance from a published `nebius-builder` OCI image (Nebius CLI + code-server + Node + Python preinstalled).
3. Per-user secrets injected: `TOKEN_FACTORY_API_KEY`, `NEBIUS_WORKSPACE_PASSWORD`, GitHub OAuth token.
4. Nebius agent gateway started in loopback+token mode; code-server bound to a generated subdomain.
5. Builder lands in the editor with Nebius CLI ready, terminal open, MCP tools available via [`contree-mcp`](https://github.com/opencolin/contree-mcp) so the agent inside the workspace can spawn sub-sandboxes for risky operations.
6. The [`contree-skill`](https://github.com/opencolin/contree-skill) Claude Code skill is preloaded for builders using Claude Code as their pair-programmer.

**Branching (Contree's signature primitive — exposed in the UI):**
- **Snapshot** — pin the workspace state (running processes excluded, image lineage preserved) to a named checkpoint.
- **Fork** — spin a parallel workspace from any snapshot to try a different approach without destroying the original.
- **Demo from snapshot** — at the on-stage demo moment, the base station opens the workspace pinned to a known-good snapshot so a last-minute breakage doesn't kill the demo.
- **Rollback** — return to a snapshot in-place.

**Inference:**
- Token Factory key per user, scoped, rotatable, never sent to the browser.
- Model picker in the IDE chrome surfaces all Token Factory–hosted models (GLM-class, Llama-class, Qwen-class, etc.); default model configurable per event by the manager.

**Deploy flow ("Deploy to Nebius" button):**
1. From the editor, builder clicks **Deploy → Nebius CPU Serverless**.
2. Backend snapshots the Contree workspace, builds an OCI image, pushes to the registry, and triggers `nebius deploy --target cpu-serverless` against Nebius Serverless.
3. Status (queued → building → deploying → live) streams back into the project card and the judge telemetry overlay.
4. GPU path uses NemoClaw and a separate "Deploy → Nebius GPU" CTA.
5. **GitHub deploy is on roadmap** (called out in the OpenClaw-on-Nebius workshop Q&A).

**Plan gating:**
- Free / Starter: limited workspace minutes, no GPU.
- Pro: 1,000 workspace minutes, Nebius CPU deploy.
- Scale: 2,000 workspace minutes, Nebius GPU deploy.
- Enterprise: custom quota, dedicated Contree pool option.

**Real-time judge telemetry overlay:** workspace cold-start ms, request latency, viewer count, Token Factory call counts + latency, sub-agent invocations, deploy status, current snapshot label. Session can be broadcast to the event display via the base station.

**Required env / secrets per workspace:**
```
CONTREE_API_KEY        # platform-side, allocates instances
TOKEN_FACTORY_API_KEY  # per-user, scoped, rotated
TOKEN_FACTORY_URL      # https://api.tokenfactory.nebius.com/v1
INFERENCE_MODEL        # builder-selected, default per event
NEBIUS_WORKSPACE_PASSWORD  # generated per session
GITHUB_TOKEN           # OAuth-derived, optional
```

#### 4.3.6 Workshops & Webinars
A first-class content surface attached to the platform — public-facing, indexable, embedded inside the builder app for in-event learning.

**Data model:**
```
Workshop
  id, slug, title, description (markdown),
  hosts[]      // { userId | name, role, company, avatarUrl }
  recordedAt, durationSeconds,
  videoProvider // ZOOM | YOUTUBE | MUX
  videoUrl, videoEmbedUrl, thumbnailUrl,
  transcript (markdown), chapters[] // { startSec, title }
  tags[], partnerCompanyIds[], relatedEventIds[],
  ctaUrl, ctaLabel,            // e.g. "Run on Nebius →"
  visibility (PUBLIC|UNLISTED), publishedAt
```

**Surfaces:**
- `/workshops` — public index, filterable by tag/partner/host.
- `/workshops/[slug]` — player, transcript, chapter jump, CTA, related events, "Run this in your IDE" button that spins a workspace preloaded for that workshop.
- Embedded card on `/builders/dashboard` ("Watch next") and on per-event hubs.

**Seed entry — Workshop: Running OpenClaw on Nebius**

| Field | Value |
|---|---|
| Slug | `running-openclaw-on-nebius` |
| Hosts | Colin Lowenberg (Nebius Builders), Michal (Nebius) |
| Tags | `openclaw`, `nebius`, `token-factory`, `serverless`, `deploy`, `workshop` |
| CTA | **Run on Nebius →** linking to `openclaw-deploy` quickstart |
| Video URL | `https://nebius.zoom.us/rec/share/W7W_7xxYZBSGjcHEro0egvt2xhH00z3CIjdcSwuLI0-AZ0sDr7PiYrPJ5WeB_rnC.YsDri-mrKWuiSVj8` |
| Description | Colin Lowenberg and Michal from Nebius hosted a webinar demonstrating how to run OpenClaw on Nebius' cloud infrastructure, specifically using Token Factory and Serverless AI services. The presentation covered installing OpenClaw locally and connecting it to Token Factory's API for accessing various open-source language models at lower costs compared to proprietary services like ChatGPT. Michal explained how to deploy OpenClaw to Nebius Serverless using Docker containers, showing the process through a CLI skill that automates the deployment. The session included live demonstrations of configuring different models, setting up sub-agents, and managing security considerations. Participants asked questions about phone number integration, model switching, cost estimation, and deployment from GitHub, with Michal confirming that GitHub deployment is on their roadmap. The webinar concluded with discussions about AI's impact on jobs and recommendations for using Tavily for web search capabilities within OpenClaw. |
| Suggested chapters | Intro · Install OpenClaw locally · Connect to Token Factory · Model selection & cost · Configure sub-agents · Deploy to Nebius Serverless via Docker · CLI deploy skill walkthrough · Security considerations · Q&A (phone, GitHub deploy, jobs, Tavily) |

#### 4.3.6 Leaderboard
- Public ELO-style ranked standings ("Ranked Builders: 25,482").
- Per-builder profile page with project history, demos, prizes won.

### 4.4 Event-manager App

#### 4.4.1 Event creation (gated on company verification)
- Verification gate: route blocks until company approved; redirect to `/companies/access-denied` if not.
- Fields (inferred — docs page is intentionally light): name, slug, format (Hack Day / Hack Night / Hackathon / Meetup / Mini Conference / Demo Night), start/end datetime, timezone, venue (address) **or** Online flag, capacity, cover image, description (markdown), registration link / form, judging criteria, schedule blocks.

#### 4.4.2 Event management portal
- **Settings → Team Access:** add managers by email; email must match their HackerSquad account; managers get full portal access.
- **Partner Companies:**
  - Form: Company (search/select), Sponsorship Tier (Bronze / …), Technical Challenge URL (optional), Discord Link (optional).
  - Recommendation: add before event opens so builders see tools day-one.
- **Prizes:**
  - Form: Title, Description, Display Value (e.g., "$100 Gift Card"), Dollar Value (numeric, used by Tremendous API).
  - Distribution: today via support@; **Tremendous integration is roadmap.**
- **Volunteers:**
  - Form per opportunity: Title, Category, Time Slot, Location, Max Volunteers, Description, Requirements.
  - Builders sign up via **Volunteer** button on dashboard.
  - Manager view: sign-ups vs gaps, no auto-coordination.
- **Speakers:**
  - Invite by email → automatic email with form → speaker submits → manager approves.
  - On approval, **Present** button appears on speaker's builder dashboard.
- **Live Demos / Live Speakers (base-station mode):**
  - Designate one machine as "base station" (connected to room display).
  - Operator opens *Live Demos* or *Live Speakers* in manager portal → **Start Session**.
  - Approved presenters request to present from their device → operator accepts/rejects.
  - Wireless stream of webcam + screen share → base station composites both feeds → routes to room display.
  - Operator zoom controls.
  - Auto-stop on timer; platform begins post-production.
  - Captured artifacts: video, presentation materials, demo content — feed post-event summary.
- **Projects view:**
  - Vertical expandable list, filterable by partner company, vote counts visible, bulk expand/collapse.
  - Per-project: name, description, technologies, demo approval status, partner-tool icons, ranking, builder info.
  - Available on all plans including Free.
- **Feedback:**
  - Multi-step LLM analysis, **LLM Score** for technical depth.
  - AI-detection metrics: total submissions, human vs AI counts, quality categorization.
  - Default view: accepted feedback only.
  - CSV export.
  - Built-in **raffle** randomizer to reward feedback submitters.
- **Blasts:**
  - In-product announcements only (no email).
  - Targeted to builders in this event.
  - Guidance: short, action-oriented.
- **Photo Gallery:**
  - Upload event photos; populate post-event summary.
- **Post-event Summary:**
  - Auto-generated public page: project submissions, demos, presentations, speakers, photo gallery, prize winners.
  - Shareable URL for sponsors/partners.
- **Share Event Link:**
  - Public URL → unauthenticated users hit login → after auth land on event dashboard with details, resources, updates.

### 4.5 Company / Admin Surface
- **Company profile:** name, logo, description, website.
- **Plan management:** select tier; see usage (events this month, IDE hours).
- **Verification flow:** company submitted → HackerSquad reviews → on approval, event creation unlocks.
- **DevRel toolkit** (marketed as a feature; details not in docs): export builder lists from your events, follow-up templates, integration telemetry dashboards.
- **Platform Admin (internal):** approve/reject company verifications; toggle `admin` flag; impersonate; manage tiers; release prize funds.

### 4.6 Notifications & Messaging
| Channel | Sender | Trigger |
|---|---|---|
| Transactional email | Platform | Email verification, password reset, speaker invite form, team-invite notice. |
| In-product blast | Event manager | Event-time announcements; appears on builder dashboard. |
| (No SMS, no push currently.) | | |

### 4.7 Telemetry, Analytics, Observability
- **Builder-facing:** PostHog product analytics (NextAuth + PostHog providers in app shell).
- **Sponsor-facing:** integration telemetry (which builder projects called which Token Factory model and which partner SDK), real-time judge view.
- **Live event dashboards:** site-wide live counters (builders online, events live, workshop watch-minutes).
- **Per-event reports:** registrations, attendance, projects shipped, feedback volume + AI analysis, deploys to Nebius.

### 4.8 Integrations
- **OAuth:** GitHub (recommended), Google, LinkedIn — NextAuth.
- **Inference:** **Token Factory** (Nebius) — primary inference provider; per-user scoped API key injected into IDE; model picker UI surfaces all Token Factory–hosted models.
- **Workspace runtime:** **Contree** (Nebius sandbox API) — VM-isolated containers with Git-like branching. Backend uses Contree REST API; per-workspace MCP via [`contree-mcp`](https://github.com/opencolin/contree-mcp); Claude Code users get [`contree-skill`](https://github.com/opencolin/contree-skill) preloaded. Platform holds a `CONTREE_API_KEY`.
- **Editor:** **code-server** running inside Contree sandboxes, reverse-proxied per session.
- **Compute / deploy:** **Nebius CPU Serverless** and **Nebius GPU Serverless (NemoClaw)** as one-click deploy targets from the IDE. Container registry: GHCR-published agent images.
- **Object storage:** Nebius Object Storage for project videos, workshop recordings, event photos. (Workspace state lives in Contree image lineage, not Object Storage.)
- **Nebius CLI:** preinstalled in workspaces in workspaces; gateway started in loopback+token mode.
- **Web search:** Tavily, surfaced as a recommended search tool inside the workspace (per the seed workshop).
- **Prizes:** Tremendous API (numeric `dollarValue` is the hook; manual activation today).
- **Discord:** per partner company; per-builder `discordHandle` for team-formation.
- **Luma fallback:** non-platform-managed events linked out.
- **Streaming/broadcast:** WebRTC for presenter → base-station transport; HLS fanout for spectators.
- **Video hosting:** Zoom (passthrough share URLs for raw recordings) → Mux for transcoded HLS playback after edit.

---

## 5. Data Model (inferred)

```
User
  id, name, email, emailVerified, phone, image, isGhostUser,
  squadManager, admin,
  passwordHash, emailVerificationToken(+Expires),
  passwordResetToken(+Expires), failedLoginAttempts, lockedUntil, sessionInvalidatedAt,
  activeCompanyId, personProfileId,
  contreeImageRef,               // root OCI image for this user's workspace lineage
  tokenFactoryKeyId,             // scoped Token Factory API key handle
  themeColorMode,                // light | dark
  linkedInUrl, githubUrl, discordHandle, twitterHandle,
  createdAt, updatedAt

Company
  id, name, logo, description, website, verifiedAt, plan, createdAt

CompanyMember (User × Company × role)
EventManager (User × Event)

Event
  id, name, slug, format (HACK_DAY|HACK_NIGHT|HACKATHON|MEETUP|MINI_CONFERENCE|DEMO_NIGHT|...),
  startDateTime, endDateTime, timezone,
  isOnline, venueName, venueAddress,
  coverImageUrl, description (markdown), capacity,
  registrationUrl, externalUrl (luma fallback),
  ownerCompanyId

Registration (User × Event, kind=HACKER|SPECTATOR|VOLUNTEER|SPEAKER, state)

Team
  id, name, eventId, teamLeaderId, createdAt, updatedAt

TeamMember (User × Team, role)
TeamInvitation (Team × User|email, status)

Project
  id, teamId, eventId, name, description,
  technologies[], otherTechnologies, githubUrl,
  allowPartnerContact, savedAt

ProjectVideo (Project × storage URL × duration)

PartnerCompany (Event × Company × tier × challengeUrl × discordUrl)

Prize
  id, eventId, title, description, displayValue, dollarValue, winnerProjectId

VolunteerOpportunity
  id, eventId, title, category, timeSlot, location, maxVolunteers,
  description, requirements

VolunteerAssignment (Opportunity × User)

Speaker (Event × User, status=INVITED|SUBMITTED|APPROVED|DENIED, formAnswers)

LiveSession (Event × Presenter × kind=DEMO|TALK, status, startedAt, endedAt, baseStationId)
  → captures: webcamUrl, screenShareUrl, finalVideoUrl

Feedback
  id, eventId, userId, partnerCompanyId, content,
  llmScore, isAiGenerated, isAccepted, createdAt

Blast (Event × authorId × body × sentAt)

EventPhoto (Event × url × uploadedBy)

PostEventSummary (Event × url × generatedAt)

IDESession (User × Event × startAt × endAt × hoursUsed × telemetry blob)

Workspace
  id, userId, eventId,
  contreeInstanceId,             // active Contree instance handle
  baseImageRef, currentImageRef, // OCI refs in Contree's image lineage
  inferenceModel, tokenFactoryKeyId,
  codeServerUrl, codeServerToken,
  status (BOOTING|READY|PAUSED|ENDED),
  createdAt, lastActiveAt

WorkspaceSnapshot
  id, workspaceId, label, imageRef,
  parentSnapshotId,              // forms the lineage tree
  createdByUserId, createdAt

Deployment
  id, workspaceId, snapshotId,
  target (NEBIUS_CPU|NEBIUS_GPU|DOCKER|LOCAL),
  url, status (QUEUED|BUILDING|DEPLOYING|LIVE|FAILED),
  startedAt, finishedAt, logsUrl

Workshop
  id, slug, title, description (md),
  hosts[] {userId|name, role, company, avatarUrl},
  recordedAt, durationSeconds,
  videoProvider (ZOOM|YOUTUBE|MUX), videoUrl, videoEmbedUrl, thumbnailUrl,
  transcript (md), chapters[] {startSec, title},
  tags[], partnerCompanyIds[], relatedEventIds[],
  ctaUrl, ctaLabel,
  visibility (PUBLIC|UNLISTED), publishedAt
```

---

## 6. Pricing & Plans

| Plan | Price | Events / mo | Notable inclusions |
|---|---|---|---|
| Free | $0 | 3 | Streaming, basic analytics |
| Starter | $1,000 | 10 | + Content recording, feedback capture |
| Pro | $2,000 | 15 | + 1,000 IDE hours, advanced analytics |
| Scale | $3,500 | 25 | + 2,000 IDE hours, white-label |
| Enterprise | Custom | Unlimited | + SSO, on-prem, custom SLAs |

Implementation hooks: plan stored on `Company`; usage counters reset monthly; soft-cap surfaces a paywall in event creation; hard-cap blocks new events.

---

## 7. Visual Design System (Nebius)

The product adopts the Nebius brand grammar end-to-end, using the official Nebius brand assets. No terminal/hacker/matrix motifs. Internal Nebius project — going to brand / marketing / legal review before public launch.

**Brand assets in repo:** `brand/nebius-wordmark.svg` (canonical pill lockup, 131×36, lime pill on transparent). Source: `clawcamp/images/sponsors/nebius-logo.svg`.

- **Aesthetic:** clean enterprise-tech — generous whitespace, full-bleed hero with dual CTA, alternating feature blocks, customer/case-study card rails, neutral surfaces with a single signature lime accent.
- **Type:** match Nebius's brand stack (request canonical from brand team). Until then, sans-serif system pairing — Inter (UI) + JetBrains Mono (code only). Heading scale H1→H3, body 16px, line-height 1.55. No mono headlines.
- **Palette (extracted from official wordmark):**
  - **Brand lime (primary accent):** `#E0FF4F` — used for the wordmark pill, primary CTAs, "Live" status, hover/active highlights, badge backgrounds.
  - **Brand dark (primary text on lime, dark surfaces):** `#052B42` — wordmark, headings on light backgrounds, dark-mode surface base.
  - **Foreground neutrals:** near-black `#0B0E0C` on white (light); `#FAFAF7` on `#052B42` (dark).
  - **Surface neutrals:** `#FFFFFF`, `#F4F5F2` (subtle), `#E7E8E4` (borders), `#052B42` (dark surface base).
  - **Status:** info `#3B82F6`, warn `#F59E0B`, error `#EF4444`, success uses brand lime with `#052B42` text (lime is too bright for white text — pair only with the dark navy).
  - **Important:** lime `#E0FF4F` against white fails AA contrast for body text — only use it as a fill behind dark text, never as foreground text on white.
- **Logo treatment:** the wordmark from `brand/nebius-wordmark.svg` sits in the nav top-left, links to `/`. The "Builders" sub-mark renders as `font-weight: 500` lime-on-navy or navy text adjacent to the pill, per the eventual brand-team lockup spec. Reserve 1× cap-height of clearspace on every side. Provide SVG (existing), plus a generated `apple-touch-icon.png` and 32×32 favicon (lime square with navy "N").
- **Buttons:**
  - **Primary:** solid green, white text, 8px radius, 14px/24px padding, no shadow, `font-weight: 600`.
  - **Secondary:** outline 1px neutral, transparent fill, hover fills with 4% black.
  - **Tertiary / link:** green text, underline on hover.
- **Cards:** white surface, 1px `#E7E8E4` border, 12px radius, 24px padding, no drop shadow; on hover, border darkens. Used for events, workshops, case studies, partner spotlights.
- **Hero layout:** centered or left-aligned headline, sub ≤ 60ch, dual CTA (primary + secondary). Background can be neutral or accent-tinted; full-bleed product imagery permitted.
- **Section rhythm:** alternating `section` blocks with 96px vertical padding, 1280px max content width, 24px gutter.
- **Iconography:** 24px line icons, 1.5px stroke, neutral; never green except when paired with a green-text status.
- **Photography & illustration:** product screenshots, data-center photography, architectural diagrams. No abstract gradients, no dot patterns, no scanlines.
- **Motion:** subtle (200–300ms ease-out) — fade/translate on reveal, no parallax, no neon glow.
- **States:** `Live` (small green dot, no pulse), `T-HH:MM` countdown chip, `Completed` (neutral chip), weekday-date for upcoming.
- **Theme:** light + dark via `themeColorMode`. Drop the terminal toggle.

> Implementation note: the deploy UI in `opencolin/openclaw-deploy` should be re-skinned to share this token set (and pull from the same `@nebius/brand` package once it exists) so the install wizard, the workshops site, and the platform feel like one product.

---

## 8. Non-Functional Requirements

- **Stack target:** Next.js 14 (app router) + React Server Components. NextAuth (GitHub/Google/LinkedIn + credentials fallback). Prisma + Postgres. Redis for live counters and live-session presence. PostHog for analytics. **Nebius Object Storage** for IDE volumes, project videos, workshop recordings, event photos. **Token Factory** as the inference provider.
- **Live infra:** WebRTC for low-latency screen+webcam to base station; HLS fanout for spectator viewing. Sub-second control-plane via WebSockets.
- **Hosting:** prefer Nebius for parity with deploy story. Edge/CDN in front for marketing pages.
- **Uptime target:** 99.99% — multi-AZ Postgres, queue-based retries on video pipeline.
- **Security:** OAuth-first; password fallback with lockout; emailVerification gating on sensitive actions; per-event RBAC for managers; company-verified gate before event creation; admin impersonation logs. Token Factory keys are scoped per user, rotatable, never exposed to the browser.
- **Privacy:** `allowPartnerContact` opt-in per-project; CSV exports must respect that flag. Workshop transcripts default unlisted until host approves.
- **Accessibility:** WCAG AA contrast on green accent + neutrals; keyboard support throughout the IDE and base-station ops view; captions on captured video.
- **Performance:** dashboard cards lazy-load images; counter strip cached and pushed; IDE warm-pool sized to avoid cold starts > 2s; workshop player uses HLS with adaptive bitrate.
- **i18n:** English-only today.

---

## 9. Out of Scope / Open Questions

1. **Public REST/GraphQL API.** The OpenAPI URL is currently a Mintlify placeholder. Unknown if a real API exists.
2. **White-label** (Scale tier) — branding scope undefined.
3. **SSO** (Enterprise) — provider list unknown; assume SAML + OIDC.
4. **DevRel toolkit** — marketed but undocumented. Likely: builder list export, integration telemetry dashboard, follow-up templates.
5. **ELO scoring** — formula not public; we'd design from scratch.
6. **Judging system** — exists ("Apply as judge", "demo approval status" on projects) but no docs page yet; behavior reverse-engineered from project view.
7. **Payments** — Tremendous wired but not self-serve; Stripe likely for plan billing.
8. **Conciseness / Resources / Support the Community** docs pages are placeholders; corresponding features may be on roadmap.

---

## 10. Phased Build Plan (recommended)

| Phase | Slice | Demoable outcome |
|---|---|---|
| 0 | Project skeleton — Next.js 14 app router, NextAuth (GitHub/Google), Prisma+Postgres, **Nebius design tokens** (Inter + green accent + clean cards), marketing home with pricing + active events | Public site live in Nebius look |
| 1 | **Workshops surface** — `/workshops` index + `/workshops/[slug]` player (Zoom passthrough now, Mux later). Seed entry: *Running OpenClaw on Nebius* | Watch Colin + Michal end-to-end on the new site |
| 2 | Builder Console + profile + per-event hub + team formation | Builder can register and form a team |
| 3 | Event-manager portal v1 — event CRUD (gated on company verification), partner companies, prizes, blasts, share-event-link, project view | A manager can run a basic event end-to-end |
| 4 | Project submission flow — form + in-browser screen+webcam recorder + Nebius Object Storage | Builders submit projects with video |
| 5 | Volunteers + Speakers (invite/approve) | Full pre-event ops |
| 6 | Live capture (base station) — WebRTC presenter → compositor → room display | On-stage demos and talks captured |
| 7 | Feedback + AI analysis + raffle + CSV export | Sponsors get post-event insights |
| 8 | **Cloud IDE & OpenClaw Deploy MVP** — Contree-backed workspace, code-server editor, Token Factory key injection, model picker, snapshot/fork/rollback UI, one-click "Deploy to Nebius" mirroring `openclaw-deploy` | A builder goes from blank workspace → deployed agent on Nebius in one session, with a snapshot they can demo from |
| 9 | Post-event summary auto-gen + photo gallery | Shareable recap page |
| 10 | Leaderboard + ELO + Squad Leader program | Long-tail community engagement |
| 11 | Plans/billing (Stripe) + Tremendous prize fulfillment + admin tools | Self-serve commerce |

Each phase ships behind a feature flag, deploys to a staging hostname, and is gated by an end-to-end smoke test of one canonical event lifecycle.

---

## Appendix A — Verbatim labels captured from the source app

> Reference only — these are the strings observed on hackersquad.io, kept here for traceability between source and clone. **Do not copy verbatim into Nebius Builders** — the terminal/`.sh` motifs are dropped in the Nebius rebrand. Use them to confirm functional parity, not to lift copy.


Builder dashboard: `Builder Terminal`, `system online`, `Upcoming Events`, `Past Events`, `Total Demos`, `Join Event`, `Register`, `Volunteer`, `[BUILD]`, `[CONNECT]`, `[DEPLOY]`, `$$ Upcoming_Events.sh`, `$$ Past_Events.log`, `LIVE NOW`, `COMPLETED`, `HACK DAY`, `HACK NIGHT`, `HACKATHON`, `MEETUP`, `MINI CONFERENCE`, `Online`, `© 2026 Developer Events LLC. All rights reserved.`.

Profile: `[ User Profile ]`, `View and manage your builder identity.`, `[ Profile Avatar ]`, `Name:`, `Email:`, `Phone:`, `Member Since:`, `-- End of Profile Configuration --`.

Marketing: `Ship in public. Test your ideas.`, `Start building →`, `For businesses`, `Enter the league →`, `Schedule a strategy call →`, `Stop chasing developers`, `A league for shippers`, `Developer marketing, rewritten`, `The old GTM is a badge scan.`, `Cloud IDE. Warm containers, preloaded SDKs, zero install.`, `Accepting Q2 bookings`, `inquiry@hackersquad.io`.

Project submission (docs): `project.sh`, `./save_project.sh`, `"Other technologies"`, `"Clear descriptions make it much easier for organizers and judges to review your work,"`.

Event manager (docs): `Manage`, `Team Access`, `Add Partner Company`, `Best Use of AI`, `Best Developer Tool Workflow`, `Live Speakers`, `Start Session`, `Present`, `Check-in Support`, `Lunch Catering Support`.

