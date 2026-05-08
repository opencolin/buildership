import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { docSections } from "@/lib/data";

export default function DocsHome() {
  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">Docs</p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">Build with Nebius Builders.</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600">From your first Nebius CLI install through your first hackathon win — and how to host one of your own.</p>
            <div className="mt-6 max-w-xl">
              <input type="search" className="input" placeholder="Search docs… (⌘K)" />
            </div>
          </div>
        </section>
        <section className="section bg-ink-50">
          <div className="container-page grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {docSections.map((s) => (
              <div key={s.title} className="card">
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.pages.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/docs/${p.slug}`} className="block rounded-md px-2 py-1 text-ink-700 hover:bg-ink-100 hover:text-ink-900">→ {p.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
