import { RecoveryCalculator } from "@/components/sydra/recovery-calculator";

export function SydraEconomics() {
  return (
    <section
      aria-labelledby="heading-economics"
      className="border-b border-slate-100 bg-[#1A2B48] py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <h2
          className="text-center text-[1.55rem] font-semibold tracking-tight text-white sm:text-3xl md:text-[2rem]"
          id="heading-economics"
        >
          Two ways Sydra changes the financial picture.
        </h2>

        <div className="mx-auto mt-10 grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white">Time savings</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
              30 minutes per claim becomes under 5. At 20 claims per month: roughly 8 hours
              of biller time returned monthly. That time goes back to denial follow up, prior
              authorization, AR aging.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white">Recovery economics</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
              If your practice files IDR through an attorney at 20% contingency: Sydra lets
              your billing team run the workflow in house. Platform fee is structured below
              typical 20% contingency. Exact quote on your demo call after we understand your
              specialty and volume.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
              If your practice isn&apos;t filing IDR at all: Providers win 88% of properly filed
              IDR disputes. CMS Q1/Q2 2025 Public Use File. Median awards come in at
              approximately 4.5 times the insurer&apos;s qualifying payment amount.
              Georgetown CHIR, March 2026. Run your numbers below.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <RecoveryCalculator />
        </div>
      </div>
    </section>
  );
}
