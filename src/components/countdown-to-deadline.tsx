"use client";

import { useEffect, useState } from "react";

// Submissions close: 2026-06-12 23:59:59 Pacific (UTC-07:00 PDT)
const DEADLINE_MS = Date.UTC(2026, 5, 13, 6, 59, 59); // June 13 06:59:59 UTC = June 12 23:59:59 PT

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function diff(now: number): Parts {
  const total = DEADLINE_MS - now;
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1_000);
  return { days, hours, minutes, seconds, done: false };
}

type Variant = "hero" | "inline" | "compact";

export function CountdownToDeadline({ variant = "hero", className = "" }: { variant?: Variant; className?: string }) {
  // SSR-safe: render a static placeholder until mounted to avoid hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<Parts>(() => diff(DEADLINE_MS - 1)); // safe placeholder

  useEffect(() => {
    setMounted(true);
    setParts(diff(Date.now()));
    const id = setInterval(() => setParts(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  if (variant === "compact") {
    return (
      <span className={`font-mono text-xs font-semibold tracking-tight ${className}`} suppressHydrationWarning>
        {parts.done
          ? "Submissions closed"
          : `${parts.days}d ${parts.hours.toString().padStart(2, "0")}h ${parts.minutes
              .toString()
              .padStart(2, "0")}m to submit`}
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span className={className} suppressHydrationWarning>
        {parts.done
          ? "Submissions closed"
          : `${parts.days} day${parts.days === 1 ? "" : "s"}, ${parts.hours} hour${
              parts.hours === 1 ? "" : "s"
            } until submissions close`}
      </span>
    );
  }

  // hero variant — big countdown cells
  const cells: Array<{ label: string; value: string }> = parts.done
    ? [{ label: "Status", value: "Closed" }]
    : [
        { label: "Days", value: parts.days.toString() },
        { label: "Hours", value: parts.hours.toString().padStart(2, "0") },
        { label: "Minutes", value: parts.minutes.toString().padStart(2, "0") },
        { label: "Seconds", value: parts.seconds.toString().padStart(2, "0") },
      ];

  return (
    <div className={className} suppressHydrationWarning>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
        Countdown · submissions close June 12, 23:59 PT
      </p>
      <div className="mt-3 grid grid-cols-4 gap-3 sm:max-w-md">
        {cells.map((c) => (
          <div
            key={c.label}
            className="rounded-card border border-ink-200 bg-white px-3 py-3 text-center dark:border-ink-700 dark:bg-ink-900"
          >
            <div className="h-display text-2xl font-bold tabular-nums text-navy-700 sm:text-3xl dark:text-lime">
              {mounted ? c.value : "—"}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
