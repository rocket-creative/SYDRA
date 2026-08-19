"use client";

import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import {
  CALL_CTA_LABEL,
  CALL_CTA_SHORT_LABEL,
  PRIMARY_CTA_LABEL,
  PRIMARY_CTA_SHORT_LABEL,
  callUrl,
  caseReviewUrl,
} from "@/lib/case-review";
import { FOUR_OBJECTION_LINE } from "@/lib/content/founder-lines";
import { getSalesEmail } from "@/lib/contact";

export type CtaPlacement =
  | "homepage-hero"
  | "homepage-closing"
  | "homepage-segments"
  | "homepage-two-paths"
  | "recover-hero"
  | "recover-closing"
  | "calculator-hero"
  | "pricing-body"
  | "options-compared"
  | "idr-guide";

const SUPPORTING_LINE =
  "Fifteen minutes on one of your own denied claims. If it qualifies you will see the dollar figure before the call ends, and there is nothing to sign.";

/**
 * Sits under the buttons rather than on the call: the reassurance belongs to the
 * claim review, which is the option for a visitor who will not book a call until
 * they have seen Sydra read a claim of theirs.
 */
const CLAIM_REVIEW_LINE =
  "Not ready to talk? Send one denied out-of-network EOB instead and you'll get a written IDR eligibility check and a dollar estimate back within one business day.";

type ConversionCtaPairProps = {
  placement: CtaPlacement;
  showSupportingLine?: boolean;
  secondaryAs?: "button" | "link";
  /** Mobile label for the primary CTA. Same destination and tracking event. */
  shortLabel?: string;
  /** Override the default supporting line under the buttons. */
  supportingLine?: string;
  /** Use on-dark button variants for hero bands. */
  onDark?: boolean;
};

export function ConversionCtaPair({
  placement,
  showSupportingLine = true,
  secondaryAs = "button",
  shortLabel = CALL_CTA_SHORT_LABEL,
  supportingLine = SUPPORTING_LINE,
  onDark = false,
}: ConversionCtaPairProps) {
  const handlePrimary = () => {
    track("cta_primary_click", { placement });
  };

  const mutedClass = onDark ? "text-white/85" : "text-body";

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Button
          href={callUrl(placement)}
          showArrow
          variant={onDark ? "solidOnDark" : "solid"}
          onClick={handlePrimary}
        >
          <span className="sm:hidden">{shortLabel}</span>
          <span className="hidden sm:inline">{CALL_CTA_LABEL}</span>
        </Button>
        {placement === "homepage-two-paths" ? (
          <CtaLink href="/pricing">See pricing</CtaLink>
        ) : secondaryAs === "button" ? (
          <Button
            href={caseReviewUrl(placement)}
            variant={onDark ? "ghostOnDark" : "ghost"}
            onClick={() => track("cta_secondary_click", { placement })}
          >
            <span className="sm:hidden">{PRIMARY_CTA_SHORT_LABEL}</span>
            <span className="hidden sm:inline">{PRIMARY_CTA_LABEL}</span>
          </Button>
        ) : (
          <CtaLink href={caseReviewUrl(placement)}>Or {PRIMARY_CTA_LABEL.toLowerCase()}</CtaLink>
        )}
      </div>
      {showSupportingLine ? (
        <p className={`prose-measure mt-4 text-base leading-relaxed ${mutedClass}`}>
          {supportingLine}
        </p>
      ) : null}
      <p className={`prose-measure mt-3 text-base leading-relaxed ${mutedClass}`}>
        {CLAIM_REVIEW_LINE} Questions first? Email{" "}
        <a className="underline underline-offset-2" href={`mailto:${getSalesEmail()}`}>
          {getSalesEmail()}
        </a>
        .
      </p>
      {placement === "homepage-hero" || placement === "homepage-closing" ? (
        <p className="prose-measure mt-4 text-base leading-relaxed text-body">{FOUR_OBJECTION_LINE}</p>
      ) : null}
    </div>
  );
}
