import Image from "next/image";
import Link from "next/link";

import { contactMailtoHref } from "@/lib/contact";

const SIGN_IN = "https://idra-five.vercel.app/login";

export function SydraFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#FAFBFD] pb-16 pt-14 md:pb-14">
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
            AI drafted IDR submissions for surgical practices. A product of
            Kronos Health, built by Dr. John Abrahams.
          </p>
        </div>
        <div className="lg:col-span-3 lg:col-start-7">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Product
          </h3>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li>
              <a className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-80" href="#how-it-works">
                How it works
              </a>
            </li>
            <li>
              <a className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-80" href="#features">
                Features
              </a>
            </li>
            <li>
              <a className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-80" href="#proof">
                Why it works
              </a>
            </li>
            <li>
              <a
                className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-80"
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
              <a className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-80" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-80" href="#contact">
                Request demo
              </a>
            </li>
            <li>
              <a
                className="text-[#4A5568] transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-80"
                href={contactMailtoHref()}
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-4 border-t border-slate-200 px-4 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 xl:max-w-[1200px] xl:px-8">
        <p>© {new Date().getFullYear()} Kronos Health. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link className="transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="#privacy">
            Privacy
          </Link>
          <Link className="transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="#terms">
            Terms
          </Link>
          <Link className="transition-colors duration-300 ease-out hover:text-[#1A2B48]" href="#security">
            Security
          </Link>
        </div>
      </div>
    </footer>
  );
}
