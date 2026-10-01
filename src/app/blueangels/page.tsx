import Link from "next/link";
import type { Metadata } from "next";
import { AppHeader } from "@/components/app-chrome";
import { Footer } from "@/components/footer";
import { Section, SectionHeader } from "@/components/section";
import { JetFormation } from "./jets";
import "./blueangels.css";

const PARTIFUL_URL = "https://partiful.com/e/1Qa9yy7ONshxnBROH4yN";

export const metadata: Metadata = {
  title: { absolute: "Blue Angels Air Show by Yacht — #SFTechWeek" },
  description:
    "Cruise on an 89-foot yacht while the Blue Angels perform overhead — Fleet Week San Francisco, Thursday Oct 8, 12–5 PM. Food, drinks, and 50 curated seats. Sponsored by Tenki.Cloud & Luxor.tech, curated by Smoov.",
  openGraph: {
    title: "Blue Angels Air Show by Yacht — #SFTechWeek",
    description:
      "A once-in-a-lifetime opportunity to cruise on an 89-foot yacht while the Blue Angels perform over your head. 50 curated seats. Thursday, Oct 8 · 12–5 PM.",
    images: ["/boat/yacht-bridge.jpg"],
  },
};

const nav = [
  { label: "Blue Angels by Yacht", href: "/blueangels" },
  { label: "BuilderShip", href: "/" },
];

const logistics = [
  ["Thursday, Oct 8", "Fleet Week · San Francisco"],
  ["12:00 – 5:00 PM", "Five hours on the bay"],
  ["50 seats", "Applications reviewed individually"],
  ["Starlink Wi-Fi", "Need to stay connected? Covered."],
] as const;

const flow = [
  {
    num: "01",
    title: "Arrival",
    body: "Step aboard to food, drinks, and open networking as the bay fills up for the air show.",
  },
  {
    num: "02",
    title: "Curated conversations",
    body: "We seamlessly connect you with a pod of 3–4 people, intentionally matched around relevant goals and networks.",
  },
  {
    num: "03",
    title: "Open boat time",
    body: "Move between decks, meet founders, eat, drink, and stay wherever the conversation is good. Watch the Blue Angels!",
  },
] as const;

const smoovTopics = [
  "AI infrastructure",
  "Compute",
  "Distribution",
  "Developer adoption",
  "Partnerships",
  "Customer acquisition",
] as const;

const sponsors = [
  {
    name: "Luxor",
    role: "Hardware, software, finance & energy for compute",
    blurb:
      "From Bitcoin mining to AI infrastructure — Luxor delivers the hardware, software, finance, and energy tools that power the world's compute. Luxor's founders will be aboard.",
    site: "https://luxor.tech",
    accent: "navy",
  },
  {
    name: "Tenki.Cloud",
    role: "Infrastructure for AI agents & engineering teams",
    blurb:
      "Sandboxes, GitHub runners, and AI code review — Tenki's team will be there to talk about infrastructure built for AI agents and the engineering teams that ship with them.",
    site: "https://tenki.cloud",
    accent: "lime",
  },
] as const;

const gallery = [
  {
    src: "/boat/wake-skyline.jpg",
    alt: "The yacht's wake across the bay with the San Francisco skyline and Bay Bridge behind",
    caption: "Full send across the bay",
  },
  {
    src: "/boat/yacht-bow.jpg",
    alt: "Captain waving from the bow of the 89-foot yacht on the bay",
    caption: "Welcome aboard",
  },
  {
    src: "/boat/rainbow-cruising.jpg",
    alt: "Yacht cruising with rainbow flag flying",
    caption: "Colors up, underway",
  },
  {
    src: "/boat/bay-profile.jpg",
    alt: "Yacht out on the bay between sailboats",
    caption: "Out on the bay",
  },
  {
    src: "/boat/bow-sunset-bridge.jpg",
    alt: "Guests on the bow at sunset under the Bay Bridge, San Francisco skyline behind",
    caption: "Bow seats at golden hour",
  },
  {
    src: "/boat/night-lights.jpg",
    alt: "Yacht docked at night with colorful underwater and deck lights",
    caption: "Docked after dark",
  },
  {
    src: "/boat/aerial-docked.jpg",
    alt: "Top-down aerial of the yacht at the dock",
    caption: "89 feet from above",
  },
  {
    src: "/boat/galley-interior.jpg",
    alt: "Main salon and galley with wood paneling and bar stools",
    caption: "The main salon",
  },
  {
    src: "/boat/marina-sunset.jpg",
    alt: "Sunset over the marina, masts silhouetted against orange sky",
    caption: "Marina sunset",
  },
] as const;

/** Full-width band where the formation sweeps across as you scroll past. */
function FlyoverBand({
  uid,
  rtl = false,
  className = "",
}: {
  uid: string;
  rtl?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative h-20 overflow-hidden md:h-28 ${className}`}
    >
      <div
        className={`${rtl ? "ba-jets-rtl" : "ba-jets-ltr"} absolute left-1/2 top-1/2 ml-[-170px] mt-[-23px] w-[340px] text-navy-700/70 md:ml-[-230px] md:mt-[-31px] md:w-[460px] dark:text-ink-300/70`}
      >
        <JetFormation uid={uid} className={`h-auto w-full ${rtl ? "-scale-x-100" : ""}`} />
      </div>
    </div>
  );
}

export default function BlueAngelsPage() {
  return (
    <>
      <AppHeader
        links={nav}
        logoOnly
        logo={{
          src: "/brand/buildership-mark.svg",
          alt: "BuilderShip",
          href: "/",
          label: "BuilderShip",
        }}
      />
      <main>
        {/* Preload the above-the-fold hero background */}
        <link rel="preload" as="image" href="/boat/wake-skyline.jpg" fetchPriority="high" />

        {/* Hero — full-bleed wake + skyline, open sky for the air show. */}
        <section className="relative isolate min-h-[92svh] overflow-hidden border-b border-ink-800 bg-[#0b1a26]">
          {/* Parallax sky — the photo drifts slower than the page scrolls. */}
          <div className="ba-parallax-bg absolute inset-0 z-0" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/boat/wake-skyline.jpg"
              alt=""
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[center_30%]"
            />
          </div>
          {/* Scrims for text legibility over the sparkling wake */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/35 to-black/40" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/15 to-transparent" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-white to-transparent dark:from-ink-900" aria-hidden />
          {/* The Blue Angels — glide into formation on load, climb out as you scroll. */}
          <div className="ba-jets-depart pointer-events-none absolute inset-x-0 top-12 z-[15] md:top-[10%]" aria-hidden>
            <div className="ba-jets-arrive w-[min(560px,88vw)] text-navy-900/85">
              <JetFormation uid="hero" trail="light" className="h-auto w-full" />
            </div>
          </div>
          {/* `dark` forces light text over the photo regardless of site theme */}
          <div className="dark container-page relative z-20 flex min-h-[inherit] flex-col justify-center pt-28 pb-24 sm:pt-24 sm:pb-28 lg:pt-24 lg:pb-32">
            <div className="ba-enter flex flex-wrap items-center gap-2 [animation-delay:80ms]">
              <span className="pill-outline">#SFTechWeek</span>
              <span className="pill-outline">Fleet Week · San Francisco</span>
              <span className="pill-outline">Invite only · 50 seats</span>
              <span className="pill-lime">
                <span className="live-dot" /> Thursday, Oct 8 · 12–5 PM
              </span>
            </div>
            <h1 className="ba-enter h-display mt-10 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 [animation-delay:160ms] sm:text-6xl lg:text-7xl xl:max-w-2xl dark:text-ink-50">
              Watch the{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime/80" aria-hidden />
                <span className="relative">Blue Angels</span>
              </span>{" "}
              from the water.
            </h1>
            <p className="ba-enter mt-7 max-w-2xl text-xl text-ink-600 [animation-delay:280ms] dark:text-ink-300 xl:max-w-xl">
              A once-in-a-lifetime chance to cruise on an 89-foot yacht while the Blue Angels
              perform over your head. Food, drinks, and a few very intentional introductions.
            </p>
            <div className="ba-enter mt-10 flex flex-wrap items-center gap-3 [animation-delay:380ms]">
              <Link href={PARTIFUL_URL} target="_blank" rel="noreferrer" className="btn-lime px-6 py-3.5 text-sm">
                Get on the list →
              </Link>
              <Link href="#flow" className="btn-outline px-6 py-3.5 text-sm">
                The flow
              </Link>
              <Link href="#boat" className="btn-ghost text-sm">
                Meet the boat →
              </Link>
            </div>
            <div className="ba-enter mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:460ms]">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                Sponsored by
              </span>
              <span className="h-display text-xl font-bold tracking-tight text-ink-900 dark:text-white">
                TENKI.CLOUD
              </span>
              <span className="h-display text-xl font-bold tracking-tight text-ink-900 dark:text-white">
                LUXOR.TECH
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                Curated by
              </span>
              <span className="h-display text-xl font-bold tracking-tight text-ink-900 dark:text-white">
                SMOOV
              </span>
            </div>
            {/* Builder Ship 2026 — aboard this exact boat. Floats top-right on xl. */}
            <div className="ba-enter mt-12 max-w-2xl [animation-delay:540ms] xl:absolute xl:right-12 xl:top-1/2 xl:mt-0 xl:w-[420px] xl:-translate-y-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                Watch · aboard the same yacht
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

        {/* Logistics strip */}
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-12">
            <dl className="ba-reveal grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0">
              {logistics.map(([value, label]) => (
                <div key={value}>
                  <dd className="h-display text-2xl font-bold text-navy-700 sm:text-3xl dark:text-lime">{value}</dd>
                  <dt className="mt-2 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <FlyoverBand uid="band-a" className="bg-white dark:bg-ink-900" />

        {/* The flow */}
        <Section id="flow" bg="tint">
          <SectionHeader
            eyebrow="The flow"
            title="Jets overhead. The right people on deck."
            body="Limited to 50, selected specifically to meet each other — founders, enterprise technical leaders, and the GTM decision-makers who own events, field marketing, growth, and partnerships."
          />
          <ol className="grid gap-4 md:grid-cols-3">
            {flow.map((s) => (
              <li key={s.num} className="card ba-reveal flex h-full flex-col">
                <span className="font-mono text-xs font-semibold text-navy-700 dark:text-lime">{s.num}</span>
                <h3 className="h-display mt-3 text-xl font-bold text-ink-900 dark:text-ink-50">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="ba-reveal mt-8 rounded-card border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Curated by Smoov
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-700 dark:text-ink-200">
              No speed networking. No random table assignments. Before the event, we&apos;ll set up a
              call and ask what you&apos;re trying to unlock and who would genuinely be useful for you
              to meet. If there&apos;s a strong match, we&apos;ll send you your group and timing
              beforehand — just a few conversations we think are worth having.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-700 dark:text-ink-200">
              <strong className="font-semibold text-ink-900 dark:text-ink-50">
                Run relationship-driven GTM?
              </strong>{" "}
              If you lead Events, Field Marketing, Growth, or Partnerships at a Seed–Series C
              company selling into the enterprise — and private dinners, roundtables, and customer
              events are part of your motion (or you&apos;re trying to make them one) — Thursday
              doubles as a live demo of how Smoov builds a room.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {smoovTopics.map((t) => (
                <span key={t} className="pill-outline">{t}</span>
              ))}
            </div>
          </div>
        </Section>

        {/* Sponsors */}
        <Section>
          <SectionHeader
            eyebrow="Sponsored by Tenki.Cloud & Luxor.tech"
            title="The teams powering the world's compute, on deck."
            body="Both teams will be aboard — come talk infrastructure between flyovers."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {sponsors.map((s) => (
              <div key={s.name} className="card ba-reveal flex flex-col">
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
                </div>
              </div>
            ))}
          </div>
        </Section>

        <FlyoverBand uid="band-b" rtl className="bg-white dark:bg-ink-900" />

        {/* The boat + gallery */}
        <Section id="boat" bg="tint">
          <SectionHeader
            eyebrow="The boat"
            title="89 feet of front-row seats."
            body="Five staterooms, a hot tub on the top deck, Starlink Wi-Fi, and a main salon big enough for the whole list — the same yacht BuilderShip finals sailed on."
          />
          <div className="overflow-hidden rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/boat/yacht-bridge.jpg"
              alt="The 89-foot yacht anchored on the bay beneath the Bay Bridge"
              className="ba-photo-drift h-[320px] w-full object-cover sm:h-[420px] lg:h-[560px]"
              loading="eager"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((p) => (
              <figure
                key={p.src}
                className="ba-reveal overflow-hidden rounded-card border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <figcaption className="px-4 py-3 text-xs text-ink-600 dark:text-ink-300">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* How to get aboard */}
        <Section bg="navy">
          <div className="ba-reveal grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
                How to get aboard
              </p>
              <h2 className="h-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
                50 seats. One air show. Thursday, Oct 8.
              </h2>
              <p className="mt-5 max-w-xl text-lg text-ink-100">
                This event is invite only — but RSVP and we&apos;ll reach out to ask what
                you&apos;re building, what you&apos;re trying to solve, and what would make the day
                genuinely useful. Applications are reviewed individually.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href={PARTIFUL_URL} target="_blank" rel="noreferrer" className="btn-lime px-6 py-3.5 text-sm">
                Get on the list →
              </Link>
              <Link href="/projects" className="btn bg-white px-6 py-3.5 text-sm text-navy-700 hover:bg-ink-100">
                Explore BuilderShip →
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
