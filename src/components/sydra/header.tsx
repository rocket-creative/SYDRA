"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const nav = [
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const SIGN_IN = "https://sydra.health/";

type SydraHeaderProps = {
  variant?: "default" | "funnel";
  /** Transparent over hero until scroll (homepage only) */
  overHero?: boolean;
};

export function SydraHeader({ variant = "default", overHero = false }: SydraHeaderProps) {
  const isFunnel = variant === "funnel";
  const [scrolled, setScrolled] = useState(!overHero);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const onHero = overHero && !scrolled;

  const shellClass = onHero
    ? "border-b border-white/15 bg-transparent"
    : "border-b border-rule bg-white";

  const linkClass = onHero
    ? "text-white/90 hover:text-white"
    : "text-[var(--color-body)] hover:text-[var(--color-hero)]";

  const mobileNavBorder = onHero ? "border-white/15" : "border-rule";

  return (
    <header
      className={`animate-nav-in sticky top-0 z-[100] pt-[max(0.5rem,env(safe-area-inset-top))] transition-[background-color,border-color] duration-300 ${shellClass}`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 py-4 md:px-10">
        <Link
          aria-label="Sydra home"
          className="flex shrink-0 items-center gap-3 transition-opacity duration-300 hover:opacity-90"
          href="/"
        >
          <Image
            alt=""
            className={`h-8 w-auto sm:h-9 ${onHero ? "brightness-0 invert" : ""}`}
            height={36}
            priority
            sizes="(max-width: 1024px) 180px, 220px"
            src="/sydra-logo-nav.svg"
            width={220}
          />
          <span
            aria-hidden
            className={`hidden type-caption tracking-[0.16em] sm:block ${onHero ? "text-white/60" : "text-body/50"}`}
          >
            NSA&nbsp;·&nbsp;IDR&nbsp;·&nbsp;SIMPLIFIED
          </span>
        </Link>

        {!isFunnel ? (
          <nav aria-label="Primary" className="hidden flex-1 items-center justify-end gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                className={`nav-link type-caption transition-colors duration-300 ${linkClass}`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <div aria-hidden className="flex-1" />
        )}

        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <a
            className={`type-caption transition-colors duration-300 ${linkClass}`}
            href={SIGN_IN}
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign in
          </a>
          {!isFunnel ? (
            <Button
              href="/demo"
              showArrow
              variant={onHero ? "ghostOnDark" : "solid"}
            >
              Schedule a demo
            </Button>
          ) : null}
        </div>
      </div>

      {!isFunnel ? (
        <nav
          aria-label="Primary mobile"
          className={`flex flex-wrap gap-x-5 gap-y-2 border-t px-6 py-3 lg:hidden md:px-10 ${mobileNavBorder}`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              className={`nav-link type-caption transition-colors duration-300 ${linkClass}`}
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
