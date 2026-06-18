import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { getComparison } from "@/lib/idr/comparisons";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  return buildPageMetadata({
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    path: `/compare/${slug}`,
  });
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const path = `/compare/${slug}`;
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Compare", path: "/compare" },
    { name: comparison.title.replace(/\.$/, ""), path },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path,
            name: comparison.title.replace(/\.$/, ""),
            description: comparison.metaDescription,
          }),
          faqPageJsonLd(comparison.faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="Compare"
            title={comparison.title}
            subtitle={`Sydra against ${comparison.alternative}.`}
            lead={comparison.lead}
            ctaHref="/demo"
            ctaLabel="Schedule a demo"
          />
        </Section>

        <Section tone="neutral">
          {/* Mobile: relabeled stacked rows so a three column table never forces
              horizontal page overflow at 360px. */}
          <div className="space-y-4 md:hidden">
            {comparison.rows.map((row) => (
              <div className="border border-rule p-5" key={row.label}>
                <p className="type-caption uppercase tracking-[0.08em] text-body/70">
                  {row.label}
                </p>
                <dl className="mt-3 space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-brand">Sydra</dt>
                    <dd className="mt-1 break-words text-sm text-brand">{row.sydra}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-body">
                      {comparison.alternative}
                    </dt>
                    <dd className="mt-1 break-words text-sm text-body">{row.other}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          {/* Desktop: full comparison table. */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{comparison.title}</caption>
              <thead>
                <tr className="border-b border-rule">
                  <th className="type-caption py-3 pr-4 font-normal text-body" scope="col">
                    &nbsp;
                  </th>
                  <th className="py-3 pr-4 text-sm font-medium text-brand" scope="col">
                    Sydra
                  </th>
                  <th className="py-3 text-sm font-normal text-body" scope="col">
                    {comparison.alternative}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr className="border-b border-rule" key={row.label}>
                    <th className="py-4 pr-4 text-sm font-normal text-body" scope="row">
                      {row.label}
                    </th>
                    <td className="py-4 pr-4 text-sm text-brand">{row.sydra}</td>
                    <td className="py-4 text-sm text-body">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section tone="white">
          <EntityFaq items={comparison.faqs} />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
