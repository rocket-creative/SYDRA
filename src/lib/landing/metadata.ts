import type { Metadata } from "next";

import { resolveStateDisplay } from "@/lib/landing/states";
import { buildPageMetadata } from "@/lib/seo/metadata";

/**
 * Metadata for the postcard QR landing page.
 *
 * The same landing content is served at the site root (/) and at the campaign
 * routes /r and /r/[state]. The root is the primary, indexable URL, so every
 * route consolidates to a single canonical and OG URL at / to avoid duplicate
 * content across the six launch states, while the title and description stay
 * state-aware for social shares.
 */
export function buildPostcardMetadata(stateParam?: string): Metadata {
  const stateDisplay = resolveStateDisplay(stateParam);

  const title = stateDisplay
    ? `NSA IDR Software for Surgical Practices in ${stateDisplay} | Sydra`
    : "NSA IDR Software for Surgical Practices | Sydra";

  const description = stateDisplay
    ? `Federal IDR software for out-of-network surgical claims in ${stateDisplay}. Prepare No Surprises Act dispute submissions in five minutes per claim. Surgeon built. Book a free demo.`
    : "Federal IDR software for out-of-network surgical claims. Prepare No Surprises Act dispute submissions in five minutes per claim. Surgeon built. Book a free demo.";

  return buildPageMetadata({
    title,
    description,
    path: "",
    keywords: [
      "NSA IDR software",
      "No Surprises Act billing",
      "federal IDR claims",
      "out-of-network surgical billing",
      "independent dispute resolution software",
    ],
    ogImageAlt:
      "Sydra — surgeon built NSA IDR software for surgical practices. Five minutes per claim.",
  });
}
