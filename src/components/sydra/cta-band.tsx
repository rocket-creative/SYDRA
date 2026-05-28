import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function SydraCtaBand() {
  return (
    <Section ariaLabelledby="heading-cta-band" tone="hero">
      <div className="prose-measure">
        <h2 className="type-h2 text-white" id="heading-cta-band">
          Ready to see Sydra on a real denied claim?
        </h2>
        <p className="prose-measure mt-6 type-body text-white/85">
          Schedule a 15 minute walkthrough. No commitment. We show you what Sydra generates from
          a recent case.
        </p>
        <div className="mt-10">
          <Button href="/demo" showArrow variant="solidOnDark">
            Schedule a demo
          </Button>
        </div>
      </div>
    </Section>
  );
}
