"use client";

import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { CASE_REVIEW_PATH } from "@/lib/case-review";

export type CtaPlacement =
  | "homepage-hero"
  | "homepage-closing"
  | "recover-hero"
  | "recover-closing";

const SUPPORTING_LINE =
  "Send us one denied out-of-network EOB. You'll get a written IDR eligibility check and a dollar estimate back within one business day. No call required.";

type ConversionCtaPairProps = {
  placement: CtaPlacement;
  showSupportingLine?: boolean;
  secondaryAs?: "button" | "link";
};

export function ConversionCtaPair({
  placement,
  showSupportingLine = true,
  secondaryAs = "button",
}: ConversionCtaPairProps) {
  const handlePrimary = () => {
    track("cta_primary_click", { placement });
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Button href={CASE_REVIEW_PATH} showArrow variant="solid" onClick={handlePrimary}>
          See what one denied claim is worth
        </Button>
        {secondaryAs === "button" ? (
          <Button href="/demo" variant="ghost">
            Book a 15-minute demo
          </Button>
        ) : (
          <CtaLink href="/demo">Or book a 15-minute demo</CtaLink>
        )}
      </div>
      {showSupportingLine ? (
        <p className="prose-measure mt-4 text-[15px] leading-relaxed text-body">{SUPPORTING_LINE}</p>
      ) : null}
    </div>
  );
}
