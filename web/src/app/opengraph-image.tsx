import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sydra";

export const size = {
  width: 1200,
  height: 630,
};

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          background: "#F0F4F8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            padding: "48px 64px",
            borderRadius: 24,
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            maxWidth: 920,
          }}
        >
          <span
            style={{
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -2,
              color: "#1A2B48",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Sydra
          </span>
          <span
            style={{
              marginTop: 20,
              fontSize: 32,
              color: "#4A5568",
              fontWeight: 500,
              textAlign: "center",
              maxWidth: 780,
              lineHeight: 1.4,
            }}
          >
            AI drafted IDR submissions for surgical practices
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
