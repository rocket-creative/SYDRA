import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Sydra";

export const size = {
  width: 1200,
  height: 630,
};

function sydraLogoDataUrl(): string {
  const filePath = join(process.cwd(), "public", "icon-sydra.svg");
  const buf = readFileSync(filePath);
  return `data:image/svg+xml;base64,${buf.toString("base64")}`;
}

export default function OgImage() {
  const logoSrc = sydraLogoDataUrl();

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
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og ImageResponse requires img */}
          <img
            alt=""
            height={101}
            src={logoSrc}
            style={{ objectFit: "contain" }}
            width={480}
          />
          <span
            style={{
              marginTop: 28,
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
