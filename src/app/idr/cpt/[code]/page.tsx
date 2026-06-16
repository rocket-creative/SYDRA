import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { getCodeStateBenchmark, getStatesForCode } from "@/lib/idr/queries";
import { codeHubMetadata, idrCodeStatePath, idrSpecialtyPath } from "@/lib/idr/seo";
import { getCodeMeta, getSpecialtyMeta, getStateName } from "@/lib/idr/taxonomy";
import { serviceJsonLd } from "@/lib/seo/json-ld";
import { textStyles } from "@/lib/typography";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const codeMeta = getCodeMeta(code);
  if (!codeMeta) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  const states = await getStatesForCode(code);
  let hasData = false;
  for (const state of states) {
    const benchmark = await getCodeStateBenchmark(code, state);
    if (benchmark && benchmark.dataSource !== "seed") {
      hasData = true;
      break;
    }
  }
  return codeHubMetadata({ code, codeLabel: codeMeta.shortLabel, hasData });
}

export default async function CodeHubPage({ params }: PageProps) {
  const { code } = await params;
  const codeMeta = getCodeMeta(code);
  if (!codeMeta) notFound();

  const states = await getStatesForCode(code);
  if (states.length === 0) notFound();

  const codeLabel = codeMeta.shortLabel;
  const specialty = getSpecialtyMeta(codeMeta.specialty);
  const path = `/idr/cpt/${code}`;

  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: `${codeLabel} (CPT ${code})`, path },
  ];

  const stateLinks = states.map((state) => ({
    name: getStateName(state) ?? state,
    href: idrCodeStatePath(code, state),
  }));

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          serviceJsonLd({
            name: "Sydra NSA IDR software",
            description: `Software that prepares federal IDR submissions for ${codeLabel} (CPT ${code}) disputes.`,
            serviceType: "Healthcare revenue cycle software",
          }),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="Federal IDR · Code overview"
            title={`Federal IDR for ${codeLabel} (CPT ${code}).`}
            subtitle="Eligibility, benchmarks, and outcomes by state."
            lead={`${codeLabel} is a ${specialty?.name.toLowerCase() ?? "surgical"} procedure that surgical billing teams frequently dispute out of network. Select a state to see payer benchmarks, federal IDR eligibility, and dispute win rates for CPT ${code}.`}
          />
        </Section>

        <Section tone="neutral">
          <h2 className={textStyles.sectionTitle}>
            {codeLabel} federal IDR by state.
          </h2>
          <p className={`${textStyles.body} mt-3 prose-measure`}>
            Each state page carries payer by payer benchmarks and the IDR outcome
            data for that market.
          </p>
          <div className="mt-8">
            <EntityLinks inline links={stateLinks} title="Choose a state" />
          </div>
        </Section>

        <Section tone="white">
          {specialty ? (
            <EntityLinks
              links={[
                {
                  name: `All ${specialty.name} IDR codes`,
                  href: idrSpecialtyPath(specialty.slug),
                },
              ]}
              title="Related codes"
            />
          ) : null}
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
