import Link from "next/link";
import type { Metadata } from "next";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, SectionHeader } from "@/components/section";
import { RotatingHeroTitle } from "@/components/rotating-hero-title";
import { CountdownToDeadline } from "@/components/countdown-to-deadline";
import { HeroBoat } from "@/components/hero-boat";

export const metadata: Metadata = {
  title: { absolute: "BuilderShip — Countdown to June 14, finals on the bay" },
  description:
    "BuilderShip: a remote AI hackathon with daily developer support, counting down to June 14. Build an AI agent — top builders earn a boat day on the bay, June 14 — bay crossing, a full day of hacking, final presentations, sunset cruise, waterfront dinner, the winner takes home $50K credits and a DGX Spark, after-party on the yacht. Hosted by Composio, Nebius, and Tavily.",
};

const timeline = [
  {
    num: "01",
    date: "Now → June 14",
    title: "Build remotely",
    body: "Counting down to June 14. Daily developer support online and in person. Sponsor credits and APIs available from day one.",
  },
  {
    num: "02",
    date: "Anytime → June 14",
    title: "Post on X & LinkedIn",
    body: "Post your build on X or LinkedIn and tag us. AI judges review every submission. Want a deeper read? Schedule a live demo with human judges any time before the 14th.",
  },
  {
    num: "03",
    date: "June 13",
    title: "Finalists announced",
    body: "Finalists named the night before. Twenty-four hours to polish your pitch and pack a jacket for the bay.",
  },
  {
    num: "04",
    date: "June 14",
    title: "Boat day",
    body: "Bay crossing, a full day of hacking, an open kayak race on the water, sunset cruise, dinner at a waterfront restaurant, demos, judging, after-party on the yacht.",
  },
] as const;

const rubric = [
  {
    axis: "Working demo",
    weight: "0–10",
    body: "Does it actually run end-to-end? Boot, login, the loop, output. Broken demos get 0; smooth flows get 10.",
  },
  {
    axis: "Integration depth",
    weight: "0–10",
    body: "How deeply you use the stack — Composio tools, Tavily search, Nebius inference, the OpenClaw runtime. One API call is 2; meaningful integration across services is 8+.",
  },
  {
    axis: "Usefulness",
    weight: "0–10",
    body: "Would a real person pay for this? Clear use case, sharp problem, plausible distribution. Toy demos cap around 5; product-shaped builds clear 8.",
  },
  {
    axis: "Code quality",
    weight: "0–5",
    body: "Readable, structured, deployable. AI judges read every file. Bonus points for tests, clear README, sane error handling.",
  },
  {
    axis: "Pitch + story",
    weight: "0–5",
    body: "Boat day only. Can you explain what it does and why anyone should care in 90 seconds? Specificity beats slogans every time.",
  },
];

const officeHourRoles = [
  {
    who: "Developer advocates",
    body: "Full-stack help: getting the SDKs running, code review, debugging your agent loop end-to-end.",
  },
  {
    who: "Solution architects",
    body: "Architecture sanity-check: how to wire compute, agent tools, and search for what you're actually trying to build.",
  },
  {
    who: "Field engineers",
    body: "When something's broken at the edge. They live in the issue tracker so you don't have to.",
  },
] as const;

const sponsors = [
  {
    name: "Nebius",
    role: "Compute & Token Factory",
    blurb:
      "AI cloud built for builders. GPU instances, Token Factory inference, and Nebius Serverless deploys. Every team gets credits and Token Factory keys ready to go.",
    site: "https://nebius.com",
    docs: "https://docs.nebius.com",
    accent: "navy",
  },
  {
    name: "Composio",
    role: "Agent tools & integrations",
    blurb:
      "Connect your agent — or any AI — to Gmail, Slack, GitHub, Notion, and 1,000+ more apps through MCP or a direct API. Auth, function schemas, and tool-calling already wired.",
    site: "https://composio.dev",
    docs: "https://docs.composio.dev",
    accent: "lime",
  },
  {
    name: "Tavily",
    role: "Search & web extraction for agents",
    blurb:
      "Real-time search API tuned for LLMs. Clean, ranked, citable results plus structured web extraction — the retrieval layer for any agent that needs to know what just happened on the internet.",
    site: "https://www.tavily.com",
    docs: "https://docs.tavily.com",
    accent: "navy",
  },
] as const;

const techStack = {
  name: "OpenClaw",
  role: "Open agent runtime",
  blurb:
    "The open-source framework you build on. Local-first install, ships to Nebius Serverless in one command, and plays nicely with Composio and Tavily out of the box. Bring an agent, leave with something deployed.",
  site: "https://openclaw.ai",
  docs: "https://docs.openclaw.ai/",
  accent: "lime",
} as const;

const perks = [
  {
    tag: "On the water",
    title: "Sunset cruise",
    body: "Two hours on the bay aboard an 89-foot yacht. The calmest networking time you will ever have.",
  },
  {
    tag: "Hackathon HQ",
    title: "Free bowling",
    body: "Bowling lanes are part of the takeover. Strikes between commits, frame counters by the pizza.",
  },
  {
    tag: "All day",
    title: "Amazing food",
    body: "Real meals all day — lunch at HQ, dinner at a waterfront restaurant. No pizza fatigue.",
  },
  {
    tag: "Coffee tickets",
    title: "Coffee on tap",
    body: "Tickets you can redeem any time you need to walk and think. Locally roasted, ten minutes from the dock.",
  },
  {
    tag: "Open to everyone",
    title: "Kayak race",
    body: "Open-water sprint between the dock and the yacht's mooring. Builders, judges, sponsors — anyone can paddle. Winning team takes a bonus prize.",
  },
  {
    tag: "Docked yacht",
    title: "After-party on the yacht",
    body: "Boat stays docked. Top deck, hot tub running, sunset still in your eyes — and someone always brings a bottle.",
  },
] as const;

const sdkPerks = [
  "Nebius Token Factory keys through the June 14 deadline",
  "Nebius GPU credits for inference & deploy",
  "OpenClaw runtime ready to install",
  "Composio + Tavily API access for the day",
] as const;

const schedule = [
  { time: "9:00 AM", title: "Depart by yacht", where: "South Beach, SF" },
  { time: "10:30 AM", title: "Dock + coffee + heads-down hacking", where: "Hackathon HQ" },
  { time: "11:00 AM", title: "Lunch + build sprint", where: "Hackathon HQ" },
  { time: "1:00 PM", title: "Hacking · bowling · arcade", where: "Hackathon HQ" },
  { time: "3:00 PM", title: "Coffee break", where: "Hackathon HQ" },
  { time: "3:30 PM", title: "Kayak race · open to everyone", where: "The waterfront" },
  { time: "4:30 PM", title: "Final presentations", where: "Hackathon HQ" },
  { time: "6:00 – 8:00 PM", title: "Sunset cruise · celebration", where: "On the bay" },
  { time: "8:15 PM", title: "Dinner · winners announced", where: "Waterfront restaurant" },
  { time: "9:30 PM", title: "Winner walks the plank", where: "Back at the dock" },
  { time: "Late", title: "After-party on the yacht", where: "Docked yacht" },
] as const;

const faqs = [
  {
    q: "How do I apply?",
    a: "Post something you've built and tag @ship_builders @nebiusai @composio @tavilyai @openclaw. That's the whole application — no essay, no resume.",
  },
  {
    q: "What's the format?",
    a: "Solo or teams up to 4. Build remotely with daily developer support, submit your GitHub repo by June 14.",
  },
  {
    q: "How does scoring work?",
    a: "AI judges read every repo and pick the finalists by June 14. On June 14 your score blends 40% AI, 40% sponsors, 20% investors — all on the rubric above.",
  },
  {
    q: "What happens on June 14?",
    a: "Heads-down hacking at HQ all day. Kayak race, final presentations, sunset cruise, dinner, winner announced — $50K credits and a DGX Spark — after-party on the yacht.",
  },
  {
    q: "What does \"walking the plank\" mean?",
    a: "Exactly what it sounds like. The winner walks the plank off the yacht into the water. Towels and a hot tub on standby.",
  },
  {
    q: "What if I can't make it to the boat?",
    a: "Build remotely and skip the boat — submissions still count. Make the cut but can't travel? We'll set up a land route for your final presentation.",
  },
  {
    q: "What should I bring on June 14?",
    a: "Laptop, charger, a jacket for the cruise. Power, Wi-Fi, and our own Starlink at HQ. No hardware projects this time.",
  },
  {
    q: "Drinks?",
    a: "Self-pay at the venues. BYOB on the boat. After-party drinks on the yacht — sponsors' tab.",
  },
] as const;

export default function HackJackLondonSquarePage() {
  return (
    <>
      <TopNav />
      <main>
        {/* Preload the above-the-fold hero background */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preload" as="image" href="/hero/harbor-bg.webp" type="image/webp" fetchPriority="high" />
        {/* Hero — full-bleed foggy Golden Gate harbor background. */}
        <section className="relative -mt-16 min-h-[clamp(480px,80vh,900px)] overflow-hidden border-b border-ink-800 bg-[#0b1a26] md:-mt-[72px]">
          {/* Background harbor (slow Ken-Burns drift) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/harbor-bg.webp"
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Vintage yacht — drifts down + scales up on scroll (toward viewer) */}
          <HeroBoat />
          {/* Soft fog (static) */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(130% 70% at 50% 35%, rgba(255,255,255,0.18), rgba(255,255,255,0) 60%)",
            }}
          />
          {/* Dark scrim for text legibility (WCAG AA) — kept light enough to
              let the harbor show through; left side a touch stronger for text. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" aria-hidden />
          {/* Bottom blend — fade the image into the next section's color so the
              boat doesn't get hard-cut at the section boundary. Matches #apply
              (white in light, ink-900 in dark). Kept short so it doesn't darken
              much of the image. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-ink-900" aria-hidden />
          {/* `dark` forces the light-text treatment regardless of site theme,
              since this hero is always a dark image + dark scrim. */}
          <div className="dark container-page relative pt-20 pb-52 sm:pt-28 sm:pb-60 lg:pt-36 lg:pb-72">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-outline">An OpenClaw hackathon</span>
              <span className="pill-outline">Developer support M–F</span>
              <span className="pill-outline">Submit by June 14</span>
              <span className="pill-lime">
                <span className="live-dot" /> Boat day June 14
              </span>
            </div>
            <RotatingHeroTitle className="mt-20" />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-lime px-6 py-3.5 text-sm">
                View the projects →
              </Link>
              <Link href="#how-it-works" className="btn-outline px-6 py-3.5 text-sm">
                Schedule
              </Link>
              <Link href="#sponsors" className="btn-ghost text-sm">
                Sponsors & stack →
              </Link>
            </div>
            <p className="mt-7 max-w-2xl text-xl text-ink-600 dark:text-ink-300">
              Building, bowling, beer, sunset cruise.
              $50K credits and a DGX Spark for the winner.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">Hosted by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/composio-wordmark.svg"
                alt="Composio"
                className="h-7 w-auto invert dark:invert-0"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/nebius-wordmark.svg"
                alt="Nebius"
                className="h-8 w-auto"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/tavily-wordmark.svg"
                alt="Tavily"
                className="h-8 w-auto dark:invert"
              />
            </div>
            <CountdownToDeadline className="mt-14" />
            <div className="mt-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                Watch · Builder Ship 2026
              </p>
              <div className="mt-3 overflow-hidden rounded-card border border-ink-200 bg-ink-900 shadow-soft dark:border-ink-700">
                <iframe
                  className="aspect-video w-full border-0"
                  src="https://www.youtube-nocookie.com/embed/zy9IQjRXHsU?rel=0"
                  title="Builder Ship 2026"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <Section id="how-it-works" bg="tint">
          <SectionHeader
            eyebrow="Schedule"
            title={<>Countdown to June 14.<br />Forty builders. One day on the bay.</>}
            body="The hackathon is mostly remote. The boat day is the celebration — and the finals."
          />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((s) => (
              <li key={s.num} className="card flex h-full flex-col">
                <span className="font-mono text-xs font-semibold text-navy-700 dark:text-lime">{s.num}</span>
                <span className="pill-lime mt-3 self-start">{s.date}</span>
                <h3 className="h-display mt-3 text-xl font-bold text-ink-900 dark:text-ink-50">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Perks */}
        <Section>
          <SectionHeader
            eyebrow="Finalist perks"
            title="Make the finals, win the boat day."
            body="Only the best of the best earn the trip. Six experience perks on the house, plus the build stack (that one's available to every builder from day one). Win the whole thing and you walk the plank."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title} className="card flex flex-col">
                <span className="pill-lime self-start">{p.tag}</span>
                <h3 className="h-display mt-4 text-2xl font-bold text-ink-900 dark:text-ink-50">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900 p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">And the build stack</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {sdkPerks.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-ink-800 dark:text-ink-100">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-lime text-navy-700">
                    <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3">
                      <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Developer support */}
        <Section id="office-hours">
          <SectionHeader
            eyebrow="Developer Support"
            title="Stuck? We're online every day until June 14."
            body="Daily developer support — online and in person — through June 14, plus always-on help in the sponsor Discords. Drop in, ask anything, ship faster."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {officeHourRoles.map((p) => (
              <div key={p.who} className="card">
                <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{p.who}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900 px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">Get unblocked</p>
                <p className="mt-1 text-base font-medium text-ink-900 dark:text-ink-50">
                  Daily through June 14 — online plus in person across SF, plus the sponsor Discords for any-hour blockers.
                </p>
              </div>
              <Link href="/builders/login" className="btn-lime text-xs px-5 py-2.5">
                RSVP for a session →
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="https://discord.com/invite/cNruWaAhQk" target="_blank" rel="noreferrer" className="btn-outline text-xs">
                Composio Discord ↗
              </Link>
              <Link href="https://discord.com/invite/zBzz6X4QW" target="_blank" rel="noreferrer" className="btn-outline text-xs">
                Nebius Discord ↗
              </Link>
              <Link href="https://community.tavily.com/" target="_blank" rel="noreferrer" className="btn-outline text-xs">
                Tavily Community ↗
              </Link>
            </div>
          </div>
        </Section>

        {/* Boat gallery */}
        <Section>
          <SectionHeader
            eyebrow="The boat"
            title="Meet the yacht."
            body="80 feet of motor yacht docked at the marina. Five staterooms, six heads, hot tub on the top deck, and a main salon big enough to host the cruise crowd."
          />
          <div className="overflow-hidden rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
            {/* Hero photo */}
            <img
              src="/boat/bow-sunset-bridge.jpg"
              alt="Three builders on the bow of the yacht at sunset under the Bay Bridge, San Francisco skyline behind"
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[560px]"
              loading="eager"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              {
                src: "/boat/rainbow-cruising.jpg",
                alt: "Yacht cruising with rainbow flag flying",
                caption: "Pride flag flying off the mast",
              },
              {
                src: "/boat/bay-profile.jpg",
                alt: "Yacht out on the bay between sailboats",
                caption: "Out on the bay",
              },
              {
                src: "/boat/night-lights.jpg",
                alt: "Yacht docked at night with colorful underwater and deck lights",
                caption: "After-party glow",
              },
              {
                src: "/boat/aerial-docked.jpg",
                alt: "Top-down aerial of the yacht at the dock",
                caption: "Aerial — 89ft on her berth",
              },
              {
                src: "/boat/galley-interior.jpg",
                alt: "Main salon and galley with wood paneling and bar stools",
                caption: "Main salon and galley",
              },
              {
                src: "/boat/marina-sunset.jpg",
                alt: "Sunset over the marina, masts silhouetted against orange sky",
                caption: "Marina sunset, demo time",
              },
            ].map((p) => (
              <figure key={p.src} className="overflow-hidden rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
                <img
                  src={p.src}
                  alt={p.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="px-4 py-3 text-xs text-ink-600 dark:text-ink-300">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900 px-6 py-5">
            <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                ["80 ft", "Length"],
                ["20 ft", "Beam"],
                ["5", "Staterooms"],
                ["1979", "Built · Long Beach"],
              ].map(([value, label]) => (
                <div key={label} className="flex items-baseline gap-2">
                  <dt className="font-bold text-navy-700 dark:text-lime">{value}</dt>
                  <dd className="text-ink-500 dark:text-ink-400">{label}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="https://jerrysfaeries.com/toi-toi-toi/"
              className="btn-outline text-xs"
              target="_blank"
              rel="noreferrer"
            >
              More on Jerry's Faeries ↗
            </Link>
          </div>
        </Section>

        {/* Sponsors */}
        <Section id="sponsors" bg="tint">
          <SectionHeader
            eyebrow="Sponsors & organizers"
            title="Build something real."
            body="Each sponsor is an organizer — their teams are on the boat, in the room with builders, and judging at the end. Bring an idea, leave with credits and a working agent."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((s) => (
              <div key={s.name} className="card flex flex-col">
                <div
                  className={`mb-5 flex h-24 items-center justify-center rounded-card ${
                    s.accent === "lime" ? "bg-lime" : "bg-navy-700"
                  }`}
                >
                  <span
                    className={`h-display text-3xl font-bold tracking-tight ${
                      s.accent === "lime" ? "text-navy-700" : "text-white"
                    }`}
                  >
                    {s.name}
                  </span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">{s.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{s.blurb}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  <Link href={s.site} className="btn-outline text-xs" target="_blank" rel="noreferrer">
                    Website ↗
                  </Link>
                  <Link href={s.docs} className="btn-navy text-xs" target="_blank" rel="noreferrer">
                    Read the docs →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Technology stack — OpenClaw is the open runtime, not a sponsor */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">Technology stack</p>
            <div className="card flex flex-col gap-5 md:flex-row md:items-center">
              <div
                className={`flex h-24 w-full items-center justify-center rounded-card md:w-64 md:flex-none ${
                  techStack.accent === "lime" ? "bg-lime" : "bg-navy-700"
                }`}
              >
                <span
                  className={`h-display text-3xl font-bold tracking-tight ${
                    techStack.accent === "lime" ? "text-navy-700" : "text-white"
                  }`}
                >
                  {techStack.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">{techStack.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{techStack.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={techStack.site} className="btn-outline text-xs" target="_blank" rel="noreferrer">
                    Website ↗
                  </Link>
                  <Link href={techStack.docs} className="btn-navy text-xs" target="_blank" rel="noreferrer">
                    Read the docs →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* The rubric */}
        <Section id="rubric" bg="tint">
          <SectionHeader
            eyebrow="The rubric"
            title="Five axes. No surprises."
            body="Every judge — AI and human — scores against the same five-axis rubric (v1). The rubric is public so you can build to it."
          />
          <div className="overflow-hidden rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
            <div className="grid grid-cols-12 border-b border-ink-200 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:border-ink-700 dark:text-ink-400">
              <div className="col-span-12 md:col-span-3">Axis</div>
              <div className="hidden md:col-span-2 md:block">Weight</div>
              <div className="hidden md:col-span-7 md:block">What's a 10</div>
            </div>
            {rubric.map((r, i) => (
              <div
                key={r.axis}
                className={`grid grid-cols-1 gap-2 px-6 py-5 text-sm md:grid-cols-12 md:items-start md:gap-4 ${
                  i !== rubric.length - 1
                    ? "border-b border-ink-200 dark:border-ink-700"
                    : ""
                }`}
              >
                <div className="md:col-span-3">
                  <p className="font-semibold text-ink-900 dark:text-ink-50">{r.axis}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400 md:hidden">Weight</p>
                  <p className="font-mono text-sm font-semibold text-navy-700 dark:text-lime">{r.weight}</p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-700 dark:text-ink-200">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-500 dark:text-ink-400">
            Each judge scores only the axes they grade (AI: demo + usefulness + code; sponsors: demo + integration; investors: usefulness + pitch). Their score is normalized to <span className="font-mono">0–10</span>, then composite = <span className="font-mono">(AI × 0.4) + (Sponsor × 0.4) + (Investor × 0.2)</span>. Public leaderboard goes live June 13 with the finalists.
          </p>
        </Section>

        {/* Finals day schedule */}
        <Section id="schedule">
          <SectionHeader
            eyebrow="Finals day · June 14"
            title="Cruise from South Beach. Hack all day. Demos at dinner."
            body="The boat day is for the finalists. Bay crossing, a full day of heads-down hacking at HQ, final presentations before the sunset cruise, dinner at a waterfront restaurant where winners are announced, after-party on the docked yacht. Times are firm — the boat doesn't wait."
          />
          <ol className="overflow-hidden rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
            {schedule.map((row, i) => (
              <li
                key={`${row.time}-${row.title}`}
                className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[180px_1fr_240px] sm:items-center sm:gap-6 ${
                  i !== schedule.length - 1 ? "border-b border-ink-200 dark:border-ink-700" : ""
                }`}
              >
                <span className="font-mono text-sm font-semibold text-navy-700 dark:text-lime">{row.time}</span>
                <span className="text-base font-medium text-ink-900 dark:text-ink-50">{row.title}</span>
                <span className="text-sm text-ink-500 dark:text-ink-400 sm:text-right">{row.where}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* FAQ */}
        <Section id="faq" bg="tint">
          <SectionHeader eyebrow="Logistics" title="Things to know before you board." />
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="card">
                <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{f.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <Section bg="navy">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-lime">Boat day June 14</p>
              <h2 className="h-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
                Counting down to June 14. Forty finalists. One walk off the plank.
              </h2>
              <p className="mt-5 max-w-xl text-lg text-ink-100">
                Post something you built, tag <strong className="font-semibold text-white">@ship_builders @nebiusai @composio @tavilyai @openclaw</strong>,
                and we'll see it. Submissions close <strong className="font-semibold text-white">June 14</strong>.
                Finalists announced <strong className="font-semibold text-white">June 13</strong>.
                Boat leaves South Beach at 9 AM <strong className="font-semibold text-white">June 14</strong>.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/projects" className="btn-lime px-6 py-3.5 text-sm">
                View the projects →
              </Link>
              <Link
                href="mailto:collin@dabl.club?subject=BuilderShip%20sponsor%20inquiry"
                className="btn bg-white text-navy-700 hover:bg-ink-100 px-6 py-3.5 text-sm"
              >
                Sponsor inquiry →
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
