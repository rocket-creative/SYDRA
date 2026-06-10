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
    ? `Stop writing off out of network claims in ${stateDisplay} | Sydra`
    : "Stop writing off out of network claims | Sydra";

  const description = stateDisplay
    ? `Surgeon built NSA IDR software for ${stateDisplay} surgical practices. Your billing team prepares federal IDR submissions in five minutes per claim. Book a free demo.`
    : "Surgeon built NSA IDR software your billing team runs in five minutes per claim. Prepare federal IDR submissions, keep the recovery, and book a free demo.";

  return buildPageMetadata({
    title,
    description,
    path: "",
    ogImageAlt:
      "Sydra — surgeon built NSA IDR software for surgical practices. Five minutes per claim.",
  });
}
