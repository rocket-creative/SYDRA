import Link from "next/link";

import { KronosRevenueBanner } from "@/components/sydra/kronos-revenue-banner";
import { kronosRevenueUrl } from "@/lib/kronos-revenue";

export function SydraAbout() {
  return (
    <>
      <section aria-labelledby="heading-about" className="border-b border-slate-100 bg-white py-16 md:py-24" id="about">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[720px] xl:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 sm:text-xs">
            About Sydra
          </p>
          <h2
            className="mt-3 text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]"
            id="heading-about"
          >
            Built by Kronos Health
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
            Sydra is the software arm of{" "}
            <strong className="font-semibold text-[#1A2B48]">Kronos Health</strong>
            , a working RCM operation that runs claims every day. It was built by{" "}
            <strong className="font-semibold text-[#1A2B48]">Dr. John Abrahams</strong>
            , a practicing neurosurgeon who saw billing teams spend 30 minutes per
            claim on IDR submissions that should take under 5.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
            The Kronos Revenue Cycle team trained the system on real determinations.
            Chelsea leads software and integrations. Hayes leads revenue cycle
            operations and the specialists who support Tier 2 customers.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
            Sydra is in production at NY Brain and Spine Surgery and rolling out to
            additional surgical practices in New York, Texas, California, New Jersey,
            Florida, and Arizona in 2026.
          </p>
          <p className="mt-8 text-base leading-relaxed text-[#4A5568]">
            Need it fully handled?{" "}
            <a
              className="font-semibold text-[#1A2B48] underline decoration-slate-300 underline-offset-4 hover:decoration-[#1A2B48]"
              href={kronosRevenueUrl()}
              rel="noopener noreferrer"
              target="_blank"
            >
              See Kronos Revenue →
            </a>
          </p>
          <p className="mt-6">
            <Link
              className="text-sm font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
              href="/about"
            >
              Read the full team story →
            </Link>
          </p>
        </div>
      </section>
      <KronosRevenueBanner />
    </>
  );
}
