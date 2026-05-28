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
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          <div className="lg:col-span-6">
            <h1
              className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#1A2B48] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
              id="heading-hero"
            >
              Your billing team is spending 30 minutes per NSA IDR claim.
              <span className="mt-2 block">
                That is not a workflow problem. That is a software problem.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.7]">
              Sydra prepares a complete federal IDR submission packet in under 5 minutes
              per claim. Clinical narrative drafted from your operative note. Market rate
              comparisons from 213+ ingested prior determinations. One claim per CPT, never
              batched.
            </p>
            <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-[#1A2B48] md:text-[17px]">
              Your team reviews. Your team submits. You keep the recovery.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#1A2B48] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:opacity-[0.92] active:scale-[0.98] sm:min-w-[10rem]"
                href="/demo"
              >
                See Sydra on a real denied claim
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-[#1A2B48] transition duration-300 ease-out hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                href="/how-it-works"
              >
                How it works
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              15 minutes. Your specialty. No commitment.
            </p>
          </div>

          <div className="mt-14 lg:col-span-6 lg:mt-0">
            <SydraHeroMock />
          </div>
        </div>

        <FadeUp className="mt-14 lg:mt-16">
          <ul className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 md:p-8">
            {[
              "HIPAA controls in place · BAA on request",
              "AWS Bedrock · Claude Sonnet 4 · PHI stays inside AWS HIPAA eligible boundary",
              "ModMed integration today · Stedi clearinghouse",
              "Built by Kronos Health · Dr. John M. Abrahams, MD, neurosurgeon founder",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-[#4A5568] sm:text-[15px]"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
