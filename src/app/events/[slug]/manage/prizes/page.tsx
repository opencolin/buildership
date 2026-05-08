import { EventManagerShell } from "@/components/event-manager-shell";
import { events, eventPrizes } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default function PrizesTab({ params }: { params: { slug: string } }) {
  const total = eventPrizes.reduce((acc, p) => acc + p.dollarValue, 0);
  return (
    <EventManagerShell eventSlug={params.slug} active="Prizes">
      <section className="section">
        <div className="container-page">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="h-display text-2xl font-bold">Prizes</h2>
              <p className="text-sm text-ink-500">Distribution flows through Tremendous · current pool ${total.toLocaleString()}</p>
            </div>
            <button className="btn-lime">+ Add prize</button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {eventPrizes.map((p) => (
              <div key={p.title} className="card">
                <div className="flex items-start justify-between">
                  <span className="pill-lime">${p.dollarValue.toLocaleString()}</span>
                  <button className="text-xs text-ink-500 hover:text-ink-700">Edit</button>
                </div>
                <h3 className="mt-3 text-base font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-600">Specific enough to guide builders, broad enough to invite creativity.</p>
                <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
                  <span>Display: {p.value}</span>
                  <span className="pill-outline">Unassigned</span>
                </div>
              </div>
            ))}
            <div className="card flex flex-col items-center justify-center border-dashed text-center">
              <p className="text-sm font-medium">+ New prize</p>
              <p className="mt-1 text-xs text-ink-500">e.g. Best Token Factory build</p>
            </div>
          </div>

          <div className="mt-10 card">
            <h3 className="text-lg font-semibold">New prize</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="label">Title</label>
                <input className="input" placeholder="Best Use of Nebius Token Factory" />
              </div>
              <div className="md:col-span-2">
                <label className="label">Description</label>
                <textarea rows={3} className="input" placeholder="What should builders optimize for to win this?" />
              </div>
              <div>
                <label className="label">Display value</label>
                <input className="input" placeholder="$2,500 Tremendous credit" />
              </div>
              <div>
                <label className="label">Dollar value</label>
                <input className="input" placeholder="2500" type="number" />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="btn-outline">Cancel</button>
              <button className="btn-lime">Save prize</button>
            </div>
            <p className="mt-3 text-xs text-ink-500">Tremendous integration is gated to support@nebius.com today; we'll wire your payout on first prize.</p>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
