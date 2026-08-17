import type { CSSProperties } from "react";

import { Section } from "@/components/ui/section";

export function TwoPaths() {
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
        </article>
      </div>
    </Section>
  );
}
