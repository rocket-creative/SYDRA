import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import { LegalFooter } from "@/components/idr/legal-footer";
import { IdrOutcomeStat } from "@/components/idr/idr-outcome-stat";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { stateHubFaqs } from "@/lib/idr/content";
import { pathwayLabel, percent } from "@/lib/idr/format";
import { getStateProfile } from "@/lib/idr/queries";
import {
  idrCodeStatePath,
  idrSpecialtyPath,
  idrStatePath,
  stateHubMetadata,
} from "@/lib/idr/seo";
import {
  IDR_CODES,
  SPECIALTIES,
  getStateName,
  stateCodeFromSlug,
} from "@/lib/idr/taxonomy";
import type { IdrBenchmark } from "@/lib/idr/types";
import { faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { textStyles } from "@/lib/typography";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ state: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: rawState } = await params;
  const state = stateCodeFromSlug(rawState);
  const stateName = state ? getStateName(state) : null;
  if (!state || !stateName) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  const profile = await getStateProfile(state);
  return stateHubMetadata({
    state,
    stateName,
    dataSource: profile?.dataSource ?? null,
  });
}

export default async function StateHubPage({ params }: PageProps) {
  const { state: rawState } = await params;
  const state = stateCodeFromSlug(rawState);
  const stateName = state ? getStateName(state) : null;
  if (!state || !stateName) notFound();

  const profile = await getStateProfile(state);
  if (!profile) notFound();

  const path = idrStatePath(state);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: stateName, path },
  ];

  // Outcome stat reuses the benchmark shape with state-level aggregates.
  const stateBenchmark: IdrBenchmark = {
    code: "",
    state,
    payerSlug: null,
    inNetworkMedian: 0,
    oonAllowed: 0,
    medicareRate: 0,
    idrWinRate: profile.idrWinRate,
    idrMedianPctQpa: profile.idrMedianPctQpa,
    dataSource: profile.dataSource,
    updatedAt: "",
  };

  const codeLinks = IDR_CODES.slice(0, 24).map((c) => ({
    name: `${c.shortLabel} (CPT ${c.code})`,
    href: idrCodeStatePath(c.code, state),
  }));

  const specialtyLinks = SPECIALTIES.map((s) => ({
    name: s.name,
    href: idrSpecialtyPath(s.slug),
  }));

  const faqs = stateHubFaqs(profile, stateName);

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path,
            name: `Federal IDR in ${stateName}`,
            description: `No Surprises Act and federal IDR for out of network surgical claims in ${stateName}.`,
          }),
          serviceJsonLd({
            name: "Sydra NSA IDR software",
            description: `Software for preparing federal IDR submissions in ${stateName}.`,
            serviceType: "Healthcare revenue cycle software",
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="Federal IDR · State overview"
            title={`Federal IDR in ${stateName}.`}
            subtitle="Eligibility pathway and dispute outcomes."
            lead={`In ${stateName}, the predominant pathway for out of network surgical disputes is ${pathwayLabel(
              profile.nsaPathway,
            ).toLowerCase()}, and providers win about ${percent(
              profile.idrWinRate,
            )} of disputes. Select a procedure to see payer benchmarks for that code in ${stateName}.`}
          />
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <h2 className={textStyles.sectionTitle}>
              How surprise billing disputes work in {stateName}.
            </h2>
            <p className={`${textStyles.body} mt-4`}>{profile.stateLawSummary}</p>
            <LegalFooter className="mt-8" />
          </div>
        </Section>

        <Section tone="white">
          <IdrOutcomeStat
            benchmark={stateBenchmark}
            codeLabel="surgical disputes"
            stateName={stateName}
          />
        </Section>

        <Section tone="neutral">
          <EntityLinks
            inline
            links={codeLinks}
            title={`Procedure benchmarks in ${stateName}`}
          />
          <div className="mt-10">
            <EntityLinks links={specialtyLinks} title="By specialty" />
          </div>
        </Section>

        <Section tone="white">
          <EntityFaq
            heading={`Federal IDR in ${stateName}: common questions.`}
            items={faqs}
          />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
