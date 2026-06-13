"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  // Escape to close + lock body scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Auto-close if the viewport grows to the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-700 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-ink-800 dark:hover:text-ink-50"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop (below the header) catches outside taps */}
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-30 bg-ink-950/40 backdrop-blur-sm"
          />
          {/* Slide-down panel */}
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 z-40 origin-top border-b border-ink-200 bg-white px-3 pb-4 pt-2 shadow-lg dark:border-ink-800 dark:bg-ink-900"
          >
            <nav className="flex flex-col gap-0.5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-100 dark:text-ink-100 dark:hover:bg-ink-800"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/builders/login"
                onClick={() => setOpen(false)}
                className="mt-1 border-t border-ink-100 px-3 pt-3 pb-3 text-base font-medium text-ink-800 hover:bg-ink-100 dark:border-ink-800 dark:text-ink-100 dark:hover:bg-ink-800"
              >
                Log in
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
