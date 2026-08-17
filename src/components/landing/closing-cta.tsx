"use client";

import { ConversionCtaPair } from "@/components/landing/conversion-cta-pair";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { Section } from "@/components/ui/section";

export function ClosingCta() {
  return (
    <Section ariaLabelledby="heading-closing" id="closing-cta" sidebarLabel="Next step" tone="white">
      <h2 className="type-h2 prose-measure text-brand" id="heading-closing">
        Ready to see Sydra on a real denied claim?
      </h2>
      <div className="mt-10">
        <ConversionCtaPair placement="homepage-closing" />
      </div>
      <CtaTrustSignals className="prose-measure mt-6" />
    </Section>
  );
}
