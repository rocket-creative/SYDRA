import { StaggerChild, StaggerParent } from "@/components/motion/reveal";

import {
  KRONOS_FULL_SERVICE_CTA,
  kronosCaseReviewUrl,
} from "@/lib/kronos-revenue";

const savings = [
  {
    value: "30 → 5 min",
    label: "Less biller time per claim",
    detail: "Manual IDR prep collapsed to under 5 minutes. Staff hours stay in your department.",
  },
  {
    value: "25+ min",
    label: "Saved per dispute",
    detail: "At 10 files a month, that's 4+ hours of labor cost recovered.",
  },
  {
    value: "No 20% cut",
    label: "Vs. attorney contingency",
    detail: "Run IDR in house with Sydra instead of giving a law firm a share of every recovery.",
  },
  {
    value: "You keep it",
    label: "Recovery stays with the practice",
    detail: "Software pricing on your demo call, structured below typical attorney contingency fees.",
  },
] as const;

/** Labor time savings first; attorney contingency comparison also on the table for Sydra. */
export function SydraCostSavings() {
  return (
    <section
      aria-labelledby="heading-cost-savings"
      className="border-b border-slate-100 bg-[#1A2B48] py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200 sm:text-xs">
            Cost savings
          </p>
          <h2
            className="mt-3 text-[1.55rem] font-semibold tracking-tight text-white sm:text-3xl md:text-[2rem]"
            id="heading-cost-savings"
          >
            Save biller hours. Keep more of every recovery.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-[17px]">
            Sydra wins on two economics: your team stops spending 30 minutes per
            claim on manual IDR prep, and you stop routing recoveries through a 20%
            attorney when your billing team can run the software themselves.
          </p>
        </div>

        <StaggerParent className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {savings.map((item) => (
            <StaggerChild key={item.label}>
              <article className="h-full rounded-xl border border-white/10 bg-white/5 p-6 text-center md:p-7">
                <p className="text-xl font-semibold text-white md:text-2xl">{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-blue-100">{item.label}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-300">{item.detail}</p>
              </article>
            </StaggerChild>
          ))}
        </StaggerParent>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-slate-400 md:text-sm">
          Time savings based on typical single CPT IDR prep with documents on file.
          Don&apos;t want to run software at all?{" "}
          <a
            className="font-medium text-slate-200 underline decoration-slate-500 underline-offset-2 hover:text-white"
            href={kronosCaseReviewUrl()}
            rel="noopener noreferrer"
            target="_blank"
          >
            {KRONOS_FULL_SERVICE_CTA}
          </a>{" "}
          for Kronos Full-Service. Zero ops, headcount eliminated, and priced so you keep more of each win than typical attorney contingency.
        </p>
      </div>
    </section>
  );
}
