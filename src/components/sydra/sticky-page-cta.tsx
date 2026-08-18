"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

const DISMISS_KEY = "sydra_sticky_cta_dismissed";

type StickyPageCtaProps = {
  href: string;
  label: string;
  /** Breakpoint at which the bar stops rendering. Desktop reads the in-page CTAs. */
  hideAt?: "md" | "lg";
  /** Analytics placement for the click event. */
  placement?: string;
};

/**
 * Persistent mobile ask for long pages whose in-page CTA sits several screens
 * down. Appears once the page heading scrolls away, respects the safe area, and
 * stays dismissed for the session.
 */
export function StickyPageCta({
  href,
  label,
  hideAt = "lg",
  placement = "sticky-page-cta",
}: StickyPageCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const hero =
      document.querySelector("[data-entity-hero]") ||
      document.querySelector("main h1") ||
      document.querySelector("h1");

    if (!hero) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-40px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  const hideClass = hideAt === "md" ? "md:hidden" : "lg:hidden";

  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 pb-safe-bottom ${hideClass}`} data-sticky-cta>
      <div className="flex h-14 items-center rounded-t-[4px] bg-[var(--color-hero)] text-white">
        <a
          className="flex h-full flex-1 items-center justify-center px-4 text-center text-[13px] font-normal uppercase tracking-[0.08em] text-white"
          href={href}
          onClick={() => track("cta_primary_click", { placement })}
        >
          {label}
        </a>
        <button
          aria-label="Dismiss"
          className="flex h-full w-11 shrink-0 items-center justify-center text-white/80 hover:text-white"
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISS_KEY, "1");
            } catch {
              // Session storage is unavailable in private modes; dismiss anyway.
            }
            setVisible(false);
          }}
        >
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        </button>
      </div>
    </div>
  );
}
