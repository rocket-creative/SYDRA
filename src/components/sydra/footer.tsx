import Image from "next/image";
import Link from "next/link";

import { CtaLink } from "@/components/ui/cta-link";
import { KronosRevenueBanner } from "@/components/sydra/kronos-revenue-banner";
import { CountUp } from "@/components/motion/count-up";
import { textStyles } from "@/lib/typography";
import {
  getSalesEmail,
  getSupportEmail,
  salesMailtoHref,
  getContactPhoneDisplay,
  getContactPhoneTel,
} from "@/lib/contact";
import { KRONOS_PARENT_TAGLINE, kronosRevenueUrl } from "@/lib/kronos-revenue";

const SIGN_IN = "https://sydra.health/";

const footerLink =
  "text-white/80 transition-colors hover:text-white";
const footerHeading = "type-caption text-white/50";

export function SydraFooter() {
  const phone = getContactPhoneDisplay();
  const phoneTel = getContactPhoneTel();

  return (
    <footer className="border-t border-rule bg-hero-gradient text-white">
      <div className="px-6 py-16 md:px-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="w-full max-w-2xl min-w-0">
            <p className="type-caption text-white/55">Recovery at scale</p>
            <p className="type-stat mt-4 text-white">
              <CountUp end={213} suffix="+" />
            </p>
            <div className="rule-measure my-6 border-t border-white/20" aria-hidden />
            <p className={`${textStyles.bodyMeasure} text-sm text-white/80`}>
              Ingested IDR determinations weighted toward surgical specialties. Built for teams
              that file, not teams that outsource everything.
            </p>
          </div>
        </div>
      </div>

      <KronosRevenueBanner variant="footer" />

      <div className="border-t border-white/15 px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <Image
              alt=""
              className="h-16 w-auto brightness-0 invert"
              height={80}
              sizes="(max-width: 640px) 90vw, 320px"
              src="/icon-sydra.svg"
              width={378}
            />
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75">
              AI software for federal IDR / NSA disputes. Built by surgeons for surgical
              billing teams.
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75">
              {KRONOS_PARENT_TAGLINE}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-white/75">
              <li>
                <a className={footerLink} href={salesMailtoHref()}>
                  {getSalesEmail()}
                </a>
                <span className="text-white/45"> · sales and demos</span>
              </li>
              <li>
                <a className={footerLink} href={`mailto:${getSupportEmail()}`}>
                  {getSupportEmail()}
                </a>
                <span className="text-white/45"> · existing customers</span>
              </li>
              {phone && phoneTel ? (
                <li>
                  <a className={footerLink} href={phoneTel}>
                    {phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className={footerHeading}>Product</h3>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <Link className={footerLink} href="/how-it-works">
                  How it works
                </Link>
              </li>
              <li>
                <Link className={footerLink} href="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className={footerLink} href="/security">
                  Security
                </Link>
              </li>
              <li>
                <a className={footerLink} href={SIGN_IN} rel="noopener noreferrer" target="_blank">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className={footerHeading}>Company</h3>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <Link className={footerLink} href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className={footerLink} href="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className={footerLink} href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <CtaLink className="!text-white/80 hover:!text-white" href="/demo">
                  Schedule a demo
                </CtaLink>
              </li>
              <li>
                <a
                  className={footerLink}
                  href={kronosRevenueUrl()}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Kronos Revenue
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1280px] flex-col gap-4 border-t border-white/15 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kronos Health. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link className={footerLink} href="/privacy">
              Privacy
            </Link>
            <Link className={footerLink} href="/terms">
              Terms
            </Link>
            <Link className={footerLink} href="/security">
              Security
            </Link>
            <Link className={footerLink} href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
