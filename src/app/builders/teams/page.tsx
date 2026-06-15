import Link from "next/link";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { AppHeader } from "@/components/app-chrome";
import { MarkLoggedIn } from "@/components/mark-logged-in";
import { db } from "@/server/db";
import {
  events,
  teams,
  teamMemberships,
  teamInvitations,
  projects,
  users,
} from "@/server/db/schema";
import { safeAuth } from "@/server/lib/safe-auth";
import { AddTeammateForm } from "./add-teammate-form";

export const dynamic = "force-dynamic";

const builderNav = [
  { label: "Console", href: "/builders/dashboard" },
  { label: "Teams", href: "/builders/teams" },
  { label: "Workshops", href: "/workshops" },
  { label: "Profile", href: "/builders/dashboard/profile" },
];

export default async function TeamsPage() {
  const session = await safeAuth();
  if (!session?.user?.id) redirect("/builders/login");
  const uid = session.user.id;

  const [event] = await db
    .select({ id: events.id, title: events.title })
    .from(events)
    .where(eq(events.slug, "buildership"))
    .limit(1);

  const [team] = event
    ? await db
        .select({ id: teams.id, name: teams.name })
        .from(teams)
        .where(and(eq(teams.eventId, event.id), eq(teams.leaderId, uid)))
        .limit(1)
    : [];

  let project: { name: string; status: string } | null = null;
  let members: { name: string | null; email: string; role: string }[] = [];
  let invites: { email: string }[] = [];

  if (team && event) {
    const [p] = await db
      .select({ name: projects.name, status: projects.status })
      .from(projects)
      .where(and(eq(projects.teamId, team.id), eq(projects.eventId, event.id)))
      .limit(1);
    project = p ?? null;
    members = await db
      .select({ name: users.name, email: users.email, role: teamMemberships.role })
      .from(teamMemberships)
      .innerJoin(users, eq(users.id, teamMemberships.userId))
      .where(eq(teamMemberships.teamId, team.id));
    invites = await db
      .select({ email: teamInvitations.email })
      .from(teamInvitations)
      .where(
        and(eq(teamInvitations.teamId, team.id), eq(teamInvitations.status, "pending")),
      );
  }

  // The team is shown by its project name (falling back to the internal name).
  const teamName = project?.name || team?.name || "Your team";

  return (
    <>
      <MarkLoggedIn />
      <AppHeader links={builderNav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Team
            </p>
            <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Your team
            </h1>
            <p className="mt-2 max-w-2xl text-ink-600 dark:text-ink-300">
              One team per project. Add the teammates building with you — by the email they
              sign in with — so you all share the same submission.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container-page space-y-8">
            {!team ? (
              <div className="card text-sm text-ink-600 dark:text-ink-300">
                You don&apos;t lead a team yet. Your team is created automatically when you
                save your first project draft.{" "}
                <Link
                  href={
                    event
                      ? `/builders/dashboard/events/${event.id}/builder#project`
                      : "/builders/dashboard"
                  }
                  className="font-medium text-navy-700 hover:underline dark:text-lime"
                >
                  Start your project →
                </Link>
              </div>
            ) : (
              <div className="card">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    {event ? (
                      <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400">
                        {event.title}
                      </p>
                    ) : null}
                    <h2 className="mt-1 text-lg font-semibold text-ink-900 dark:text-ink-50">
                      {teamName}
                    </h2>
                    {project ? (
                      <p className="text-xs text-ink-500 dark:text-ink-400">
                        Project status: {project.status.toLowerCase()}
                      </p>
                    ) : null}
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {members.map((m) => (
                        <li key={m.email} className="pill-ink">
                          <span className="font-medium">{m.name || m.email}</span> · {m.role}
                        </li>
                      ))}
                      {invites.map((i) => (
                        <li key={i.email} className="pill-outline">
                          {i.email} · pending
                        </li>
                      ))}
                      {members.length === 0 && invites.length === 0 ? (
                        <li className="text-sm italic text-ink-400 dark:text-ink-500">
                          Just you so far.
                        </li>
                      ) : null}
                    </ul>
                  </div>
                  {event ? (
                    <Link
                      href={`/builders/dashboard/events/${event.id}/builder#project`}
                      className="btn-navy shrink-0 text-xs"
                    >
                      Edit project →
                    </Link>
                  ) : null}
                </div>

                <div className="mt-5 border-t border-ink-200 pt-4 dark:border-ink-700">
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                    Add a teammate
                  </p>
                  <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
                    Use the email they sign in with. Registered builders are added instantly;
                    otherwise we send them a pending invite.
                  </p>
                  <div className="mt-3">
                    <AddTeammateForm />
                  </div>
                </div>
              </div>
            )}

            <div className="card bg-navy-700 text-white">
              <h3 className="text-lg font-semibold">Looking for teammates?</h3>
              <p className="mt-2 text-sm text-ink-100">
                Post what you&apos;re building and what you need on X — tag{" "}
                <span className="font-mono font-medium text-lime">
                  @ship_builders @nebiusai @composio @tavilyai @openclaw
                </span>
                . Other builders find you there.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
