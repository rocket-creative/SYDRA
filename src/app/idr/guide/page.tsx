import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { caseReviewUrl } from "@/lib/case-review";
import { GUIDES } from "@/lib/idr/guides";
import { itemListJsonLd, medicallyReviewedWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Federal IDR Guides for Surgical Billing Teams | Sydra",
  description:
    "How the federal IDR process works for out of network surgical claims: eligibility, deadlines, the qualifying payment amount, open negotiation, and why awards run above the QPA.",
  path: "/idr/guide",
  ogImageAlt: "Federal IDR guides for surgical billing teams.",
});

const crumbs = [
  { name: "Home", path: "" },
  { name: "Federal IDR", path: "/idr" },
  { name: "Guides", path: "/idr/guide" },
];

export default function GuideIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/idr/guide",
            name: "Federal IDR guides",
            description:
              "How the federal IDR process works for out of network surgical claims, written for billing teams.",
          }),
          itemListJsonLd(
            GUIDES.map((guide) => ({
              name: guide.title.replace(/\.$/, ""),
              path: `/idr/guide/${guide.slug}`,
            })),
          ),
        ]}
      />
      <SydraPageShell
        banded
        breadcrumb={crumbs}
        stickyCtaHref={caseReviewUrl("idr-guide-sticky")}
      >
        <Section ariaLabelledby="heading-idr-guides" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-idr-guides">
              Federal IDR guides.
              <span className={textStyles.pageSubtitle}>
                How the process actually runs.
              </span>
            </h1>
            <p className={textStyles.pageLead}>
              There is a defined federal pathway between a payer&apos;s underpayment and a binding
              arbitrated amount: an open negotiation window, an eligibility determination, a
              batching decision, then arbitration. Each step has a hard deadline, and missing one
              forfeits the claim.
            </p>
            <p className={`${textStyles.body} mt-4`}>
              These guides cover each step: what qualifies a claim, which clocks are running, why
              the qualifying payment amount comes in low, and why surgical awards land well above
              it. Written for billing teams and practice administrators, not patients.
            </p>
          </header>
        </Section>

        <Section sidebarLabel="Guides" tone="neutral">
          <ul className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2">
            {GUIDES.map((guide) => (
              <li key={guide.slug} className="bg-white">
                <Link
                  className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-neutral-section focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:p-9"
                  href={`/idr/guide/${guide.slug}`}
                >
                  <h2 className="text-lg font-medium text-brand transition-colors group-hover:text-[var(--color-hero)]">
                    {guide.title.replace(/\.$/, "")}
                  </h2>
                  <p className={textStyles.meta}>{guide.metaDescription}</p>
                  <span className={`${textStyles.textLink} mt-auto pt-2 text-sm`}>
                    Read the guide
                  </span>
                </Link>
              </li>
            ))}
            {GUIDES.length % 2 === 1 ? (
              <li aria-hidden="true" className="hidden bg-white sm:block" />
            ) : null}
          </ul>
        </Section>

        <SydraCtaBand />

        <Section tone="white">
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
