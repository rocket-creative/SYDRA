"use client";

import { track } from "@vercel/analytics";

import { HomepageBand } from "@/components/landing/homepage-band";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_LABEL, caseReviewUrl } from "@/lib/case-review";

const segments = [
  {
    heading: "If you have never filed an IDR claim",
    body: "There is a defined federal pathway between a payer's underpayment and a binding arbitrated amount: an open negotiation window, an eligibility determination, a batching decision, then arbitration. Each step has a hard deadline, and missing one forfeits the claim. Sydra identifies which of your claims qualify, assembles the submissions, and manages every date. Nothing changes in how you practice or how you bill. The work happens downstream of what your office already does.",
    href: "/how-it-works",
    link: "See how Sydra works",
  },
  {
    heading: "If you already use a contingency firm charging 20% or more",
    body: "You don't need convincing that IDR recovers money. You've seen it. The question is how much of that recovery you keep, and whether the share you give up should keep growing as your volume does. Sydra is priced on per claim and subscription models rather than a percentage of recovery, so the cost of the service stops scaling against you at exactly the point your volume makes it most expensive.",
    href: "/sydra-vs-idr-attorney",
    link: "Compare your IDR options",
    ariaLabel: "Compare your IDR options if you already use a contingency firm",
  },
  {
    heading: "If you run an RCM company",
    body: "IDR is one of the last major revenue functions still handled largely by hand: eligibility screening, batch construction, deadline tracking, and submission assembly, all done claim by claim. That labor intensity is why most RCM firms either decline the work or price it painfully. Sydra supplies the automation layer underneath it, so you can open or expand an IDR service line without adding headcount in proportion to volume. It can run white label under your own brand.",
    href: "/idr-for-billing-companies",
    link: "Sydra for billing companies",
  },
  {
    heading: "If you run a contingency firm",
    body: "Same engine, aimed at a different number: recoveries per FTE. Automating the mechanical steps makes smaller dollar claims economical to pursue that currently are not worth a reviewer's time, and it lets your experienced people spend their hours on the disputes where judgment actually changes the outcome.",
    href: "/sydra-vs-idr-attorney",
    link: "Compare your IDR options",
    ariaLabel: "Compare your IDR options if you run a contingency firm",
  },
] as const;

export function AudienceSegments() {
  return (
    <HomepageBand ariaLabelledby="heading-homepage-segments" id="homepage-segments" tone="alt">
      <h2 className="home-h2 max-w-[720px] text-brand" id="heading-homepage-segments">
        Sydra was built to change the economics of that work.
      </h2>
      <p className="home-lead mt-6 max-w-[720px] text-body">
        Depending on where you sit, that means something different.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
        {segments.map((segment) => (
          <article
            className="flex h-full min-w-0 flex-col rounded border border-rule bg-white p-5 transition-colors md:p-8 lg:hover:border-body/40"
            key={segment.heading}
          >
            <h3 className="home-card-heading text-brand">{segment.heading}</h3>
            <p className="home-body mt-4 max-w-[60ch] text-body">{segment.body}</p>
            <CtaLink
              aria-label={"ariaLabel" in segment ? segment.ariaLabel : undefined}
              className="mt-auto min-h-12 pt-4 !text-[15px] !font-medium !normal-case !tracking-normal !text-[var(--color-accent)] hover:!text-[var(--color-hero)]"
              href={segment.href}
            >
              {segment.link}
            </CtaLink>
          </article>
        ))}
      </div>
      <div className="mt-12">
        <Button
          href={caseReviewUrl("homepage-segments")}
          showArrow
          variant="solid"
          onClick={() => {
            track("cta_primary_click", { placement: "homepage-segments" });
          }}
        >
          {PRIMARY_CTA_LABEL}
        </Button>
      </div>
    </HomepageBand>
  );
}
