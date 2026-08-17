import type { CSSProperties } from "react";

import { ConversionCtaPair } from "@/components/landing/conversion-cta-pair";
import { Section } from "@/components/ui/section";

export function TwoPaths() {
  return (
    <Section
      ariaLabelledby="heading-two-paths"
      id="two-paths"
      sidebarLabel="Two paths"
      tone="white"
    >
      <h2 className="sr-only" id="heading-two-paths">
        Two ways to file federal IDR
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <article
          className="editorial-card bg-white p-6 sm:p-8"
          id="full-service-path"
          style={{ "--card-accent": "var(--color-full-service)" } as CSSProperties}
        >
          <h3 className="text-xl font-medium text-[var(--color-full-service-dark)]">
            We file for you.
          </h3>
          <p className="mt-4 type-body text-body">
            Send us the claims. Our team prepares, files, and tracks every federal IDR dispute end
            to end. You review nothing unless you want to, and you keep the recovery.
          </p>
          <p className="mt-4 type-body text-body">
            Best for practices without a dedicated billing team, or any practice that would rather
            this simply be handled.
          </p>
        </article>

        <article className="editorial-card bg-white p-6 sm:p-8">
          <h3 className="text-xl font-medium text-brand">Or your team files with Sydra.</h3>
          <p className="mt-4 type-body text-body">
            Your billing staff runs Sydra directly. About five minutes per claim, and your team
            edits, approves and owns every submission before it leaves the practice.
          </p>
          <p className="mt-4 type-body text-body">
            Best for practices with an in-house biller, billing companies, and firms filing on
            behalf of clients.
          </p>
        </article>
      </div>
      <div className="mt-10">
        <p className="type-body text-brand">Either way, the first step is the same.</p>
        <div className="mt-6">
          <ConversionCtaPair placement="homepage-two-paths" showSupportingLine={false} />
        </div>
      </div>
    </Section>
  );
}
