"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";

import { MobileNavDrawer } from "@/components/sydra/mobile-nav-drawer";
import { Button } from "@/components/ui/button";
import { CASE_REVIEW_PATH, PRIMARY_CTA_SHORT_LABEL } from "@/lib/case-review";

/*
 * CONFLICT(homepage spec 3.1): the spec calls for four nav links, "How it works",
 * "Pricing", "Calculator" and "About", a persistent CTA labelled "Request a
 * 15-min demo" that shortens to "Demo" on phones and never hides behind the
 * hamburger, and a lockup tagline. This header is shared by every route, so
 * applying that would rename links, drop "Federal IDR guide", "Resources" and
 * "Contact" from sitewide internal linking, and change the primary CTA
 * destination away from /case-review on ~40 pages. Left unchanged pending a
 * human decision. Three specifics:
 *
 *   1. Link set and labels below vs. the spec's four.
 *   2. CTA label is PRIMARY_CTA_SHORT_LABEL to /case-review, not the demo ask.
 *   3. The CTA is hidden below sm, so at 390px no CTA is visible in the header.
 *      The spec requires it to stay visible and shorten to "Demo".
 *
 * The spec's own rule 7 says to flag a codebase conflict rather than resolve it.
 */
export const PRIMARY_NAV = [
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How Sydra works" },
  { href: "/idr", label: "Federal IDR guide" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const SIGN_IN = "https://sydra.health/";

type SydraHeaderProps = {
  /**
   * "compact" is the same header on a tighter desktop grid: from lg it trims row
   * padding and control heights so the two rows come in around 113px instead of
   * 161px. The homepage needs that height back to fit its above-the-fold block.
   * Phone and tablet sizing is untouched, so the 44px tap-target floor holds.
   */
  variant?: "default" | "funnel" | "compact";
  /** Drop the bottom hairline (landing page) */
  borderless?: boolean;
};

export function SydraHeader({ variant = "default", borderless = false }: SydraHeaderProps) {
  const isFunnel = variant === "funnel";
  const isCompact = variant === "compact";

  const shellClass = borderless ? "bg-white" : "border-b border-rule bg-white";
  const linkClass = "text-[var(--color-body)] hover:text-[var(--color-hero)]";
  const controlHeight = isCompact ? "min-h-12 lg:min-h-10" : "min-h-12";

  return (
    <header
      className={`animate-nav-in sticky top-0 z-[100] pt-[max(0.5rem,env(safe-area-inset-top))] transition-[background-color,border-color] duration-300 ${shellClass}`}
    >
      <div
        className={`mx-auto flex max-w-[1280px] items-center gap-2 px-4 py-3 sm:gap-3 md:gap-6 md:px-10 md:py-4 ${
          isCompact ? "lg:py-1.5" : ""
        }`}
      >
        <Link
          aria-label="Sydra home"
          className={`flex ${controlHeight} min-w-0 shrink-0 items-center gap-2 transition-opacity duration-300 hover:opacity-90 lg:shrink lg:gap-3`}
          href="/"
        >
          <Image
            alt="Sydra - NSA IDR Software"
            className="h-6 w-auto max-w-[7.5rem] sm:h-8 sm:max-w-none md:h-9"
            height={36}
            loading="eager"
            sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 220px"
            src="/sydra-logo-nav.svg"
            width={220}
          />
          <span
            aria-hidden
            className="hidden truncate type-caption tracking-[0.16em] text-body/50 lg:block"
          >
            NSA&nbsp;·&nbsp;IDR&nbsp;·&nbsp;SIMPLIFIED
          </span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:gap-6">
          <a
            className={`hidden ${controlHeight} select-none items-center type-caption transition-colors duration-300 lg:inline-flex ${linkClass}`}
            href={SIGN_IN}
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign in
          </a>
          {!isFunnel ? (
            <>
              {/*
               * Wrapper, not `hidden` on the Button itself: the Button base class
               * sets `inline-flex`, which resolves after `hidden` in the compiled
               * stylesheet and would keep the CTA visible on phones, where it
               * squeezes the logo to zero width. Phones get the CTA from the nav
               * drawer and the sticky bottom bar instead.
               */}
              <div className="hidden sm:block">
                <Button
                  className={isCompact ? "lg:min-h-10 lg:py-2" : ""}
                  href={CASE_REVIEW_PATH}
                  showArrow
                  variant="solid"
                  onClick={() => track("cta_primary_click", { placement: "header" })}
                >
                  {PRIMARY_CTA_SHORT_LABEL}
                </Button>
              </div>
              <MobileNavDrawer linkClass={linkClass} nav={PRIMARY_NAV} signInHref={SIGN_IN} />
            </>
          ) : null}
        </div>
      </div>

      {!isFunnel ? (
        <nav
          aria-label="Primary"
          className={`mx-auto hidden max-w-[1280px] select-none gap-x-6 border-t border-rule px-4 py-1.5 md:px-10 lg:flex ${
            isCompact ? "lg:py-0.5" : "lg:py-3"
          }`}
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              className={`nav-link inline-flex ${
                isCompact ? "min-h-12 lg:min-h-9" : "min-h-12"
              } items-center type-caption transition-colors duration-300 ${linkClass}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
