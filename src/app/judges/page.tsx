import { redirect } from "next/navigation";
import { and, eq, ilike } from "drizzle-orm";
import { AppHeader } from "@/components/app-chrome";
import { db } from "@/server/db";
import {
  events,
  projects,
  teams,
  users,
  eventRegistrations,
  judges,
} from "@/server/db/schema";
import { safeAuth } from "@/server/lib/safe-auth";
import { ProjectsBrowser, type JudgeProject } from "./projects-browser";

export const dynamic = "force-dynamic";

const judgesNav = [
  { label: "Projects", href: "/judges" },
  { label: "Schedule", href: "/events" },
];

export default async function JudgesPortal() {
  const session = await safeAuth();
  if (!session?.user) redirect("/builders/login?callbackUrl=/judges");
  const uid = session.user.id;

  const [event] = await db
    .select({ id: events.id, title: events.title })
    .from(events)
    .where(eq(events.slug, "buildership"))
    .limit(1);

  // Access: admins, anyone registered with a judge role, or judges-table members.
  const judgeReg = event
    ? await db
        .select({ role: eventRegistrations.role })
        .from(eventRegistrations)
        .where(
          and(
            eq(eventRegistrations.userId, uid),
            eq(eventRegistrations.eventId, event.id),
            ilike(eventRegistrations.role, "%judge%"),
          ),
        )
        .limit(1)
    : [];
  const judgeRow = await db
    .select({ id: judges.id })
    .from(judges)
    .where(eq(judges.userId, uid))
    .limit(1);

  const isJudge =
    Boolean(session.user.isAdmin) || judgeReg.length > 0 || judgeRow.length > 0;

  if (!isJudge) {
    return (
      <>
        <AppHeader links={judgesNav} />
        <main className="bg-ink-50 dark:bg-ink-800">
          <section className="container-page py-16">
            <h1 className="h-display text-3xl font-bold text-ink-900 dark:text-ink-50">
              Judges only.
            </h1>
            <p className="mt-3 max-w-xl text-ink-600 dark:text-ink-300">
              This portal is for BuilderShip judges. If you&apos;re judging and
              seeing this, sign in with the email on your judge registration —
              or ask the organizers to add you.
            </p>
          </section>
        </main>
      </>
    );
  }

  const rows = event
    ? await db
        .select({
          id: projects.id,
          name: projects.name,
          summary: projects.summary,
          status: projects.status,
          demoUrl: projects.demoUrl,
          websiteUrl: projects.websiteUrl,
          repoUrl: projects.repoUrl,
          xPostUrl: projects.xPostUrl,
          linkedinPostUrl: projects.linkedinPostUrl,
          teamName: teams.name,
          leaderName: users.name,
          leaderX: users.twitterUrl,
          leaderLi: users.linkedinUrl,
          leaderRole: eventRegistrations.role,
        })
        .from(projects)
        .innerJoin(teams, eq(projects.teamId, teams.id))
        .innerJoin(users, eq(teams.leaderId, users.id))
        .leftJoin(
          eventRegistrations,
          and(
            eq(eventRegistrations.userId, users.id),
            eq(eventRegistrations.eventId, projects.eventId),
          ),
        )
        .where(eq(projects.eventId, event.id))
    : [];

  const items: JudgeProject[] = rows.map((r) => ({
    id: r.id,
    name: r.name || r.teamName || "Untitled",
    team: r.teamName,
    leader: r.leaderName,
    role: r.leaderRole,
    building: r.summary,
    demo: r.demoUrl,
    website: r.websiteUrl,
    repo: r.repoUrl,
    x: r.leaderX || r.xPostUrl,
    linkedin: r.leaderLi || r.linkedinPostUrl,
    status: r.status,
  }));

  // Surface the most complete entries first.
  const score = (p: JudgeProject) =>
    (p.demo ? 4 : 0) +
    (p.website ? 2 : 0) +
    (p.building ? 1 : 0) +
    (p.status === "submitted" ? 8 : 0);
  items.sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name));

  return (
    <>
      <AppHeader links={judgesNav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Judges portal
            </p>
            <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Projects &amp; companies
            </h1>
            <p className="mt-2 text-ink-600 dark:text-ink-300">
              Every team building at BuilderShip — what they&apos;re building,
              plus their demo, website, and socials. Search and filter to dig in.
            </p>
          </div>
        </section>

        <ProjectsBrowser projects={items} />
      </main>
    </>
  );
}
