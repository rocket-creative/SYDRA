import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { GLOSSARY_TERMS } from "@/lib/content/glossary";
import { definedTermSetJsonLd, medicallyReviewedWebPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/site";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.glossary;

function GlossaryJsonLd() {
  const base = siteUrl();
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.glossary]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/glossary",
            name: "Federal IDR glossary",
            description: PAGE_METADATA.glossary.description ?? "",
          }),
          definedTermSetJsonLd({
            path: "/glossary",
            name: "Federal IDR and No Surprises Act glossary",
            terms: GLOSSARY_TERMS.map((term) => ({
              name: term.term,
              description: term.definition,
              url: `${base}/glossary#${term.slug}`,
            })),
          }),
        ]}
      />
    </>
  );
}

export default function GlossaryPage() {
  return (
    <>
      <GlossaryJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.glossary]}>
        <Section ariaLabelledby="heading-glossary" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-glossary">
              Federal IDR glossary.
              <span className={textStyles.pageSubtitle}>
                Short definitions for the terms billing teams see most.
              </span>
            </h1>
            <p className={textStyles.pageLead}>
              Plain language definitions for federal independent dispute resolution under the No
              Surprises Act. Each entry links to the guide or resource that owns the full explainer.
            </p>
            <div className="mt-8">
              <Button href="/demo" showArrow>
                Schedule a demo
              </Button>
              <CtaTrustSignals className="mt-4" />
            </div>
          </header>
        </Section>

        <Section sidebarLabel="Terms" tone="neutral">
          <dl className="divide-y divide-[var(--color-rule)] border-y border-rule">
            {GLOSSARY_TERMS.map((term) => (
              <div key={term.slug} className="py-8 md:py-10" id={term.slug}>
                {term.slug === "qpa" ? (
                  <span className="sr-only" id="qualifying-payment-amount" />
                ) : null}
                <dt>
                  <h2 className={textStyles.subsectionTitle}>{term.term}</h2>
                </dt>
                <dd className={`${textStyles.bodyMeasure} mt-3`}>
                  <p>{term.definition}</p>
                  {term.relatedHref && term.relatedLabel ? (
                    <p className="mt-4">
                      <Link className={textStyles.textLink} href={term.relatedHref}>
                        {term.relatedLabel}
                      </Link>
                    </p>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <SydraCtaBand />

        <Section tone="white">
          <ServiceCrossLinks current="/glossary" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
