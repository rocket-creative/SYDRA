import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { CASE_REVIEW_CTA, caseReviewUrl } from "@/lib/case-review";
import { textStyles } from "@/lib/typography";

type FullServiceBannerProps = {
  variant?: "default" | "subtle" | "footer";
};

export function FullServiceBanner({ variant = "default" }: FullServiceBannerProps) {
  const url = caseReviewUrl();

  if (variant === "footer") {
    return (
      <aside className="border-t border-white/15 px-6 py-8 md:px-10">
        <p className={`${textStyles.bodyMeasure} text-[15px] text-white/85`}>
          Don&apos;t want to operate the software yourself?{" "}
          <CtaLink className="!text-white hover:!text-white/75" href={url}>
            {CASE_REVIEW_CTA}
          </CtaLink>
        </p>
      </aside>
    );
  }

  if (variant === "subtle") {
    return (
      <aside className="border-t border-rule bg-neutral-section px-6 py-8 md:px-10">
        <p className={`${textStyles.bodyMeasure}`}>
          Don&apos;t want to operate the software yourself?{" "}
          <CtaLink href={url}>{CASE_REVIEW_CTA}</CtaLink>
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-labelledby="heading-full-service"
      className="border-y border-rule bg-hero-gradient py-10 md:py-12"
    >
      <div className="prose-measure px-6 md:px-10">
        <h2 className="text-lg font-medium text-white" id="heading-full-service">
          Want every claim handled for you?
        </h2>
        <p className="mt-3 type-body text-white/85">
          Don&apos;t want to operate the software yourself? Sydra Full Service handles every claim
          end to end. Start with a free claim review.
        </p>
        <div className="mt-6">
          <Button href={url} showArrow variant="solidOnDark">
            {CASE_REVIEW_CTA}
          </Button>
        </div>
      </div>
    </aside>
  );
}
