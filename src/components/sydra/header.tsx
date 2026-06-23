"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const nav = [
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
  const mobileNavBorder = "border-rule";

  return (
    <header
      className={`animate-nav-in sticky top-0 z-[100] pt-[max(0.5rem,env(safe-area-inset-top))] transition-[background-color,border-color] duration-300 ${shellClass}`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-5 py-4 md:px-10">
        <Link
          aria-label="Sydra home"
          className="flex min-h-11 shrink-0 items-center gap-3 transition-opacity duration-300 hover:opacity-90"
          href="/"
        >
          <Image
            alt="Sydra - NSA IDR Software"
            className="h-8 w-auto sm:h-9"
            height={36}
            loading="eager"
            sizes="(max-width: 1024px) 180px, 220px"
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

        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <a
            className={`inline-flex min-h-[44px] select-none items-center type-caption transition-colors duration-300 ${linkClass}`}
            href={SIGN_IN}
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign in
          </a>
          {!isFunnel ? (
            <Button href="/demo" showArrow variant="solid">
              Schedule a demo
            </Button>
          ) : null}
        </div>
      </div>

      {!isFunnel ? (
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1280px] select-none flex-wrap gap-x-6 gap-y-1 border-t px-5 py-1.5 md:px-10 lg:py-3 ${mobileNavBorder}`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              className={`nav-link inline-flex min-h-[44px] items-center type-caption transition-colors duration-300 lg:min-h-0 ${linkClass}`}
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
