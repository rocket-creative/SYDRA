"use client";

import { RecoveryCalculator } from "@/components/sydra/recovery-calculator";
import { Section } from "@/components/ui/section";
import { trackCtaClick } from "@/lib/landing/analytics-client";
import type { CampaignTracking } from "@/lib/landing/tracking";

type RecoverySectionProps = {
  tracking: CampaignTracking;
};

export function RecoverySection({ tracking }: RecoverySectionProps) {
  return (
    <Section ariaLabelledby="heading-recovery" id="recovery" sidebarLabel="Your numbers" tone="white">
      <h2 className="type-h2 prose-measure text-brand" id="heading-recovery">
        See what properly filed IDR could recover
      </h2>
      <p className="prose-measure mt-6 text-[15px] leading-relaxed text-body">
        Drag the two sliders to match your practice. The estimate uses published CMS win rates and
        Georgetown CHIR award benchmarks, not a Sydra performance claim.
      </p>
      <div className="mt-12 border-t border-rule pt-10">
        <RecoveryCalculator
          ctaHref="#lead-form"
          ctaLabel="Book your five minute demo"
          onCtaClick={() => trackCtaClick("sydra", tracking)}
          variant="light"
        />
      </div>
    </Section>
  );
}
