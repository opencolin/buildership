"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Native gallery for the event's Google Photos album. Google Photos sends
 * X-Frame-Options: SAMEORIGIN, so the album can't be iframed — instead we render
 * the photos directly from their lh3.googleusercontent.com URLs (with a size
 * suffix) and open a larger view in a lightbox on click.
 */
export function PhotoGallery({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const open = idx !== null;

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback(
    (d: number) =>
      setIdx((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="gap-3 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 [&>button]:mb-3">
        {photos.map((u, i) => (
          <button
            key={u}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Open photo ${i + 1} of ${photos.length}`}
            className="block w-full overflow-hidden rounded-lg border border-ink-200 bg-ink-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime dark:border-ink-700 dark:bg-ink-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${u}=w600`}
              loading="lazy"
              decoding="async"
              alt={`BuilderShip event photo ${i + 1}`}
              className="w-full"
            />
          </button>
        ))}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${photos[idx as number]}=w1600`}
            alt={`BuilderShip event photo ${(idx as number) + 1}`}
            className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl leading-none text-white transition hover:bg-white/30"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-3xl leading-none text-white transition hover:bg-white/30 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-3xl leading-none text-white transition hover:bg-white/30 sm:right-6"
          >
            ›
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white">
            {(idx as number) + 1} / {photos.length}
          </span>
        </div>
      ) : null}
    </>
  );
}
