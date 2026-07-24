"use client";

import { useEffect, useState } from "react";

import { Arrow } from "@/components/ui/arrow";
import { trackCtaClick } from "@/lib/landing/analytics-client";
import type { CampaignTracking } from "@/lib/landing/tracking";

const PHONE_TEL = "tel:+19147056830";

type MobileCtaBarProps = {
  tracking: CampaignTracking;
  /** Element id to scroll to for the primary action. Defaults to lead-form. */
  scrollTargetId?: string;
};

/** Sticky bottom action bar shown on mobile only. Hides when the target form is in view. */
export function MobileCtaBar({ tracking, scrollTargetId = "lead-form" }: MobileCtaBarProps) {
  const [targetVisible, setTargetVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const target = document.getElementById(scrollTargetId);
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setTargetVisible(entry?.isIntersecting ?? false),
      { rootMargin: "-10% 0px -20% 0px", threshold: 0.1 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [scrollTargetId]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const initialHeight = window.visualViewport.height;
    const handleResize = () => {
      const currentHeight = window.visualViewport?.height ?? initialHeight;
      setKeyboardOpen(currentHeight < initialHeight * 0.75);
    };

    window.visualViewport.addEventListener("resize", handleResize);
    return () => window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  const handleDemo = () => {
    trackCtaClick("sydra", tracking);
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (targetVisible || keyboardOpen) return null;

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
          Book a free demo
          <Arrow className="shrink-0" />
        </button>
      </div>
    </div>
  );
}
