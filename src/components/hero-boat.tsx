/**
 * The hero yacht. Its scroll-linked motion (drift down/right + scale toward the
 * viewer) is driven entirely by CSS scroll-timeline — see `.hero-boat-scroll`
 * in globals.css. That keeps it on the compositor with no main-thread scroll
 * handler, which matters because the image layer is full-bleed and large.
 * Where scroll-timeline is unsupported (or motion is reduced) the boat is
 * simply static. No JS, so this is a plain server component.
 */
export function HeroBoat() {
  return (
    <div
      aria-hidden
      className="hero-boat-scroll pointer-events-none absolute inset-x-0 top-[90px] h-full md:top-[200px]"
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
