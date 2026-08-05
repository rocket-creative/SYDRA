"use client";

import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getSalesEmail, salesMailtoHref } from "@/lib/contact";
import { trackCtaClick } from "@/lib/landing/analytics-client";
import { CASE_REVIEW_PATH } from "@/lib/case-review";
import type { CampaignTracking } from "@/lib/landing/tracking";

type TwoPathsProps = {
  tracking: CampaignTracking;
};

export function TwoPaths({ tracking }: TwoPathsProps) {
  const scrollToForm = () => {
    trackCtaClick("sydra", tracking);
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Section
      ariaLabelledby="heading-two-paths"
      id="two-paths"
      sidebarLabel="Two paths"
      tone="white"
    >
      <h2 className="type-h2 prose-measure text-brand" id="heading-two-paths">
        Same specialty depth. Different operator.
      </h2>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="editorial-card bg-white p-6 sm:p-8">
          <p className="type-caption text-body/70">Run it in house</p>
          <h3 className="mt-3 text-xl font-medium text-brand">Sydra software</h3>
          <p className="mt-4 type-body text-body">
            Software your billing team operates. Best when you want to keep the workflow and the
            margin.{" "}
            <a
              className="font-medium text-[var(--color-accent)] underline decoration-rule underline-offset-4 transition-colors hover:text-[var(--color-hero)]"
              href="/pricing"
            >
              See Sydra pricing
            </a>
            .
          </p>
          <div className="mt-8">
            <Button className="w-full" showArrow type="button" onClick={scrollToForm}>
              Book a demo
            </Button>
          </div>
        </article>

        <article
          className="editorial-card bg-white p-6 sm:p-8"
          id="full-service-path"
          style={{ "--card-accent": "var(--color-full-service)" } as CSSProperties}
        >
          <p className="type-caption text-[var(--color-full-service-dark)]">Done for you</p>
          <h3 className="mt-3 text-xl font-medium text-[var(--color-full-service-dark)]">
            Sydra Full Service
          </h3>
          <p className="mt-4 type-body text-body">
            Our boutique team files every claim for you, specialty coded, for a flat fee, never 20%.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              className="w-full !border-[var(--color-full-service-dark)] !bg-[var(--color-full-service-dark)] hover:!bg-[#003d1f]"
              href={CASE_REVIEW_PATH}
              showArrow
              onClick={() => trackCtaClick("case_review", tracking)}
            >
              Free claim review
            </Button>
            <p className="text-sm text-body">
              <a
                className="text-link inline-flex min-h-[44px] items-center font-medium text-[var(--color-full-service-dark)] underline decoration-rule underline-offset-4"
                href={salesMailtoHref()}
              >
                {getSalesEmail()}
              </a>
            </p>
          </div>
        </article>
      </div>
    </Section>
  );
}
