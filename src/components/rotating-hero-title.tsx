"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Title = {
  prefix?: string;
  highlight: string;
  suffix?: string;
};

const titles: Title[] = [
  { prefix: "Code while we ", highlight: "cruise" },
  { prefix: "Compete to ", highlight: "win" },
  { prefix: "Win a ", highlight: "DGX Spark" },
  { prefix: "Win ", highlight: "$50K", suffix: " in credits" },
  { prefix: "Hack on a ", highlight: "yacht" },
  { prefix: "Build with the bay's ", highlight: "best" },
  { prefix: "Ship something ", highlight: "real" },
];

const INTERVAL_MS = 2000;

export function RotatingHeroTitle({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const t = titles[index];

  return (
    <h1
      className={cn(
        "h-display max-w-4xl min-h-[2lh] text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl dark:text-ink-50",
        className,
      )}
    >
      <span key={index} className="inline-block animate-title-in">
        {t.prefix}
        <span className="relative inline-block">
          <span
            className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime/80"
            aria-hidden
          />
          <span className="relative">{t.highlight}</span>
        </span>
        {t.suffix ?? ""}.
      </span>
    </h1>
  );
}
