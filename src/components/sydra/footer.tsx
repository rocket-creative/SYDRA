import Image from "next/image";
import Link from "next/link";

import { KronosRevenueBanner } from "@/components/sydra/kronos-revenue-banner";
import {
  getSalesEmail,
  getSupportEmail,
  salesMailtoHref,
  getContactPhoneDisplay,
  getContactPhoneTel,
} from "@/lib/contact";
import { KRONOS_PARENT_TAGLINE, kronosRevenueUrl } from "@/lib/kronos-revenue";

const SIGN_IN = "https://sydra.health/";

export function SydraFooter() {
  const phone = getContactPhoneDisplay();
  const phoneTel = getContactPhoneTel();

  return (
    <footer className="border-t border-slate-200 bg-[#FAFBFD]">
      <KronosRevenueBanner variant="subtle" />
      <div className="pb-16 pt-14 md:pb-14">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 xl:max-w-[1200px] xl:px-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center">
              <Image
                alt=""
                className="h-[72px] w-auto max-w-full sm:h-20 sm:w-auto"
                height={80}
                sizes="(max-width: 640px) 90vw, 320px"
                src="/icon-sydra.svg"
                width={378}
              />
            </div>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#4A5568]">
              AI software for federal IDR / NSA disputes. Built by surgeons for
              surgical billing teams.
            </p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#4A5568]">
              {KRONOS_PARENT_TAGLINE}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-[#4A5568]">
              <li>
                <a
                  className="rounded-sm hover:text-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  href={salesMailtoHref()}
                >
                  {getSalesEmail()}
                </a>
                <span className="text-slate-400"> · sales and demos</span>
              </li>
              <li>
                <a
                  className="rounded-sm hover:text-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  href={`mailto:${getSupportEmail()}`}
                >
                  {getSupportEmail()}
                </a>
                <span className="text-slate-400"> · existing customers</span>
              </li>
              {phone && phoneTel ? (
                <li>
                  <a
                    className="rounded-sm hover:text-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    href={phoneTel}
                  >
                    {phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Product
            </h3>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <Link className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/how-it-works">
                  How it works
                </Link>
              </li>
              <li>
                <Link className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/security">
                  Security
                </Link>
              </li>
              <li>
                <a
                  className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]"
                  href={SIGN_IN}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sign in
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <Link className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/demo">
                  Schedule a demo
                </Link>
              </li>
              <li>
                <a
                  className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48]"
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
        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-4 border-t border-slate-200 px-4 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 xl:max-w-[1200px] xl:px-8">
          <p>© {new Date().getFullYear()} Kronos Health. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link className="transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/privacy">
              Privacy
            </Link>
            <Link className="transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/terms">
              Terms
            </Link>
            <Link className="transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/security">
              Security
            </Link>
            <Link className="transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
