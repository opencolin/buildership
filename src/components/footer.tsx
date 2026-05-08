import Link from "next/link";
import { NebiusLogo } from "./nebius-logo";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/events", label: "Events" },
      { href: "/workshops", label: "Workshops" },
      { href: "/ide", label: "Cloud IDE" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Builders",
    links: [
      { href: "/builders/login", label: "Log in" },
      { href: "/docs/builders/install-nebius-cli", label: "Install the Nebius CLI" },
      { href: "/docs/builders/create-a-team", label: "Create a team" },
      { href: "/docs/builders/submit-a-project", label: "Submit a project" },
    ],
  },
  {
    title: "Businesses",
    links: [
      { href: "/companies/login", label: "Host an event" },
      { href: "/hackathons", label: "Run a hackathon" },
      { href: "/pricing", label: "Pricing" },
      { href: "/docs/event-managers/create-an-event", label: "Create an event" },
      { href: "#contact", label: "Talk to us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/docs/nebius-cli/token-factory", label: "Token Factory" },
      { href: "https://docs.contree.dev/", label: "Contree" },
      { href: "https://github.com/opencolin/openclaw-deploy", label: "openclaw-deploy" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#careers", label: "Careers" },
      { href: "/about#privacy", label: "Privacy" },
      { href: "#contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 space-y-4">
            <NebiusLogo />
            <p className="max-w-xs text-sm text-ink-600">
              The operating layer for AI builder events on Nebius. Built on Nebius.
            </p>
            <p className="text-sm text-ink-500">San Francisco · Remote · Accepting Q3 bookings</p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-700 hover:text-ink-900">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-ink-500">© 2026 Nebius B.V. — Builders is a Nebius product. All rights reserved.</p>
          <p className="text-xs text-ink-500">Response time &lt; 24 hours · builders@nebius.com</p>
        </div>
      </div>
    </footer>
  );
}
