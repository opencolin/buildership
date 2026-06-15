import Link from "next/link";
import { eq } from "drizzle-orm";
import { BuilderShipLogo } from "./buildership-logo";
import { ThemeToggle } from "./theme-toggle";
import { SignOutButton } from "./sign-out-button";
import { db } from "@/server/db";
import { events } from "@/server/db/schema";
import { safeAuth } from "@/server/lib/safe-auth";

export async function AppHeader({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  const session = await safeAuth();
  const user = session?.user;
  const label = user?.name ?? user?.email ?? "";
  const initials =
    label
      .split(/[ @.]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "?";

  // Showcase + Judges must always be reachable from the header nav,
  // whatever a page passes in.
  const required = [
    { label: "Showcase", href: "/projects" },
    { label: "Judges", href: "/judging-panel" },
    { label: "Photos", href: "/photos" },
  ];
  const navLinks = [...links];
  for (const r of required) {
    if (!navLinks.some((l) => l.href === r.href)) navLinks.push(r);
  }

  // Submit button → the signed-in builder's own project editor.
  const [event] = user
    ? await db
        .select({ id: events.id })
        .from(events)
        .where(eq(events.slug, "buildership"))
        .limit(1)
    : [];
  const submitHref = event
    ? `/builders/dashboard/events/${event.id}/builder#project`
    : "/builders/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/85 backdrop-blur dark:border-ink-800 dark:bg-ink-900/85">
      <div className="container-page flex h-16 items-center justify-between md:h-[72px]">
        <div className="flex items-center gap-8">
          <BuilderShipLogo />
          <nav className="hidden gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-ink-800 dark:hover:text-ink-50"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <Link href={submitHref} className="btn-lime text-sm">
                Submit
              </Link>
              <SignOutButton />
              <Link
                href="/builders/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white py-1 pl-1 pr-3 text-sm text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt=""
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-lime text-xs font-bold text-navy-700">
                    {initials}
                  </span>
                )}
                <span className="hidden max-w-[10rem] truncate sm:inline">
                  {user.name ?? user.email}
                </span>
              </Link>
            </>
          ) : (
            <Link href="/builders/login" className="btn-lime text-sm">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
