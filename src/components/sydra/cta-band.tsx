import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

type SydraCtaBandProps = {
  title?: string;
  lead?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function SydraCtaBand({
  title = "Ready to see Sydra on a real denied claim?",
  lead = "Request a free 15-minute demo. No commitment. We show you what Sydra generates from a real claim in your specialty.",
  ctaLabel = "Request a 15-minute demo",
  ctaHref = "/demo",
}: SydraCtaBandProps = {}) {
  return (
    <Section ariaLabelledby="heading-cta-band" tone="hero">
      <div className="prose-measure">
        <h2 className="type-h2 text-white" id="heading-cta-band">
          {title}
        </h2>
        <p className="prose-measure mt-6 type-body text-white/85">{lead}</p>
        <div className="mt-10">
          <Button href={ctaHref} showArrow variant="solidOnDark">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
}
