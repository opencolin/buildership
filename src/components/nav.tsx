import Link from "next/link";
import { NebiusLogo } from "./nebius-logo";

const links = [
  { href: "/events", label: "Events" },
  { href: "/hackathons", label: "Hackathons" },
  { href: "/workshops", label: "Workshops" },
  { href: "/ide", label: "IDE" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <NebiusLogo />
          <nav className="hidden gap-1 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-ink-100 hover:text-ink-900">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/companies/login" className="hidden text-sm font-medium text-ink-700 hover:text-ink-900 md:inline">For businesses</Link>
          <Link href="/builders/login" className="btn-ghost">Log in</Link>
          <Link href="/builders/login" className="btn-lime">Start building</Link>
        </div>
      </div>
    </header>
  );
}
