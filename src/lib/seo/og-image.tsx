import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

function sydraLogoDataUrl(): string {
  const filePath = join(process.cwd(), "public", "icon-sydra.svg");
  const buf = readFileSync(filePath);
  return `data:image/svg+xml;base64,${buf.toString("base64")}`;
}

export function createOgImageResponse(tagline: string) {
  const logoSrc = sydraLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: OG_SIZE.width,
          height: OG_SIZE.height,
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
              fontSize: 28,
              color: "#4A5568",
              fontWeight: 500,
              textAlign: "center",
              maxWidth: 780,
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

export const OG_TAGLINES = {
  home: "Sydra — NSA IDR software for surgical billing teams. Under 5 minutes per claim.",
  pricing: "Sydra pricing — NSA IDR software plans for surgical billing teams.",
  howItWorks: "How Sydra prepares an NSA IDR submission step by step.",
  demo: "Schedule a Sydra demo — 15 minutes on a real denied claim.",
  about: "About Sydra — built by Kronos Health and Dr. John M. Abrahams, MD.",
  security: "Sydra security — HIPAA controls, AWS Bedrock, BAA available.",
} as const;
