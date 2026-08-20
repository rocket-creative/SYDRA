"use client";

import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { EditorialImage } from "@/components/ui/editorial-image";
import { CTA_BLOCK } from "@/lib/content/homepage";
import type { EditorialAsset } from "@/lib/images";
import { CALL_PATH } from "@/lib/case-review";
import { getSalesEmail, SALES_PHONE_DISPLAY, SALES_PHONE_TEL } from "@/lib/contact";

const DEMO_HREF = CALL_PATH;
const CALL_HREF = SALES_PHONE_TEL;

/**
 * CONFLICT(spec 8, button 2): the spec says this anchors to "the existing
 * recovery calculator", but the page structure in spec 2 has no calculator
 * section, so there is no in-page anchor to target. It points at the existing
 * calculator route instead, which carries the same form below the estimate.
 */
const CALCULATOR_HREF = "/idr-recovery-calculator";

/** Spec 8 button 3 is a mailto. Kept, since "Ask a question" is not a lead ask. */
const QUESTION_HREF = `mailto:${getSalesEmail()}`;

type CtaBlockProps = {
  /** h2 in the closing section, h3 inside a path section that already owns the h2. */
  headingLevel: "h2" | "h3";
  headingId: string;
  /** Analytics only. Not rendered. */
  placement: string;
  /** Divider above the block. Off when the block is the whole section. */
  bordered?: boolean;
  /** Inverted copy and buttons, for the navy closing section. */
  onDark?: boolean;
  /** Square photo above the heading. Only the closing section runs one. */
  image?: EditorialAsset;
};

export function CtaBlock({
  headingLevel,
  headingId,
  placement,
  bordered = true,
  onDark = false,
  image,
}: CtaBlockProps) {
  const Heading = headingLevel;
  const solidVariant = onDark ? "solidOnDark" : "solid";
  const ghostVariant = onDark ? "ghostOnDark" : "ghost";

  return (
    <div className={bordered ? "mt-8 border-t border-rule pt-6 md:mt-10 md:pt-8" : ""}>
      {/* Uncapped on mobile, where the block owns the full column. The cap only
          matters from lg, where a column width square would leave this side well
          over 200px taller than the form card beside it. */}
      {image ? (
        <EditorialImage
          aspect="1/1"
          asset={image}
          className="mb-6 sm:max-w-[320px] lg:max-w-[240px]"
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 320px, 100vw"
        />
      ) : null}
      <Heading className={`page-subsection-title ${onDark ? "on-dark" : ""}`} id={headingId}>
        {CTA_BLOCK.heading}
      </Heading>
      <p className={`home-body mt-2 max-w-[54ch] ${onDark ? "text-white/85" : "text-body"}`}>
        {CTA_BLOCK.body}
      </p>
      <div className="cta-row mt-5">
        <Button
          href={DEMO_HREF}
          showArrow
          variant={solidVariant}
          onClick={() => track("cta_click", { label: "cta_set_up_demo", placement })}
        >
          {CTA_BLOCK.demo}
        </Button>
        <Button
          href={CALL_HREF}
          variant={ghostVariant}
          onClick={() => track("cta_click", { label: "cta_set_up_call", placement })}
        >
          {`${CTA_BLOCK.call}: ${SALES_PHONE_DISPLAY}`}
        </Button>
        <Button
          href={CALCULATOR_HREF}
          variant={ghostVariant}
          onClick={() => track("cta_click", { label: "cta_claim_worth", placement })}
        >
          {CTA_BLOCK.calculator}
        </Button>
        <Button
          href={QUESTION_HREF}
          variant={ghostVariant}
          onClick={() => track("cta_click", { label: "cta_ask_question", placement })}
        >
          {CTA_BLOCK.question}
        </Button>
      </div>
    </div>
  );
}
