import { ImageResponse } from "next/og"

export const alt = "Stanley Kamau — Fullstack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0F172A",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(248,250,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* green glow accent */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#22C55E",
            }}
          />
          <span style={{ fontSize: 28, color: "#94A3B8", letterSpacing: 4 }}>
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          Stanley Kamau
        </div>
        <div style={{ fontSize: 44, color: "#22C55E", marginTop: 16, fontWeight: 500 }}>
          Fullstack Engineer
        </div>
        <div style={{ fontSize: 28, color: "#94A3B8", marginTop: 40 }}>
          React · Next.js · Spring Boot · AI
        </div>
      </div>
    ),
    { ...size }
  )
}
