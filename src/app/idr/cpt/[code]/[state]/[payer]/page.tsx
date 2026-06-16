import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityConversion } from "@/components/idr/entity-conversion";
import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import { IdrOutcomeStat } from "@/components/idr/idr-outcome-stat";
import { LegalFooter } from "@/components/idr/legal-footer";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { multiple, percent, usd } from "@/lib/idr/format";
import { getCodeStatePayerBenchmark } from "@/lib/idr/queries";
import {
  codeStatePayerMetadata,
  idrCodeStatePath,
  idrPayerPath,
} from "@/lib/idr/seo";
import { getCodeMeta, getPayerMeta, getStateName } from "@/lib/idr/taxonomy";
import { datasetJsonLd, faqPageJsonLd } from "@/lib/seo/json-ld";
import { textStyles } from "@/lib/typography";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ code: string; state: string; payer: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code, state: rawState, payer } = await params;
  const state = rawState.toUpperCase();
  const codeMeta = getCodeMeta(code);
  const payerMeta = getPayerMeta(payer);
  const stateName = getStateName(state);
  if (!codeMeta || !payerMeta || !stateName) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  const benchmark = await getCodeStatePayerBenchmark(code, state, payer);
  if (!benchmark) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  return codeStatePayerMetadata({
    code,
    state,
    payerSlug: payer,
    payerName: payerMeta.name,
    codeLabel: codeMeta.shortLabel,
    stateName,
    dataSource: benchmark.dataSource,
  });
}

export default async function CodeStatePayerPage({ params }: PageProps) {
  const { code, state: rawState, payer } = await params;
  const state = rawState.toUpperCase();
  const codeMeta = getCodeMeta(code);
  const payerMeta = getPayerMeta(payer);
  const stateName = getStateName(state);

  // Never render a code x payer page without that payer's data for that code
  // (playbook section 11: otherwise thin + wrong).
  if (!codeMeta || !payerMeta || !stateName || !payerMeta.hasMrf) notFound();

  const benchmark = await getCodeStatePayerBenchmark(code, state, payer);
  if (!benchmark) notFound();

  const codeLabel = codeMeta.shortLabel;
  const payerName = payerMeta.name;
  const isSeed = benchmark.dataSource === "seed";
  const path = `/idr/cpt/${code}/${state}/${payer}`;
  const spread = benchmark.inNetworkMedian - benchmark.oonAllowed;

  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: `${codeLabel} (CPT ${code})`, path: `/idr/cpt/${code}` },
    { name: stateName, path: idrCodeStatePath(code, state) },
    { name: payerName, path },
  ];

  const faqs = [
    {
      q: `How does ${payerName} pay CPT ${code} out of network in ${stateName}?`,
      a: `${payerName} allows roughly ${usd(
        benchmark.oonAllowed,
      )} out of network for ${codeLabel} in ${stateName}, against an in network median near ${usd(
        benchmark.inNetworkMedian,
      )} and a Medicare benchmark of ${usd(
        benchmark.medicareRate,
      )}. The gap is the basis for a federal IDR dispute.`,
    },
    {
      q: `What are the odds of winning an IDR dispute against ${payerName}?`,
      a: `For comparable ${codeLabel} disputes in ${stateName}, providers prevail in about ${percent(
        benchmark.idrWinRate,
      )} of cases, with median awards around ${multiple(
        benchmark.idrMedianPctQpa,
      )} the qualifying payment amount.`,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          datasetJsonLd({
            path,
            name: `${payerName} payment benchmarks for ${codeLabel} (CPT ${code}) in ${stateName}`,
            description: `${payerName} out of network allowed amount, in network median, Medicare rate, and federal IDR outcomes for ${codeLabel} in ${stateName}.`,
            dateModified: benchmark.updatedAt,
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow={`${payerName} · ${stateName}`}
            title={`${payerName} IDR for ${codeLabel} (CPT ${code}) in ${stateName}.`}
            subtitle="What this payer allows and what IDR awards."
            lead={`${payerName} allows around ${usd(
              benchmark.oonAllowed,
            )} out of network for ${codeLabel} in ${stateName}, about ${usd(
              spread,
            )} below the in network median. Federal IDR is how surgical practices recover that gap.`}
          />
        </Section>

        <Section tone="neutral">
          <h2 className={textStyles.sectionTitle}>
            {payerName} benchmarks for CPT {code}.
          </h2>
          <dl className="mt-8 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-3">
            <div className="bg-white p-6">
              <dt className="type-caption text-body">In network median</dt>
              <dd className="mt-3 text-2xl font-light tabular-nums text-brand">
                {usd(benchmark.inNetworkMedian)}
              </dd>
            </div>
            <div className="bg-white p-6">
              <dt className="type-caption text-body">Medicare rate</dt>
              <dd className="mt-3 text-2xl font-light tabular-nums text-brand">
                {usd(benchmark.medicareRate)}
              </dd>
            </div>
            <div className="bg-white p-6">
              <dt className="type-caption text-body">{payerName} OON allowed</dt>
              <dd className="mt-3 text-2xl font-light tabular-nums text-brand">
                {usd(benchmark.oonAllowed)}
              </dd>
            </div>
          </dl>
          <p className={`${textStyles.meta} mt-4`}>
            {isSeed
              ? "Illustrative placeholder figures pending machine readable file ingestion. Not real negotiated rates."
              : `Source: ${payerName} Transparency in Coverage machine readable files and CMS Physician Fee Schedule.`}
          </p>
        </Section>

        <Section tone="white">
          <IdrOutcomeStat
            benchmark={benchmark}
            codeLabel={codeLabel}
            stateName={stateName}
          />
        </Section>

        <Section tone="neutral">
          <EntityConversion
            code={code}
            codeLabel={codeLabel}
            defaultAvgDisputedAmount={spread}
            state={state}
            stateName={stateName}
          />
        </Section>

        <Section tone="white">
          <EntityFaq items={faqs} />
          <div className="mt-12">
            <EntityLinks
              links={[
                {
                  name: `All payers for ${codeLabel} in ${stateName}`,
                  href: idrCodeStatePath(code, state),
                },
                { name: `${payerName} IDR disputes`, href: idrPayerPath(payer) },
              ]}
              title="Keep exploring"
            />
          </div>
          <LegalFooter className="mt-10" />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
