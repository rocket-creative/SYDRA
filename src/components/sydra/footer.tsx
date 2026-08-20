import Image from "next/image";
import Link from "next/link";

import {
  getSalesEmail,
  salesMailtoHref,
  SALES_PHONE_DISPLAY,
  SALES_PHONE_TEL,
} from "@/lib/contact";

const ADDRESS = "244 Westchester Ave, Ste 209, West Harrison, NY 10604";
const PHONE_DISPLAY = SALES_PHONE_DISPLAY;
const PHONE_TEL = SALES_PHONE_TEL;

const footerLink =
  "underline decoration-rule underline-offset-4 transition-colors hover:text-[var(--color-hero)]";

/**
 * Phones keep the 44px tap target the mobile harness enforces. Pointer widths
 * drop to 32px, which is still clear of the WCAG 2.5.8 24px floor and stops a
 * 12px link from reserving 48px of height: at 48px the two wrapped rows sat
 * four times their own type size apart and read as a gap rather than a list.
 */
const footerNavLink =
  "inline-flex min-h-12 items-center transition-colors hover:text-[var(--color-hero)] md:min-h-8";

export function SydraFooter() {
  const email = getSalesEmail();
  return (
    <footer className="border-t border-rule bg-white px-4 py-14 text-brand md:px-10">
      <div className="mx-auto max-w-[1280px]">
        {/* Decorative: the brand name is announced by the paragraph below it. */}
        <Image
          alt=""
          className="h-auto w-[150px]"
          height={36}
          sizes="150px"
          src="/sydra_logo_nav.svg"
          width={220}
        />
        <p className="type-caption mt-8 text-body">Sydra</p>
        <address className="mt-6 max-w-2xl not-italic text-[15px] leading-relaxed text-body">
          {ADDRESS}
          <br />
          <a className={footerLink} href={PHONE_TEL}>
            {PHONE_DISPLAY}
          </a>
          <br />
          <a className={footerLink} href={salesMailtoHref()}>
            {email}
          </a>
        </address>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-body/80">
          Not legal or financial advice. Federal IDR applies to qualifying out of network claims under
          the No Surprises Act. Recovery amounts vary by claim.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-0 text-xs text-body">
          <Link
            className={footerNavLink}
            href="/what-is-idr"
          >
            What is federal IDR?
          </Link>
          <Link
            className={footerNavLink}
            href="/sydra-vs-idr-attorney"
          >
            Compare the fees →
          </Link>
          <Link
            className={footerNavLink}
            href="/what-is-idr"
          >
            Read the full Federal IDR guide
          </Link>
          <Link
            className={footerNavLink}
            href="/idr"
          >
            Federal IDR
          </Link>
          <Link
            className={footerNavLink}
            href="/how-it-works"
          >
            How it works
          </Link>
          <Link
            className={footerNavLink}
            href="/faq"
          >
            FAQ
          </Link>
          <Link
            className={footerNavLink}
            href="/roadmap"
          >
            Roadmap
          </Link>
          <Link
            className={footerNavLink}
            href="/security"
          >
            Security
          </Link>
          <Link
            className={footerNavLink}
            href="/resources"
          >
            Resources
          </Link>
          <Link
            className={footerNavLink}
            href="/glossary"
          >
            Glossary
          </Link>
          <Link
            className={footerNavLink}
            href="/idr-recovery-calculator"
          >
            Recovery calculator
          </Link>
          <Link
            className={footerNavLink}
            href="/privacy"
          >
            Privacy
          </Link>
          <Link
            className={footerNavLink}
            href="/do-not-sell"
          >
            Do Not Sell or Share
          </Link>
          <Link
            className={footerNavLink}
            href="/terms"
          >
            Terms
          </Link>
        </div>
        <p className="mt-6 text-xs text-body">
          © {new Date().getFullYear()} Sydra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
