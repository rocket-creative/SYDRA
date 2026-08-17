"use client";

import { ConversionCtaPair } from "@/components/landing/conversion-cta-pair";

/**
 * Interactive CTA row for the hero. Isolated as a small client island so the
 * surrounding hero (including the LCP background image) can render as a server
 * component and paint without waiting on hydration.
 */
export function HeroCtas() {
  return (
    <div className="mt-6 sm:mt-8">
      <ConversionCtaPair placement="homepage-hero" />
    </div>
  );
}
