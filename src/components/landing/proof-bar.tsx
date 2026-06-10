import { Section } from "@/components/ui/section";
import { StatFigure } from "@/components/landing/stat-figure";

export function ProofBar() {
  return (
    <Section ariaLabelledby="heading-proof" tone="white">
      <h2 className="sr-only" id="heading-proof">
        Recovery proof points
      </h2>
      <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
        <StatFigure
          caption="Source: Georgetown University CHIR, March 2026"
          countTo={88}
          label="of properly filed federal IDR disputes get paid."
          suffix="%"
          value="88%"
        />
        <StatFigure
          label="to prepare a complete IDR submission packet per claim."
          value="5 min"
        />
        <StatFigure
          label="you keep the recovery. Flat, not a percentage of every award."
          value="No 20% cut"
        />
      </div>
    </Section>
  );
}
