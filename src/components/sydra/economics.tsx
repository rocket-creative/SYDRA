import { Section } from "@/components/ui/section";
import { RecoveryCalculator } from "@/components/sydra/recovery-calculator";

export function SydraEconomics() {
  return (
    <Section ariaLabelledby="heading-economics" id="economics" sidebarLabel="Economics" tone="hero">
      <h2 className="type-h2 prose-measure text-white" id="heading-economics">
        Two ways Sydra changes the financial picture.
      </h2>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="min-w-0 w-full">
          <div className="border-t border-white/20 pt-6" aria-hidden />
          <p className="type-stat mt-4 text-white">8h</p>
          <div className="rule-measure my-4 border-t border-white/20" aria-hidden />
          <p className="type-caption text-white/60">Time returned monthly</p>
          <p className="prose-measure mt-6 text-[15px] leading-relaxed text-white/85">
            30 minutes per claim becomes under 5. At 20 claims per month: roughly 8 hours of
            biller time returned monthly. That time goes back to denial follow up, prior
            authorization, AR aging.
          </p>
        </div>
        <div className="min-w-0 w-full">
          <div className="border-t border-white/20 pt-6" aria-hidden />
          <p className="type-stat mt-4 text-white">4.5×</p>
          <div className="rule-measure my-4 border-t border-white/20" aria-hidden />
          <p className="type-caption text-white/60">Median award vs QPA</p>
          <p className="prose-measure mt-6 text-[15px] leading-relaxed text-white/85">
            If your practice files IDR through an attorney at 20% contingency: Sydra lets your
            billing team run the workflow in house. Platform fee is structured below typical 20%
            contingency. Exact quote on your demo call after we understand your specialty and
            volume.
          </p>
          <p className="prose-measure mt-4 text-[15px] leading-relaxed text-white/85">
            Providers win 88% of properly filed IDR disputes. CMS Q1/Q2 2025 Public Use File.
            Georgetown CHIR, March 2026. Run your numbers below.
          </p>
        </div>
      </div>

      <div className="prose-measure mt-14 border-t border-white/20 pt-10">
        <RecoveryCalculator variant="onDark" />
      </div>
    </Section>
  );
}
