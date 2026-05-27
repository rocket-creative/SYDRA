import Link from "next/link";

import { getContactPhoneDisplay, getContactPhoneTel } from "@/lib/contact";

/** Sticky primary CTA on small screens (mobile-first CRO). Hidden on lg+. */
export function MobileCtaBar() {
  const phone = getContactPhoneDisplay();
  const phoneTel = getContactPhoneTel();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
        {phone && phoneTel ? (
          <a
            className="flex min-h-12 flex-1 items-center justify-center rounded-md border border-slate-200 bg-white text-center text-sm font-semibold text-[#1A2B48] transition duration-200 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            href={phoneTel}
          >
            Call
          </a>
        ) : null}
        <Link
          className="flex min-h-12 flex-[2] items-center justify-center rounded-md bg-[#1A2B48] text-center text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-200 [font-size:16px] active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          href="/demo"
        >
          Schedule a demo
        </Link>
      </div>
    </div>
  );
}
