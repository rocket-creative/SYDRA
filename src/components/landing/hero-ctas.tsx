"use client";

import { Arrow } from "@/components/ui/arrow";
import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/lib/landing/analytics-client";
import type { CampaignTracking } from "@/lib/landing/tracking";

type HeroCtasProps = {
  tracking: CampaignTracking;
};

/**
 * Interactive CTA row for the hero. Isolated as a small client island so the
 * surrounding hero (including the LCP background image) can render as a server
 * component and paint without waiting on hydration.
 */
export function HeroCtas({ tracking }: HeroCtasProps) {
  const handleDemoClick = () => {
    trackCtaClick("sydra", tracking);
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKronosClick = () => {
    trackCtaClick("kronos", tracking);
    document
      .getElementById("kronos-path")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="hero-cta mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      <Button showArrow type="button" variant="solid" onClick={handleDemoClick}>
        Book a 5 minute demo
      </Button>
      <button
        className="cta-link hidden min-h-[44px] select-none items-center gap-2 text-left text-[13px] font-normal uppercase tracking-[0.08em] text-body transition-colors hover:text-[var(--color-hero)] sm:inline-flex"
        type="button"
        onClick={handleKronosClick}
      >
        <span>Prefer it handled for you? Talk to Kronos Revenue</span>
        <Arrow className="shrink-0" />
      </button>
    </div>
  );
}
