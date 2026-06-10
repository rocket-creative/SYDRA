"use client";

import { Button } from "@/components/ui/button";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { Section } from "@/components/ui/section";
import { trackCtaClick } from "@/lib/landing/analytics-client";
import type { CampaignTracking } from "@/lib/landing/tracking";

type ClosingCtaProps = {
  tracking: CampaignTracking;
};

export function ClosingCta({ tracking }: ClosingCtaProps) {
  const handleClick = () => {
    trackCtaClick("sydra", tracking);
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Section ariaLabelledby="heading-closing" id="closing-cta" sidebarLabel="Next step" tone="white">
      <h2 className="type-h2 prose-measure text-brand" id="heading-closing">
        Ready to stop writing off out of network claims?
      </h2>
      <p className="prose-measure mt-6 type-body text-body">
        Book a five minute demo and we will walk a real claim from your specialty on the call.
      </p>
      <div className="mt-10">
        <Button onClick={handleClick} showArrow>
          Book a five minute demo
        </Button>
      </div>
      <CtaTrustSignals className="prose-measure mt-6" />
    </Section>
  );
}
