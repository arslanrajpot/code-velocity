import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared social-card layout: brand bar, large title, supporting line. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0B0E11",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#F8F9F7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="44" height="44" viewBox="0 0 32 32">
            <rect width="32" height="32" fill="#C5F277" />
            <path d="M8.5 9.5 15 16l-6.5 6.5" fill="none" stroke="#0B0E11" strokeWidth="3" />
            <path d="M17.5 22.5h7" stroke="#0B0E11" strokeWidth="3" />
          </svg>
          <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>Code Velocity</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 22, color: "#C5F277", letterSpacing: 3, textTransform: "uppercase" }}>
            {eyebrow}
          </span>
          <span style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3, marginTop: 22, maxWidth: 1000 }}>
            {title}
          </span>
          <span style={{ fontSize: 30, color: "#88929B", marginTop: 26, maxWidth: 960 }}>{subtitle}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
