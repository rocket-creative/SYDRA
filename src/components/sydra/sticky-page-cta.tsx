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
  /** Optional second slot, so the bar can offer the call and the claim review. */
  secondaryHref?: string;
  secondaryLabel?: string;
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
  secondaryHref,
  secondaryLabel,
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
    <div
      className={`fixed inset-x-0 bottom-0 z-40 pb-safe-bottom pl-[max(0px,env(safe-area-inset-left))] pr-[max(0px,env(safe-area-inset-right))] ${hideClass}`}
      data-sticky-cta
    >
      <div className="flex min-h-14 items-stretch rounded-t-[4px] bg-[var(--color-hero)] text-white">
        <a
          className="flex min-h-14 flex-1 items-center justify-center px-3 py-2 text-center text-[12px] font-normal uppercase leading-tight tracking-[0.08em] text-white sm:text-[13px]"
          href={href}
          onClick={() => track("cta_primary_click", { placement })}
        >
          {label}
        </a>
        {secondaryHref && secondaryLabel ? (
          <a
            className="flex min-h-14 flex-1 items-center justify-center border-l border-white/25 px-3 py-2 text-center text-[12px] font-normal uppercase leading-tight tracking-[0.08em] text-white/90 sm:text-[13px]"
            href={secondaryHref}
            onClick={() => track("cta_secondary_click", { placement })}
          >
            {secondaryLabel}
          </a>
        ) : null}
        <button
          aria-label="Dismiss"
          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-white/80 hover:text-white"
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
