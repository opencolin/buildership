// Cruise-theme decorative parts: a holographic faceted crystal (abstract — not
// the ETH diamond), wavy water, the capsule that frames them, and a pixel mark.

export function Crystal({ className }: { className?: string }) {
  return (
    <svg
      className={`cz-crystal ${className ?? ""}`}
      width="300"
      height="420"
      viewBox="0 0 200 320"
      fill="none"
      aria-hidden
      style={{ maxWidth: "44%" }}
    >
      <defs>
        <linearGradient id="cz-fTL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d7fbe6" />
          <stop offset="1" stopColor="#7df7a3" />
        </linearGradient>
        <linearGradient id="cz-fTR" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdd9ff" />
          <stop offset="1" stopColor="#3d6bff" />
        </linearGradient>
        <linearGradient id="cz-fBLu" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#7df7a3" />
          <stop offset="1" stopColor="#11305a" />
        </linearGradient>
        <linearGradient id="cz-fBRu" x1="1" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#3d6bff" />
          <stop offset="1" stopColor="#0a1733" />
        </linearGradient>
        <linearGradient id="cz-fBL" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#2fe0c0" />
          <stop offset="1" stopColor="#081626" />
        </linearGradient>
        <linearGradient id="cz-fBR" x1="1" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#b79bff" />
          <stop offset="1" stopColor="#0a1020" />
        </linearGradient>
        <linearGradient id="cz-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e1b3a" />
          <stop offset="1" stopColor="#060c1c" />
        </linearGradient>
      </defs>
      <polygon points="100,20 122,112 100,300 78,112" fill="url(#cz-core)" opacity="0.9" />
      <polygon points="100,20 40,112 100,112" fill="url(#cz-fTL)" />
      <polygon points="100,20 160,112 100,112" fill="url(#cz-fTR)" />
      <polygon points="40,112 100,112 100,206 40,206" fill="url(#cz-fBLu)" />
      <polygon points="160,112 100,112 100,206 160,206" fill="url(#cz-fBRu)" />
      <polygon points="40,206 100,206 100,300" fill="url(#cz-fBL)" />
      <polygon points="160,206 100,206 100,300" fill="url(#cz-fBR)" />
      <polygon points="100,20 78,112 100,112" fill="#ffffff" opacity="0.45" />
      <polygon points="100,206 100,300 84,232" fill="#ffffff" opacity="0.08" />
    </svg>
  );
}

export function Water() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0"
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      style={{ height: "32%" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="cz-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e2a5e" />
          <stop offset="1" stopColor="#040813" />
        </linearGradient>
      </defs>
      <path d="M0,60 C200,20 360,90 600,60 C840,30 1000,92 1200,56 L1200,200 L0,200 Z" fill="url(#cz-water)" />
      <path d="M0,96 C220,64 380,120 600,96 C820,72 1000,124 1200,92 L1200,200 L0,200 Z" fill="#071026" opacity="0.85" />
      <path
        d="M0,60 C200,20 360,90 600,60 C840,30 1000,92 1200,56"
        fill="none"
        stroke="#7df7a3"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CruiseCapsule({ className }: { className?: string }) {
  return (
    <div className={`cz-capsule grid place-items-center ${className ?? ""}`}>
      <Crystal />
      <Water />
    </div>
  );
}

export function PixelMark({ className }: { className?: string }) {
  // a small green pixel/checker glyph (poster motif)
  const cells = [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1];
  return (
    <div className={`cz-pix ${className ?? ""}`} aria-hidden>
      {cells.map((v, i) => (
        <i key={i} className={v ? "" : "off"} />
      ))}
    </div>
  );
}
