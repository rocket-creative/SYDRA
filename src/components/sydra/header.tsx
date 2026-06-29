"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileNavDrawer } from "@/components/sydra/mobile-nav-drawer";
import { Button } from "@/components/ui/button";

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
  variant?: "default" | "funnel";
  /** Drop the bottom hairline (landing page) */
  borderless?: boolean;
};

export function SydraHeader({ variant = "default", borderless = false }: SydraHeaderProps) {
  const isFunnel = variant === "funnel";

  const shellClass = borderless ? "bg-white" : "border-b border-rule bg-white";
  const linkClass = "text-[var(--color-body)] hover:text-[var(--color-hero)]";

  return (
    <header
      className={`animate-nav-in sticky top-0 z-[100] pt-[max(0.5rem,env(safe-area-inset-top))] transition-[background-color,border-color] duration-300 ${shellClass}`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-2 px-5 py-3 sm:gap-3 md:gap-6 md:px-10 md:py-4">
        <Link
          aria-label="Sydra home"
          className="flex min-h-11 min-w-0 shrink items-center gap-2 transition-opacity duration-300 hover:opacity-90 sm:gap-3"
          href="/"
        >
          <Image
            alt="Sydra - NSA IDR Software"
            className="h-7 w-auto sm:h-9"
            height={36}
            loading="eager"
            sizes="(max-width: 1024px) 140px, 220px"
            src="/sydra-logo-nav.svg"
            width={220}
          />
          <span
            aria-hidden
            className="hidden type-caption tracking-[0.16em] text-body/50 sm:block"
          >
            NSA&nbsp;·&nbsp;IDR&nbsp;·&nbsp;SIMPLIFIED
          </span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:gap-6">
          <a
            className={`hidden min-h-[44px] select-none items-center type-caption transition-colors duration-300 lg:inline-flex ${linkClass}`}
            href={SIGN_IN}
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign in
          </a>
          {!isFunnel ? (
            <>
              <Button className="px-4 sm:px-6" href="/demo" showArrow variant="solid">
                <span className="hidden sm:inline">Schedule a demo</span>
                <span className="sm:hidden">Demo</span>
              </Button>
              <MobileNavDrawer linkClass={linkClass} nav={PRIMARY_NAV} signInHref={SIGN_IN} />
            </>
          ) : null}
        </div>
      </div>

      {!isFunnel ? (
        <nav
          aria-label="Primary"
          className="mx-auto hidden max-w-[1280px] select-none gap-x-6 border-t border-rule px-5 py-1.5 md:px-10 lg:flex lg:py-3"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              className={`nav-link inline-flex items-center type-caption transition-colors duration-300 ${linkClass}`}
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
