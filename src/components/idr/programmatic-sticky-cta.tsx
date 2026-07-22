"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "sydra_programmatic_sticky_dismissed";

type ProgrammaticStickyCtaProps = {
  href: string;
};

/**
 * Mobile sticky ask for programmatic IDR pages. Shows after the hero leaves
 * view, respects safe area, dismissible for the session.
 */
export function ProgrammaticStickyCta({ href }: ProgrammaticStickyCtaProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }

    const hero =
      document.querySelector("[data-entity-hero]") ||
      document.querySelector("main h1") ||
      document.querySelector("h1");

    if (!hero) {
      setVisible(true);
      return;
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

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className="flex h-14 items-center bg-[var(--color-hero)] text-white"
        style={{
          borderRadius: "4px 4px 0 0",
        }}
      >
        <a
          className="flex h-full flex-1 items-center justify-center px-4 text-[13px] font-normal uppercase tracking-[0.08em] text-white"
          href={href}
        >
          Send us this denial
        </a>
        <button
          aria-label="Dismiss"
          className="flex h-full w-11 shrink-0 items-center justify-center text-white/80 hover:text-white"
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISS_KEY, "1");
            } catch {
              // ignore
            }
            setDismissed(true);
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
