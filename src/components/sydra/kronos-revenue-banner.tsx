import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import {
  KRONOS_FULL_SERVICE_CTA,
  kronosCaseReviewUrl,
} from "@/lib/kronos-revenue";
import { textStyles } from "@/lib/typography";

type KronosRevenueBannerProps = {
  variant?: "default" | "subtle" | "footer";
};

export function KronosRevenueBanner({ variant = "default" }: KronosRevenueBannerProps) {
  const url = kronosCaseReviewUrl();

  if (variant === "footer") {
    return (
      <aside className="border-t border-white/15 px-6 py-8 md:px-10">
        <p className={`${textStyles.bodyMeasure} text-[15px] text-white/85`}>
          Don&apos;t want to operate the software yourself?{" "}
          <CtaLink
            className="!text-white hover:!text-white/75"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {KRONOS_FULL_SERVICE_CTA}
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
          <CtaLink href={url} rel="noopener noreferrer" target="_blank">
            {KRONOS_FULL_SERVICE_CTA}
          </CtaLink>
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-labelledby="heading-kronos-revenue"
      className="border-y border-rule bg-hero-gradient py-10 md:py-12"
    >
      <div className="prose-measure px-6 md:px-10">
        <h2 className="text-lg font-medium text-white" id="heading-kronos-revenue">
          Want every claim handled for you?
        </h2>
        <p className="mt-3 type-body text-white/85">
          Don&apos;t want to operate the software yourself? Kronos Full Service handles every claim
          end to end on our sister site.
        </p>
        <div className="mt-6">
          <Button href={url} rel="noopener noreferrer" showArrow target="_blank" variant="solidOnDark">
            {KRONOS_FULL_SERVICE_CTA}
          </Button>
        </div>
      </div>
    </aside>
  );
}
