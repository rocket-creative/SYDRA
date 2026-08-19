import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  CALL_CTA_LABEL,
  CALL_PATH,
  CASE_REVIEW_PATH,
  PRIMARY_CTA_LABEL,
} from "@/lib/case-review";
import { getSalesEmail } from "@/lib/contact";

type SydraCtaBandProps = {
  title?: string;
  lead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * Drop the claim review button. Only for bands that already sit next to a
   * claim review ask, so the page does not offer the same thing twice.
   */
  hideSecondary?: boolean;
};

export function SydraCtaBand({
  title = "Worth a 15-minute call?",
  lead = "We'd welcome a short call to see whether this is worth pursuing. Bring one denied out of network claim and you will see what federal IDR would do with it before the call ends.",
  ctaLabel = CALL_CTA_LABEL,
  ctaHref = CALL_PATH,
  hideSecondary = false,
}: SydraCtaBandProps = {}) {
  return (
    <Section ariaLabelledby="heading-cta-band" tone="hero">
      <div className="prose-measure">
        <h2 className="type-h2 text-white" id="heading-cta-band">
          {title}
        </h2>
        <p className="prose-measure mt-6 type-body text-white/85">{lead}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button href={ctaHref} showArrow variant="solidOnDark">
            {ctaLabel}
          </Button>
          {hideSecondary ? null : (
            <Button href={CASE_REVIEW_PATH} variant="ghostOnDark">
              {PRIMARY_CTA_LABEL}
            </Button>
          )}
        </div>
        <p className="prose-measure mt-6 type-body text-white/85">
          Or email{" "}
          <a className="underline underline-offset-2" href={`mailto:${getSalesEmail()}`}>
            {getSalesEmail()}
          </a>{" "}
          with a question.
        </p>
      </div>
    </Section>
  );
}
