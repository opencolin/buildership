/**
 * Blue Angels-style diamond formation drawn as silhouettes with contrails.
 * Pure SVG server component — all motion comes from the CSS classes in
 * blueangels.css. `uid` keeps the gradient ids unique when the formation
 * appears more than once on a page.
 */
export function JetFormation({
  uid,
  className,
  trail = "current",
}: {
  uid: string;
  className?: string;
  trail?: "light" | "current";
}) {
  const trailColor = trail === "light" ? "#FFFFFF" : "currentColor";
  // Diamond: lead out front, left/right wingmen, slot trailing center.
  const jets: Array<[x: number, y: number, scale: number]> = [
    [500, 38, 1],
    [416, 62, 0.94],
    [416, 14, 0.94],
    [336, 38, 0.9],
  ];
  const jetSilhouette =
    "M30 0 C21 -1.5 15 -1.8 9 -2 L3 -10 L-5 -11 L-8 -2.6 L-17 -2.2 L-23 -8 " +
    "L-28 -8 L-25 -1.8 L-28 0 L-25 1.8 L-28 8 L-23 8 L-17 2.2 L-8 2.6 L-5 11 " +
    "L3 10 L9 2 C15 1.8 21 1.5 30 0 Z";
  return (
    <svg viewBox="0 0 600 80" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${uid}-trail`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={trailColor} stopOpacity="0" />
          <stop offset="0.75" stopColor={trailColor} stopOpacity="0.4" />
          <stop offset="1" stopColor={trailColor} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      {jets.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <rect x="-312" y="-4.6" width="284" height="2.2" rx="1.1" fill={`url(#${uid}-trail)`} />
          <rect x="-312" y="2.4" width="284" height="2.2" rx="1.1" fill={`url(#${uid}-trail)`} />
          <path d={jetSilhouette} fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
