import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BenchmarkTable } from "@/components/idr/benchmark-table";
import { EligibilityBlock } from "@/components/idr/eligibility-block";
import { EntityConversion } from "@/components/idr/entity-conversion";
import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import { IdrOutcomeStat } from "@/components/idr/idr-outcome-stat";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { codeStateFaqs, codeStateLead } from "@/lib/idr/content";
import { getCodeStateContext } from "@/lib/idr/queries";
import { codeStateMetadata, idrCodePath, idrStatePath } from "@/lib/idr/seo";
import {
  getCodeMeta,
  getPayerMeta,
  getSpecialtyMeta,
} from "@/lib/idr/taxonomy";
import {
  datasetJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ code: string; state: string }>;
};

function normalizeState(state: string): string {
  return state.toUpperCase();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code, state: rawState } = await params;
  const state = normalizeState(rawState);
  const ctx = await getCodeStateContext(code, state);
  if (!ctx) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  return codeStateMetadata({
    code,
    state,
    codeLabel: ctx.codeLabel,
    stateName: ctx.stateName,
    dataSource: ctx.benchmark.dataSource,
  });
}

export default async function CodeStatePage({ params }: PageProps) {
  const { code, state: rawState } = await params;
  const state = normalizeState(rawState);
  const ctx = await getCodeStateContext(code, state);
  if (!ctx) notFound();

  const codeMeta = getCodeMeta(code);
  const { codeLabel, stateName, benchmark, payerBenchmarks, stateProfile } = ctx;
  const isSeed = benchmark.dataSource === "seed";
  const path = `/idr/cpt/${code}/${state}`;

  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: `${codeLabel} (CPT ${code})`, path: idrCodePath(code) },
    { name: stateName, path },
  ];

  const faqs = codeStateFaqs(ctx);

  // Payer pages we hold data for + sibling states for crawl depth.
  const payerLinks = payerBenchmarks
    .filter((row) => row.payerSlug && getPayerMeta(row.payerSlug)?.hasMrf)
    .map((row) => ({
      name: `${getPayerMeta(row.payerSlug ?? "")?.name ?? row.payerSlug}`,
      href: `/idr/cpt/${code}/${state}/${row.payerSlug}`,
    }));

  const specialty = codeMeta ? getSpecialtyMeta(codeMeta.specialty) : null;

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          datasetJsonLd({
            path,
            name: `${codeLabel} (CPT ${code}) payment benchmarks in ${stateName}`,
            description: `In network median, Medicare rate, out of network allowed amount, and federal IDR outcomes for ${codeLabel} in ${stateName}.`,
            dateModified: benchmark.updatedAt,
          }),
          serviceJsonLd({
            name: "Sydra NSA IDR software",
            description: `Software that prepares the federal IDR submission for ${codeLabel} (CPT ${code}) disputes.`,
            serviceType: "Healthcare revenue cycle software",
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow={`Federal IDR · ${stateName}`}
            title={`Federal IDR for ${codeLabel} (CPT ${code}) in ${stateName}.`}
            subtitle="Payer benchmarks, eligibility, and dispute outcomes."
            lead={codeStateLead(ctx)}
          />
        </Section>

        <Section tone="neutral">
          <BenchmarkTable
            aggregate={benchmark}
            codeLabel={codeLabel}
            isSeed={isSeed}
            payerRows={payerBenchmarks}
            stateName={stateName}
          />
        </Section>

        <Section tone="white">
          <IdrOutcomeStat
            benchmark={benchmark}
            codeLabel={codeLabel}
            stateName={stateName}
          />
        </Section>

        <Section tone="neutral">
          <EligibilityBlock
            codeLabel={codeLabel}
            profile={stateProfile}
            stateName={stateName}
          />
        </Section>

        <Section tone="white">
          <EntityConversion
            code={code}
            codeLabel={codeLabel}
            defaultAvgDisputedAmount={
              benchmark.inNetworkMedian - benchmark.oonAllowed
            }
            state={state}
            stateName={stateName}
          />
        </Section>

        <Section tone="neutral">
          <EntityFaq items={faqs} />
        </Section>

        <Section tone="white">
          <div className="grid gap-12 md:grid-cols-2">
            {payerLinks.length > 0 ? (
              <EntityLinks
                links={payerLinks}
                title={`Compare payers for CPT ${code} in ${stateName}`}
              />
            ) : null}
            <EntityLinks
              links={[
                { name: `${codeLabel} in all states`, href: idrCodePath(code) },
                { name: `All federal IDR in ${stateName}`, href: idrStatePath(state) },
                ...(specialty
                  ? [
                      {
                        name: `${specialty.name} IDR codes`,
                        href: `/idr/specialty/${specialty.slug}`,
                      },
                    ]
                  : []),
              ]}
              title="Keep exploring"
            />
          </div>
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
