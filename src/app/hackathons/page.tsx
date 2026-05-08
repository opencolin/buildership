import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, SectionHeader } from "@/components/section";

const tracks = [
  {
    badge: "Partner-led",
    title: "We co-host with you",
    body: "You're a Nebius partner building on the stack. We bring credits, a Nebius engineer on-site or remote, technical focus areas, and a branded track prize.",
    bestFor: "Partners launching new APIs, model releases, or integration stories.",
    intensity: "High",
  },
  {
    badge: "Community",
    title: "You run it. We sponsor.",
    body: "Your team owns ops. We provide Token Factory credits scoped per builder, an optional Nebius rep, workshop content, and a track prize aligned to your theme.",
    bestFor: "Universities, AI clubs, builder communities, conferences.",
    intensity: "Medium",
    highlight: true,
  },
  {
    badge: "Credit-only",
    title: "Light-touch credit sponsorship",
    body: "Fastest path. We fund Token Factory credits and send a tutorial. No on-site rep needed. Best for 5–10 hour formats and side-events.",
    bestFor: "Hack nights, side tracks, and online jams.",
    intensity: "Low",
  },
];

const criteria = [
  { title: "Professionals or founders", body: "We back hackathons whose attendees are shipping or starting companies — not first-time learners. The bar is real working software." },
  { title: "100+ participants", body: "Strong programs hit a critical mass of teams. Below 100 the partner ROI is hard to measure." },
  { title: "2–5 partner companies", body: "A balanced stack — infra + AI + a vertical or tooling partner — produces the most complete projects." },
  { title: "Clear technical theme", body: "Agents, vertical AI, infra, evals — pick one. Themed events out-ship open-prompt events 3:1." },
];

const questions = [
  "How many attendees do you expect?",
  "Where is this hackathon happening — city, remote, or hybrid?",
  "When is it? (Start date and duration)",
  "How many companies are participating so far?",
  "What do you need from us? (Compute · On-site rep · Technical focus areas · Other confirmed sponsors)",
  "Have you run hackathons before? Can you point to a recap?",
  "Is there room for a Nebius track prize aligned to a specific stack focus?",
];

const provides = [
  { t: "Token Factory credits", b: "Scoped per attendee, rotated automatically. Default model picker covers Llama-, GLM-, and Qwen-class models." },
  { t: "On-site engineer (optional)", b: "A Nebius solutions engineer for kickoff, office hours, and judging. Higher-leverage when nearby." },
  { t: "Technical focus", b: "We co-author the brief: what to build, what models to try, which sponsor SDKs pair well with which." },
  { t: "Workshop content", b: "Pre-recorded sessions from the Builders library queued up for warm-up — agents, Token Factory, deploys." },
  { t: "Branded track prize", b: "A clear Nebius track with a clear winning rubric. Logo placement on event pages and recap." },
  { t: "Discord support", b: "A live channel during the event so builders can unblock fast and you can keep eyes on the floor." },
];

const process = [
  { tag: "1", title: "Apply", body: "Tell us about your hackathon — date, audience, partners, ask. Two minutes." },
  { tag: "2", title: "Intake call", body: "20-minute scoping call to confirm fit, quantify support, agree on a track prize." },
  { tag: "3", title: "Onboarding", body: "We share credits, a starter pack, and a private Discord for your organizers." },
  { tag: "4", title: "Event", body: "Optional rep on-site or remote. Token Factory keys load on each builder's first sign-in." },
  { tag: "5", title: "Recap", body: "Post-event summary auto-generated. Newsletter feature, recap blog, invites to the next one." },
];

export default function HackathonsPage() {
  return (
    <>
      <TopNav />
      <main>
        <section className="relative overflow-hidden border-b border-ink-200 bg-white">
          <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
          <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-lime/40 blur-3xl" aria-hidden />
          <div className="container-page relative pt-20 pb-24 sm:pt-28 lg:pt-32">
            <span className="pill-lime mb-6">For organizers, partners, and sponsors</span>
            <h1 className="h-display max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Run a hackathon. <span className="relative inline-block"><span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime/80" aria-hidden /><span className="relative">We bring Nebius.</span></span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-600">
              Nebius hackathons are built to support the AI developer community. Bring 100+ professionals or founders.
              We bring Token Factory credits, a Nebius engineer on-site or remote, and a clear technical track.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#apply" className="btn-lime px-6 py-3.5 text-sm">Apply for support →</Link>
              <Link href="#what-we-look-for" className="btn-outline px-6 py-3.5 text-sm">See the criteria</Link>
              <Link href="/events" className="btn-ghost text-sm">See what's already on the calendar →</Link>
            </div>
          </div>
        </section>

        <Section bg="tint" id="tracks">
          <SectionHeader
            eyebrow="Three ways we partner"
            title="Pick the level of involvement that fits your event."
            body="Light credit sponsorship to a fully co-hosted partnership — we have a lane for each."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {tracks.map((t) => (
              <div key={t.badge} className={`card flex flex-col gap-5 ${t.highlight ? "border-navy-700 shadow-soft" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className={t.highlight ? "pill-lime" : "pill-outline"}>{t.badge}</span>
                  <span className="text-xs font-medium uppercase tracking-widest text-ink-500">{t.intensity} touch</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{t.title}</h3>
                <p className="text-ink-600">{t.body}</p>
                <p className="text-sm text-ink-500"><strong className="text-ink-800">Best for:</strong> {t.bestFor}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="what-we-look-for">
          <SectionHeader
            eyebrow="What we look for"
            title="The events we back have a few things in common."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {criteria.map((c) => (
              <div key={c.title} className="card">
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section bg="navy">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-lime">Questions we'll ask</p>
              <h2 className="h-display text-3xl font-bold leading-tight md:text-4xl">A 20-minute scoping call. Be ready with these.</h2>
              <p className="mt-4 text-ink-100">If your team is already aligned on the answers, we move from "interested" to "confirmed" in a single meeting.</p>
            </div>
            <ol className="lg:col-span-7 space-y-3">
              {questions.map((q, i) => (
                <li key={q} className="flex gap-4 rounded-card border border-navy-600 bg-navy-800 p-5 text-white">
                  <span className="kbd shrink-0 bg-lime text-navy-700 border-lime">{i + 1}</span>
                  <span className="text-ink-100">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section bg="tint" id="provides">
          <SectionHeader
            eyebrow="What we provide"
            title="Credits, compute, content, and a Nebius engineer when it counts."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {provides.map((p) => (
              <div key={p.t} className="card">
                <h3 className="text-base font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-ink-600">{p.b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="process">
          <SectionHeader
            eyebrow="The process"
            title="From application to recap in five steps."
          />
          <ol className="grid gap-4 md:grid-cols-5">
            {process.map((s) => (
              <li key={s.tag} className="card">
                <span className="pill-lime">Step {s.tag}</span>
                <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="apply" bg="tint">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Apply for support"
                title="Tell us about your hackathon."
                body="The more concrete the answers, the faster we can come back with a yes (or a sharper conversation if the fit isn't quite right)."
              />
              <ul className="grid gap-3 text-sm text-ink-700">
                <li>📍 In-person, remote, or hybrid — all formats considered.</li>
                <li>📅 We back events 4 weeks out or further. Tight timelines welcome with credit-only support.</li>
                <li>🤝 Existing Nebius partners get expedited review.</li>
                <li>✉️ <a href="mailto:hackathons@nebius.com" className="underline-offset-4 hover:underline">hackathons@nebius.com</a> if email is faster than a form.</li>
              </ul>
            </div>
            <form className="card grid gap-4 p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="hk-name">Your name</label>
                  <input id="hk-name" className="input" placeholder="Colin Lowenberg" />
                </div>
                <div>
                  <label className="label" htmlFor="hk-email">Email</label>
                  <input id="hk-email" type="email" className="input" placeholder="organizer@yourco.com" />
                </div>
                <div>
                  <label className="label" htmlFor="hk-org">Organization</label>
                  <input id="hk-org" className="input" placeholder="University · Community · Company" />
                </div>
                <div>
                  <label className="label" htmlFor="hk-track">Track</label>
                  <select id="hk-track" className="input">
                    <option>Partner-led</option>
                    <option>Community</option>
                    <option>Credit-only</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="hk-when">When</label>
                  <input id="hk-when" type="date" className="input" />
                </div>
                <div>
                  <label className="label" htmlFor="hk-where">Where</label>
                  <input id="hk-where" className="input" placeholder="City, or 'Remote'" />
                </div>
                <div>
                  <label className="label" htmlFor="hk-attendees">Expected attendees</label>
                  <input id="hk-attendees" type="number" className="input" placeholder="100" min={0} />
                </div>
                <div>
                  <label className="label" htmlFor="hk-partners"># of confirmed partners</label>
                  <input id="hk-partners" type="number" className="input" placeholder="2" min={0} />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="hk-need">What do you need from us?</label>
                <textarea id="hk-need" rows={4} className="input" placeholder="Token Factory credits scoped per attendee, a Nebius engineer for kickoff and judging, a $2.5k track prize for best agent on Nebius..." />
              </div>
              <div>
                <label className="label" htmlFor="hk-prior">Prior hackathon (optional)</label>
                <input id="hk-prior" className="input" placeholder="Link to a recap or photos" />
              </div>
              <button type="button" className="btn-lime mt-2 w-full">Apply →</button>
              <p className="text-xs text-ink-500">We respond within 24 hours on weekdays. Submitting opts you in to a single follow-up email — no marketing list.</p>
            </form>
          </div>
        </Section>

        <Section bg="white">
          <div className="card flex flex-col items-start justify-between gap-6 bg-navy-700 p-10 text-white sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-lime">Want a quicker answer?</p>
              <h3 className="mt-2 text-2xl font-bold">Already a Nebius partner?</h3>
              <p className="mt-2 text-ink-100">Skip the form — DM your account team. We'll loop in the Builders crew the same day.</p>
            </div>
            <Link href="mailto:hackathons@nebius.com" className="btn-lime shrink-0">Email hackathons@nebius.com →</Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
