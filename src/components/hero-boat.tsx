"use client";

import { useEffect, useRef } from "react";

/**
 * The hero yacht. As the user scrolls through the hero it drifts down and
 * scales up — reading as the boat moving toward the viewer. The wrapper takes
 * the scroll-driven transform; the inner <img> keeps the ambient Ken-Burns
 * drift, so the two compose. Honors prefers-reduced-motion (stays put).
 */
export function HeroBoat() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const y = window.scrollY || 0;
      // Progress over roughly the first viewport of scroll.
      const max = Math.max(1, window.innerHeight * 0.9);
      const p = Math.min(1, y / max);
      const translate = p * 240; // drifts down toward/past the viewer
      const scale = 1 + p * 0.38; // grows as it approaches
      el.style.transform = `translate3d(0, ${translate}px, 0) scale(${scale})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
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
        className="hero-kenburns h-full w-full object-cover object-center"
      />
    </div>
  );
}
