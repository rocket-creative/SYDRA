import { PricingTiers } from "@/components/sydra/pricing-tiers";

export function SydraPricingTeaser() {
  return (
    <section
      aria-labelledby="heading-pricing"
      className="border-b border-slate-100 bg-slate-50 py-16 md:py-24"
      id="pricing"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <PricingTiers variant="compact" />
      </div>
    </section>
  );
}
