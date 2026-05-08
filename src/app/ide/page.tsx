import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { IdePreview } from "@/components/marketing/ide-preview";

const features = [
  { title: "Contree-isolated", body: "Each workspace is a VM-isolated sandbox with full root, network, and persistent images. Snapshot anytime." },
  { title: "code-server editor", body: "VS Code in your browser. Extensions, debugger, terminal. Auth via session token, never exposed to the public." },
  { title: "Token Factory built in", body: "Per-user scoped key injected as TOKEN_FACTORY_API_KEY. Switch models from the chrome dropdown." },
  { title: "Nebius CLI preinstalled", body: "Gateway runs in loopback+token mode. contree-mcp wired so your agent can spawn sub-sandboxes for risky ops." },
  { title: "Snapshot · Fork · Rollback", body: "Pin a known-good state before your demo. Fork to try another approach in parallel. Roll back without rebuilds." },
  { title: "Deploy to Nebius", body: "One click ships your snapshot to Nebius CPU Serverless (or GPU via NemoClaw). Status streams back to your project card." },
];

const steps = [
  { tag: "1", title: "Pick a target", body: "Local · Docker · Nebius CPU Serverless · Nebius GPU Serverless." },
  { tag: "2", title: "We snapshot the workspace", body: "Image lineage preserved. Reproducible across runs and judges." },
  { tag: "3", title: "Push to GHCR + roll", body: "Nebius install scripts run against Serverless. Live URL in seconds." },
];

export default function IdePage() {
  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">Cloud IDE</p>
            <h1 className="h-display max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Open a workspace. Ship an agent.</h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-600">Contree workspace + code-server editor + Token Factory inference + Nebius Serverless deploy. The whole loop, in your browser.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/builders/login" className="btn-lime">Open the IDE →</Link>
              <Link href="https://github.com/opencolin/openclaw-deploy" className="btn-outline">openclaw-deploy on GitHub ↗</Link>
            </div>
          </div>
        </section>

        <IdePreview />

        <section className="section bg-ink-50">
          <div className="container-page">
            <h2 className="h-display max-w-3xl text-3xl font-bold md:text-4xl">Six things you don't have to set up.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="card">
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink-600">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container-page">
            <h2 className="h-display max-w-3xl text-3xl font-bold md:text-4xl">Deploy in three steps.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.tag} className="card">
                  <span className="pill-lime">Step {s.tag}</span>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-navy-700 text-white">
          <div className="container-page grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-lime">Snapshot &amp; fork</p>
              <h2 className="h-display text-3xl font-bold md:text-4xl">Demo from a known-good state. Always.</h2>
              <p className="mt-4 text-ink-100">Three minutes before you go on stage, snapshot the workspace. If your live demo blows up, roll back. If a judge asks "what if", fork and answer.</p>
            </div>
            <pre className="rounded-card border border-navy-600 bg-navy-800 p-5 text-[13px] leading-relaxed text-ink-100"><code>{`▸ nebius workspace snapshot --label ready-for-demo
✓ snapshot ready-for-demo created (image: ws-7af@4)

▸ nebius workspace fork ready-for-demo --branch tavily-rewired
✓ workspace ws-9bc booting from ready-for-demo
✓ TOKEN_FACTORY_API_KEY scoped & rotated

▸ nebius deploy --target cpu-serverless --snapshot ready-for-demo
queued ▸ building ▸ deploying ▸ live
   https://muglife.serverless.nebius.com`}</code></pre>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
