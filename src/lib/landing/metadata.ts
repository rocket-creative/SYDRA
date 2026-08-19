import type { Metadata } from "next";

import { resolveStateDisplay } from "@/lib/landing/states";
import { buildPageMetadata } from "@/lib/seo/metadata";

/**
 * Metadata for the postcard QR landing routes /r and /r/[state].
 *
 * These once served the same content as the site root, so they canonicalised to
 * / to avoid duplicate content across the six launch states. That is no longer
 * true: the homepage was rebuilt around four audience paths and the client
 * results tables, while these routes kept the postcard layout. Pointing a
 * canonical at / now tells Google this content lives at a URL where it does not.
 *
 * So these routes are noindexed and emit no canonical at all: buildPageMetadata
 * drops the canonical for any noindexed page, because there is nothing left to
 * consolidate once the page is out of the index. They are campaign destinations
 * for a printed QR code and for any ad campaign pointed at them, they are absent
 * from the sitemap, and they exist to convert rather than to rank. Titles and
 * descriptions stay state aware for social shares.
 */
export function buildPostcardMetadata(stateParam?: string): Metadata {
  const stateDisplay = resolveStateDisplay(stateParam);
  const path = stateParam ? `/r/${stateParam}` : "/r";

  const title = stateDisplay
    ? `NSA IDR Software for Surgical Practices in ${stateDisplay} | Sydra`
    : "NSA IDR Software for Surgical Practices | Sydra";

  const description = stateDisplay
    ? `Federal IDR software for out-of-network surgical claims in ${stateDisplay}. Prepare No Surprises Act dispute submissions in five minutes per claim. Surgeon built. Set up a 15-minute call.`
    : "Federal IDR software for out-of-network surgical claims. Prepare No Surprises Act dispute submissions in five minutes per claim. Surgeon built. Set up a 15-minute call.";

  // robots goes in, not on: buildPageMetadata drops the canonical for noindexed
  // pages, so overriding robots after the call would leave the canonical behind.
  return buildPageMetadata({
    title,
    description,
    path,
    ogImageAlt:
      "Sydra: surgeon built NSA IDR software for surgical practices. Five minutes per claim.",
    robots: { index: false, follow: true },
  });
}
