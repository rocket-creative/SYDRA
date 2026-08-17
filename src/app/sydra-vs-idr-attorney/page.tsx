import { ConversionCtaPair } from "@/components/landing/conversion-cta-pair";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { CtaLink } from "@/components/ui/cta-link";
import { Section } from "@/components/ui/section";
import {
  OPTIONS_COMPARED_SECTIONS,
  OPTIONS_COMPARISON_COLUMNS,
  OPTIONS_COMPARISON_ROWS,
  SYDRA_VS_ATTORNEY_HERO,
} from "@/lib/content/sydra-vs-attorney-page";
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

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule">
              <th className="pb-4 pr-4 font-normal text-brand" scope="col">
                <span className="sr-only">Comparison</span>
              </th>
              {OPTIONS_COMPARISON_COLUMNS.map((column) => (
                <th
                  className="px-4 pb-4 text-left font-normal text-brand last:pl-4 last:pr-0"
                  key={column}
                  scope="col"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OPTIONS_COMPARISON_ROWS.map((row) => (
              <tr className="border-b border-rule" key={row.feature}>
                <th className="py-4 pr-4 text-left text-[15px] font-medium text-body" scope="row">
                  {row.feature}
                </th>
                {row.values.map((value, index) => (
                  <td className="px-4 py-4 last:pl-4 last:pr-0" key={`${row.feature}-${index}`}>
                    <span className="text-sm text-body">{value}</span>
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
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.sydraVsAttorney]}>
        <Section ariaLabelledby="heading-sydra-vs-attorney" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-sydra-vs-attorney">
              {SYDRA_VS_ATTORNEY_HERO.title}
            </h1>
            <p className={textStyles.pageLead}>{SYDRA_VS_ATTORNEY_HERO.lead}</p>
          </header>
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

        <Section tone="white">
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
