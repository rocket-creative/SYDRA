import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { EditorialImage } from "@/components/ui/editorial-image";
import { EDITORIAL, type EditorialAsset } from "@/lib/images";
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
  /** Overrides the claim review secondary on pages with their own second ask. */
  secondaryLabel?: string;
  secondaryHref?: string;
  /**
   * Square photo above the heading. Defaults to the same asset the homepage
   * closing block runs, so every page ends on the same composition.
   */
  image?: EditorialAsset;
};

export function SydraCtaBand({
  title = "Book a demo",
  lead = "We'd welcome a short call to see whether this is worth pursuing. Bring one denied out of network claim and you will see what federal IDR would do with it before the call ends.",
  ctaLabel = CALL_CTA_LABEL,
  ctaHref = CALL_PATH,
  hideSecondary = false,
  secondaryLabel = PRIMARY_CTA_LABEL,
  secondaryHref = CASE_REVIEW_PATH,
  image = EDITORIAL.clinicianAdvisorMeeting,
}: SydraCtaBandProps = {}) {
  return (
    <Section ariaLabelledby="heading-cta-band" tone="hero">
      <div className="prose-measure">
        {image ? (
          <EditorialImage
            aspect="1/1"
            asset={image}
            className="mb-8 sm:max-w-[320px] lg:max-w-[240px]"
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 320px, 100vw"
          />
        ) : null}
        <h2 className="type-h2 text-white" id="heading-cta-band">
          {title}
        </h2>
        <p className="prose-measure mt-6 type-body text-white/85">{lead}</p>
        <div className="cta-row mt-10">
          <Button href={ctaHref} showArrow variant="solidOnDark">
            {ctaLabel}
          </Button>
          {hideSecondary ? null : (
            <Button href={secondaryHref} variant="ghostOnDark">
              {secondaryLabel}
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
