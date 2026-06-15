import Link from "next/link";
import { events } from "@/lib/data";
import { EventCard } from "@/components/event-card";
import { Section, SectionHeader } from "@/components/section";

export function ActiveEvents() {
  const featured = events.filter((e) => e.state !== "COMPLETED").slice(0, 4);
  return (
    <Section bg="tint">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeader
          eyebrow="What's on this week"
          title="Live and upcoming"
          body="Public events you can drop into. Token Factory keys load with one click."
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featured.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </Section>
  );
}
