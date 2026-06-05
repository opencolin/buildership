"use client";

import { useEffect, useRef } from "react";

/**
 * The hero yacht. As the user scrolls through the hero it drifts down-and-right
 * and scales up — reading as the boat moving toward the viewer. Transform-only
 * (compositor-friendly), one rAF in flight at a time, scroll listener gated to
 * when the hero is actually on screen, and honors prefers-reduced-motion.
 */
export function HeroBoat() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let vh = window.innerHeight;
    let last = -1;

    const update = () => {
      raf = 0;
      const p = Math.min(1, (window.scrollY || 0) / Math.max(1, vh * 0.9));
      if (p === last) return; // skip redundant writes (e.g. scrolled past hero)
      last = p;
      el.style.transform = `translate3d(${p * 220}px, ${p * 240}px, 0) scale(${1 + p * 0.38})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      vh = window.innerHeight;
      onScroll();
    };

    update();

    // Only run the scroll handler while the hero is visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[90px] h-full will-change-transform md:top-[200px]"
      style={{ transformOrigin: "center 55%" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/harbor-boat.webp"
        alt=""
        decoding="async"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}
