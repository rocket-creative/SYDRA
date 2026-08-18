"use client";

import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { CTA_BLOCK } from "@/lib/content/homepage";
import { getSalesEmail } from "@/lib/contact";

/**
 * Spec 9 asks for a scheduler modal with a mailto fallback until Ops provisions
 * a provider. Superseded by a direct instruction to send every CTA to a page
 * that holds the real form, so this points at /demo, which mounts SharedLeadForm
 * and delivers to sales@, the ops BCC, and the Supabase row. A mailto drops the
 * lead if the visitor has no mail client configured; the form cannot.
 *
 * TODO(scheduler): when a booking provider exists, swap this for a modal trigger
 * and keep the approved label and the analytics call below unchanged.
 */
const DEMO_HREF = "/demo";

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
};

export function CtaBlock({ headingLevel, headingId, placement, bordered = true }: CtaBlockProps) {
  const Heading = headingLevel;

  return (
    <div className={bordered ? "mt-8 border-t border-rule pt-6 md:mt-10 md:pt-8" : ""}>
      <Heading className="page-subsection-title" id={headingId}>
        {CTA_BLOCK.heading}
      </Heading>
      <p className="home-body mt-2 max-w-[54ch] text-body">{CTA_BLOCK.body}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          href={DEMO_HREF}
          showArrow
          variant="solid"
          onClick={() => track("cta_click", { label: "cta_request_demo", placement })}
        >
          {CTA_BLOCK.demo}
        </Button>
        <Button
          href={CALCULATOR_HREF}
          variant="ghost"
          onClick={() => track("cta_click", { label: "cta_claim_worth", placement })}
        >
          {CTA_BLOCK.calculator}
        </Button>
        <Button
          href={QUESTION_HREF}
          variant="ghost"
          onClick={() => track("cta_click", { label: "cta_ask_question", placement })}
        >
          {CTA_BLOCK.question}
        </Button>
      </div>
    </div>
  );
}
