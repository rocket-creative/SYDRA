import { PricingTiers } from "@/components/sydra/pricing-tiers";

/** Full plans block for homepage — second section after hero. */
export function SydraPlansSection() {
  return (
    <section
      aria-labelledby="heading-plans"
      className="border-b border-slate-100 bg-white py-16 md:py-24"
      id="plans"
      style={{ scrollMarginTop: "5.5rem" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <PricingTiers variant="compact" headingLevel="h2" />
      </div>
    </section>
  );
}
