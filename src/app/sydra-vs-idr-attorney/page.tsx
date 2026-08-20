import { Suspense } from "react";

import { ConversionCtaPair } from "@/components/landing/conversion-cta-pair";
import { SharedLeadForm } from "@/components/landing/shared-lead-form";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { CtaLink } from "@/components/ui/cta-link";
import {
  dataTableBodyRow,
  dataTableClass,
  dataTableHeadRow,
  dataTableTd,
  dataTableTh,
} from "@/components/ui/data-table";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import { caseReviewUrl } from "@/lib/case-review";
import {
  OPTIONS_COMPARED_SECTIONS,
  OPTIONS_COMPARISON_COLUMNS,
  OPTIONS_COMPARISON_ROWS,
  SYDRA_VS_ATTORNEY_HERO,
} from "@/lib/content/sydra-vs-attorney-page";
import { EDITORIAL } from "@/lib/images";
import { medicallyReviewedWebPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.sydraVsAttorney;

function SydraVsAttorneyJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.sydraVsAttorney]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/sydra-vs-idr-attorney",
            name: "Federal IDR: Your Options Compared",
            description: PAGE_METADATA.sydraVsAttorney.description ?? "",
          }),
        ]}
      />
    </>
  );
}

function OptionsComparisonTable() {
  return (
    <div className="mt-10">
      <div className="space-y-4 md:hidden">
        {OPTIONS_COMPARISON_ROWS.map((row) => (
          <div className="border border-rule p-5" key={row.feature}>
            <p className="type-caption uppercase tracking-[0.08em] text-body/70">{row.feature}</p>
            <dl className="mt-3 space-y-3">
              {OPTIONS_COMPARISON_COLUMNS.map((column, index) => (
                <div key={column}>
                  <dt className="text-sm font-medium text-brand">{column}</dt>
                  <dd className="mt-1 break-words text-sm text-body">{row.values[index]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <table className={dataTableClass}>
          <thead>
            <tr className={dataTableHeadRow}>
              <th className={dataTableTh} scope="col">
                <span className="sr-only">Comparison</span>
              </th>
              {OPTIONS_COMPARISON_COLUMNS.map((column) => (
                <th className={dataTableTh} key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OPTIONS_COMPARISON_ROWS.map((row) => (
              <tr className={dataTableBodyRow} key={row.feature}>
                <th className={`${dataTableTd} font-medium text-brand`} scope="row">
                  {row.feature}
                </th>
                {row.values.map((value, index) => (
                  <td className={dataTableTd} key={`${row.feature}-${index}`}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SydraVsAttorneyPage() {
  return (
    <>
      <SydraVsAttorneyJsonLd />
      <SydraPageShell
        banded
        breadcrumb={[...BREADCRUMBS.sydraVsAttorney]}
        stickyCtaHref={caseReviewUrl("options-compared-sticky")}
      >
        <Section ariaLabelledby="heading-sydra-vs-attorney" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-sydra-vs-attorney">
              {SYDRA_VS_ATTORNEY_HERO.title}
            </h1>
            <p className={textStyles.pageLead}>{SYDRA_VS_ATTORNEY_HERO.lead}</p>
          </header>
          <EditorialImage
            aspect="16/9"
            asset={EDITORIAL.executiveDocumentReview}
            className="mt-10"
            eager
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <OptionsComparisonTable />
        </Section>

        <Section tone="neutral">
          <div className="space-y-14">
            {OPTIONS_COMPARED_SECTIONS.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className={textStyles.sectionTitle} id={section.id}>
                  {section.title}
                </h2>
                <div className={`${textStyles.bodyStack} mt-4`}>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                {"ctaHref" in section && section.ctaHref ? (
                  <p className="mt-6">
                    <CtaLink href={section.ctaHref}>{section.ctaLabel}</CtaLink>
                  </p>
                ) : null}
              </section>
            ))}
          </div>
        </Section>

        {/*
          A reader comparing filing arrangements wants a number, and the number
          depends on their specialty and volume, so the ask is the call. The form
          is on the page because this route also serves paid traffic on attorney
          and contingency keywords, where a second click costs conversions.
        */}
        <Section ariaLabelledby="heading-attorney-form" tone="white">
          <h2 className={textStyles.sectionTitle} id="heading-attorney-form">
            Get your number on a 15-minute call.
          </h2>
          <p className={`${textStyles.bodyMeasure} mt-4`}>
            Bring your monthly out of network volume and what your current arrangement takes off the
            top. You will see the per claim comparison on your own figures. Nothing to sign.
          </p>
          <div className="mt-10">
            <Suspense fallback={<div className="h-96 animate-pulse bg-surface-muted" />}>
              <SharedLeadForm
                anchorId="attorney-lead-form"
                defaultSegment="uses_contingency_firm"
                intent="demo"
                landingPage="sydra-vs-idr-attorney"
              />
            </Suspense>
          </div>
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <ConversionCtaPair placement="options-compared" />
          </div>
          <ServiceCrossLinks current="/sydra-vs-idr-attorney" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
