"use client";

import { useEffect, useState } from "react";

import { Arrow } from "@/components/ui/arrow";

const PHONE_TEL = "tel:+19147056830";

type StickyConversionBarProps = {
  /** Element id to scroll to for the primary action. */
  scrollTargetId: string;
  primaryLabel?: string;
};

/** Sticky bottom CTA for high intent pages (demo, contact). Hides when target is in view. */
export function StickyConversionBar({
  scrollTargetId,
  primaryLabel = "Book demo",
}: StickyConversionBarProps) {
  const [targetVisible, setTargetVisible] = useState(false);

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

  const handlePrimary = () => {
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (targetVisible) return null;

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
          onClick={handlePrimary}
          type="button"
        >
          {primaryLabel}
          <Arrow className="shrink-0" />
        </button>
      </div>
    </div>
  );
}
