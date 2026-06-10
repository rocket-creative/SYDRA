import Image from "next/image";
import Link from "next/link";

const ADDRESS = "244 Westchester Ave, Ste 209, West Harrison, NY 10604";
const PHONE_DISPLAY = "(914) 705 6830";
const PHONE_TEL = "tel:+19147056830";
const EMAIL = "heisha@nybrainspine.com";

const footerLink =
  "underline decoration-rule underline-offset-4 transition-colors hover:text-[var(--color-hero)]";

export function SydraFooter() {
  return (
    <footer className="border-t border-rule bg-white px-5 py-14 text-brand md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <Image
          alt="Sydra"
          className="h-auto w-[150px]"
          height={36}
          sizes="150px"
          src="/sydra-logo-nav.svg"
          width={220}
        />
        <p className="type-caption mt-8 text-body">Kronos Health · Sydra</p>
        <address className="mt-6 max-w-2xl not-italic text-[15px] leading-relaxed text-body">
          {ADDRESS}
          <br />
          <a className={footerLink} href={PHONE_TEL}>
            {PHONE_DISPLAY}
          </a>
          <br />
          <a className={footerLink} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </address>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-body/80">
          Not legal or financial advice. Federal IDR applies to qualifying out of network claims under
          the No Surprises Act. Recovery amounts vary by claim.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-xs text-body">
          <Link
            className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--color-hero)]"
            href="/resources"
          >
            Resources
          </Link>
          <Link
            className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--color-hero)]"
            href="/privacy"
          >
            Privacy
          </Link>
          <Link
            className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--color-hero)]"
            href="/terms"
          >
            Terms
          </Link>
        </div>
        <p className="mt-6 text-xs text-body">
          © {new Date().getFullYear()} Kronos Health. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
