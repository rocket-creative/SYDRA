"use client";

import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getSalesEmail, salesMailtoHref } from "@/lib/contact";
import { trackCtaClick } from "@/lib/landing/analytics-client";
import { kronosCaseReviewUrl } from "@/lib/kronos-revenue";
import type { CampaignTracking } from "@/lib/landing/tracking";

type TwoPathsProps = {
  tracking: CampaignTracking;
};

export function TwoPaths({ tracking }: TwoPathsProps) {
  const scrollToForm = (product: "sydra" | "kronos") => {
    trackCtaClick(product, tracking);
    if (product === "kronos") {
      const el = document.getElementById("lead-form");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const el = document.getElementById("lead-form");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <h3 className="mt-3 text-xl font-medium text-brand">Sydra</h3>
          <p className="mt-4 type-body text-body">
            Software your billing team operates. Best when you want to keep the workflow and the
            margin.
          </p>
          <div className="mt-8">
            <Button className="w-full" showArrow type="button" onClick={() => scrollToForm("sydra")}>
              Book a demo
            </Button>
          </div>
        </article>

        <article
          className="editorial-card bg-white p-6 sm:p-8"
          id="kronos-path"
          style={{ "--card-accent": "var(--color-kronos-green)" } as CSSProperties}
        >
          <p className="type-caption text-[var(--color-kronos-green-dark)]">Done for you</p>
          <h3 className="mt-3 text-xl font-medium text-[var(--color-kronos-green-dark)]">
            Kronos Revenue
          </h3>
          <p className="mt-4 type-body text-body">
            Our boutique team files every claim for you, specialty coded, for a flat fee, never 20%.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              className="w-full !border-[var(--color-kronos-green-dark)] !bg-[var(--color-kronos-green-dark)] hover:!bg-[#003d1f]"
              href={kronosCaseReviewUrl()}
              rel="noopener noreferrer"
              showArrow
              target="_blank"
              onClick={() => trackCtaClick("kronos", tracking)}
            >
              Free 15 minute case review
            </Button>
            <p className="text-sm text-body">
              <a
                className="text-link inline-flex min-h-[44px] items-center font-medium text-[var(--color-kronos-green-dark)] underline decoration-rule underline-offset-4"
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
