import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { CASE_REVIEW_CTA, caseReviewUrl } from "@/lib/case-review";
import { textStyles } from "@/lib/typography";

type FullServiceBannerProps = {
  variant?: "default" | "subtle" | "footer";
};

/**
 * Names the done-for-you arrangement as a peer of running the software, not as a
 * fallback for people who cannot manage it. The old copy opened "Don't want to
 * operate the software yourself?", which presumed self serve was the default and
 * put the reader who wants the work handled in the position of opting out.
 */
const PEER_LINE = "Two ways to file: your team runs Sydra, or Sydra runs it for you.";

export function FullServiceBanner({ variant = "default" }: FullServiceBannerProps) {
  const url = caseReviewUrl();

  if (variant === "footer") {
    return (
      <aside className="border-t border-white/15 px-6 py-8 md:px-10">
        <p className={`${textStyles.bodyMeasure} text-[15px] text-white/85`}>
          {PEER_LINE}{" "}
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
          {PEER_LINE} <CtaLink href={url}>{CASE_REVIEW_CTA}</CtaLink>
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
          Or have every claim handled for you.
        </h2>
        <p className="mt-3 type-body text-white/85">
          {PEER_LINE} Sydra Full Service identifies what qualifies, assembles the submissions, files
          them, and manages every deadline. Priced per claim or by subscription, never a percentage
          of what you recover. Start with a free claim review.
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
