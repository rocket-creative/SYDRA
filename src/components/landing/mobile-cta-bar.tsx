"use client";

import { Arrow } from "@/components/ui/arrow";
import { trackCtaClick } from "@/lib/landing/analytics-client";
import type { CampaignTracking } from "@/lib/landing/tracking";

const PHONE_TEL = "tel:+19147056830";

type MobileCtaBarProps = {
  tracking: CampaignTracking;
};

/** Sticky bottom action bar shown on mobile only. Call + scroll to the demo form. */
export function MobileCtaBar({ tracking }: MobileCtaBarProps) {
  const handleDemo = () => {
    trackCtaClick("sydra", tracking);
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pb-safe-bottom lg:hidden">
      <div className="flex border-t border-rule bg-white">
        <a
          aria-label="Call Kronos Health"
          className="flex min-h-[56px] flex-1 select-none items-center justify-center gap-2 border-r border-rule text-[13px] uppercase tracking-[0.08em] text-brand"
          href={PHONE_TEL}
        >
          <svg
            aria-hidden
            fill="none"
            height="16"
            stroke="currentColor"
            strokeWidth="1"
            viewBox="0 0 24 24"
            width="16"
          >
            <path
              d="M5 4h3l1.5 5-2 1.5a11 11 0 005 5l1.5-2 5 1.5v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
              strokeLinejoin="round"
            />
          </svg>
          Call
        </a>
        <button
          className="cta-link flex min-h-[56px] flex-1 select-none items-center justify-center gap-2 bg-[var(--color-hero)] text-[13px] uppercase tracking-[0.08em] text-white"
          onClick={handleDemo}
          type="button"
        >
          Book demo
          <Arrow className="shrink-0" />
        </button>
      </div>
    </div>
  );
}
