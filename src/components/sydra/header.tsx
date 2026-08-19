"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";

import { MobileNavDrawer } from "@/components/sydra/mobile-nav-drawer";
import { Button } from "@/components/ui/button";
import { CALL_CTA_SHORT_LABEL, CALL_PATH } from "@/lib/case-review";

/*
 * CONFLICT(homepage spec 3.1), partially resolved in favour of this header. The
 * spec calls for four nav links, "How it works", "Pricing", "Calculator" and
 * "About". This header is shared by every route, so applying that would rename
 * links and drop "Federal IDR guide", "Resources" and "Contact" from sitewide
 * internal linking. The nav therefore stays as it is.
 *
 * The CTA does follow the spec's intent: the 15-minute call is the primary ask
 * sitewide, so the header points at /demo. The claim review is reachable from
 * every page's in-body CTA pair and from the sticky bar on long pages.
 *
 * Still open: the CTA is hidden below sm, so at 390px no CTA is visible in the
 * header. Phones reach it through the nav drawer and the sticky bottom bar.
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
            src="/sydra_logo_nav.svg"
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
                  href={CALL_PATH}
                  showArrow
                  variant="solid"
                  onClick={() => track("cta_primary_click", { placement: "header" })}
                >
                  {CALL_CTA_SHORT_LABEL}
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
