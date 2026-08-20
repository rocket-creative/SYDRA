"use client";

import { HomepageBand } from "@/components/landing/homepage-band";
import { RecoveryCalculator } from "@/components/sydra/recovery-calculator";

export function RecoverySection() {
  return (
    <HomepageBand ariaLabelledby="heading-recovery" id="recovery" tone="alt">
      <h2 className="type-h2 max-w-[720px] text-brand" id="heading-recovery">
        See what properly filed IDR could recover
      </h2>
      <p className="type-body mt-6 max-w-[720px] text-body">
        Drag the two sliders to match your practice. The estimate uses published CMS win rates and
        Georgetown CHIR award benchmarks, not a Sydra performance claim.
      </p>
      <div className="mt-8 border-t border-rule pt-8">
        <RecoveryCalculator variant="light" />
      </div>
    </HomepageBand>
  );
}
