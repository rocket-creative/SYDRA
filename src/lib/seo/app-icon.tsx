import { ImageResponse } from "next/og";

const HERO_NAVY = "#1A2B48";
const ACCENT_BLUE = "#017EFF";

/**
 * Brand mark used by the App Router icon and apple-icon routes. Renders the
 * Sydra "S" on the hero navy field so the favicon and home-screen icon match the
 * site palette. Code-generated to avoid committing binary assets.
 */
export function createAppIconResponse(size: number): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: HERO_NAVY,
          color: "#ffffff",
          fontSize: Math.round(size * 0.66),
          fontWeight: 600,
          letterSpacing: "-0.04em",
          borderBottom: `${Math.max(2, Math.round(size * 0.08))}px solid ${ACCENT_BLUE}`,
        }}
      >
        S
      </div>
    ),
    { width: size, height: size },
  );
}
