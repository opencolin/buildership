import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";
export const alt = "BuilderShip — 30 builders, one yacht, the best agents hackathon on the bay. June 14, 2026.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a1628 0%, #142a4a 45%, #1f3d6b 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Lime accent glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(208,255,49,0.32) 0%, rgba(208,255,49,0) 70%)",
            display: "flex",
          }}
        />

        {/* Top row: pill + lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#d0ff31",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px",
              borderRadius: 9999,
              background: "rgba(208,255,49,0.14)",
              border: "1px solid rgba(208,255,49,0.45)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#d0ff31",
                display: "flex",
              }}
            />
            Boat day · June 14, 2026
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 56,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Hack the</span>
            <span style={{ color: "#d0ff31" }}>High Seas.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
              marginTop: 28,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 980,
              display: "flex",
            }}
          >
            30 builders. One yacht. $50K credits and a DGX Spark for the winner.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              ship.builders
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: -0.5,
                color: "white",
              }}
            >
              BuilderShip
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              fontSize: 22,
              fontWeight: 500,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            <span>Composio</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span>Nebius</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span>Tavily</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span>OpenClaw</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
