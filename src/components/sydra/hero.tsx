import Link from "next/link";

import { FadeUp } from "@/components/motion/reveal";
import { SydraHeroMock } from "@/components/sydra/hero-mock";

export function SydraHero() {
  return (
    <section
      aria-labelledby="heading-hero"
      className="border-b border-slate-100 bg-[#FAFBFD] pb-16 pt-[max(3rem,env(safe-area-inset-top))] md:pb-20 md:pt-16 lg:pt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,40,184)] sm:text-xs">
          AI software for federal IDR / NSA disputes
        </p>
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          <div className="lg:col-span-6">
            <h1
              className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#1A2B48] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
              id="heading-hero"
            >
              NSA claims, filed in under 5 minutes each.
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-[#1A2B48] md:text-[17px]">
              Cut IDR prep from 30 minutes to under 5 per claim — and keep more of
              every recovery instead of routing files through a 20% attorney.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.7]">
              Sydra is the specialty trained AI software for federal IDR / NSA
              disputes. Built by surgeons. Used by orthopedic, neurosurgery,
              spine, and plastic surgery billing teams. Your team operates the
              workflow.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#1A2B48] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:opacity-[0.92] active:scale-[0.98] sm:min-w-[10rem]"
                href="/demo"
              >
                Schedule a demo
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-[#1A2B48] transition duration-300 ease-out hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                href="/how-it-works"
              >
                See the full walkthrough
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500 md:text-[15px]">
              No setup fees. Integrates with your EMR and clearinghouse. HIPAA / SOC 2 controls in place.
            </p>
          </div>

          <div className="mt-14 lg:col-span-6 lg:mt-0">
            <SydraHeroMock />
            <p className="mt-3 text-center text-xs text-slate-500 lg:text-left">
              Real flow. Real time.
            </p>
          </div>
        </div>

        <FadeUp className="mt-14 lg:mt-16">
          <div className="rounded-xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-sm md:p-8">
            <h2
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgb(0,40,184)] sm:text-xs"
              id="heading-how-teaser"
            >
              How it works
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-3 lg:gap-6">
              <li className="text-[15px] leading-relaxed text-slate-700 md:text-base">
                <span className="font-semibold text-[#1A2B48]">1. Upload your EOB.</span>{" "}
                Drag and drop, or copy from your EMR.
              </li>
              <li className="text-[15px] leading-relaxed text-slate-700 md:text-base">
                <span className="font-semibold text-[#1A2B48]">2. Sydra drafts the IDR.</span>{" "}
                Eligible CPTs flagged, one claim per code.
              </li>
              <li className="text-[15px] leading-relaxed text-slate-700 md:text-base">
                <span className="font-semibold text-[#1A2B48]">3. Your team submits.</span>{" "}
                Review, approve, and track in the dashboard.
              </li>
            </ol>
            <p className="mt-6">
              <Link
                className="text-sm font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
                href="/how-it-works"
              >
                See the full walkthrough →
              </Link>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
