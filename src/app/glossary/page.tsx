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
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import {
  CALL_CTA_LABEL,
  CALL_PATH,
  CASE_REVIEW_PATH,
  PRIMARY_CTA_LABEL,
} from "@/lib/case-review";
import { GLOSSARY_TERMS } from "@/lib/content/glossary";
import { EDITORIAL } from "@/lib/images";
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
              Plain language definitions for the terms billing teams actually encounter. Each entry
              links to the guide that owns the full explanation.
            </p>
            <div className="mt-8">
              <div className="cta-row">
                <Button href={CALL_PATH} showArrow>
                  {CALL_CTA_LABEL}
                </Button>
                <Button href={CASE_REVIEW_PATH} variant="ghost">
                  {PRIMARY_CTA_LABEL}
                </Button>
              </div>
              <CtaTrustSignals className="mt-4" />
            </div>
          </header>
          <EditorialImage
            aspect="3/2"
            asset={EDITORIAL.billerKeyboardDashboard}
            className="mt-10"
            eager
            focus="upper"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
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

        <Section tone="white">
          <ServiceCrossLinks current="/glossary" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
