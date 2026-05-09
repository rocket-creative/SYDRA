import Link from "next/link";

import { FadeUp } from "@/components/motion/reveal";
import { SydraHeroMock } from "@/components/sydra/hero-mock";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[15px] leading-relaxed text-slate-700 md:text-base">
      <span
        className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded bg-blue-600/15 text-[12px] font-bold text-blue-700"
        aria-hidden
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export function SydraHero() {
  return (
    <section
      aria-labelledby="heading-hero"
      className="border-b border-slate-100 bg-[#FAFBFD] pb-16 pt-[max(3rem,env(safe-area-inset-top))] md:pb-20 md:pt-16 lg:pt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,40,184)] sm:text-xs">
          For surgical practices fighting insurance underpayments
        </p>
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          <div className="lg:col-span-6">
            <h1
              className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#1A2B48] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
              id="heading-hero"
            >
              Win more IDR disputes.{` `}
              <span className="block">In minutes, not hours.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.7]">
              Sydra drafts your No Surprises Act IDR submissions using AI trained
              on hundreds of real determinations, built by a practicing
              neurosurgeon who grew tired of insurance companies underpaying his
              cases.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#1A2B48] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:opacity-[0.92] active:scale-[0.98] sm:min-w-[10rem]"
                href="#contact"
              >
                Request a demo
              </Link>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-[#1A2B48] transition duration-300 ease-out hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                href="#how-it-works"
              >
                See how it works
              </a>
            </div>
            <p className="mt-8 text-sm text-slate-500 md:text-[15px]">
              No setup fees. Integrates with your EMR and Clearinghouse. SOC 2
              controls in place.
            </p>
          </div>

          <div className="mt-14 lg:col-span-6 lg:mt-0">
            <SydraHeroMock />
          </div>
        </div>

        <FadeUp className="mt-14 lg:mt-16">
          <div className="rounded-xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-sm transition duration-500 ease-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] md:p-8">
            <h2
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgb(0,40,184)] sm:text-xs"
              id="heading-produces"
            >
              What Sydra produces
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-6">
              <CheckItem>
                Executive summary tailored to your CPT codes
              </CheckItem>
              <CheckItem>
                Market rate justification with comparable cases
              </CheckItem>
              <CheckItem>
                Citations from prior winning determinations
              </CheckItem>
              <CheckItem>
                Clinical necessity narrative drawn from your op notes
              </CheckItem>
              <CheckItem>
                Submission ready DOCX export with checklist
              </CheckItem>
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
