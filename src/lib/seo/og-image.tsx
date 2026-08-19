import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

function sydraLogoDataUrl(): string {
  const filePath = join(process.cwd(), "public", "sydra_icon.svg");
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
  demo: "Set up a 15-minute Sydra call on a real denied claim.",
  about: "About Sydra — built by Sydra and Dr. John Abrahams, MD.",
  security: "Sydra security — HIPAA controls, AWS Bedrock, BAA available.",
  idrFilingDeadline:
    "Federal IDR filing deadline: 30 business days, then 4 business days to initiate.",
  idrForBillingCompanies:
    "Sydra NSA IDR software for medical billing companies and RCM firms managing multiple client practices.",
  whatIsIdr:
    "What federal IDR means under the No Surprises Act, explained for surgical billing teams.",
  sydraVsAttorney:
    "Federal IDR options compared: a contingency firm, in house with Sydra, or Sydra files for you.",
  inHouseIdr:
    "Run federal IDR in house at scale without adding billing headcount.",
  faq: "Common questions about Sydra NSA IDR software, answered for surgical billing teams.",
  resources:
    "Federal IDR and No Surprises Act guides written for surgical billing teams.",
  resourcesUpdates:
    "Dated federal IDR and No Surprises Act updates for surgical billing teams.",
  idrRecoveryCalculator:
    "Estimate federal IDR recovery on out of network surgical claims.",
  contact: "Contact Sydra for sales, calls, and customer support.",
  roadmap: "The Sydra product roadmap for NSA IDR software capabilities.",
  glossary:
    "Federal IDR and No Surprises Act terms defined for surgical billing teams.",
} as const;
