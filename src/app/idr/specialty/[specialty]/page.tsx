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
import { idrCodePath, idrStatePath, specialtyHubMetadata } from "@/lib/idr/seo";
import {
  LAUNCH_STATES,
  codesForSpecialty,
  getSpecialtyMeta,
} from "@/lib/idr/taxonomy";
import type { SpecialtySlug } from "@/lib/idr/types";
import { itemListJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";
import { textStyles } from "@/lib/typography";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ specialty: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { specialty } = await params;
  const meta = getSpecialtyMeta(specialty);
  if (!meta) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  return specialtyHubMetadata({ slug: meta.slug, name: meta.name });
}

export default async function SpecialtyHubPage({ params }: PageProps) {
  const { specialty } = await params;
  const meta = getSpecialtyMeta(specialty);
  if (!meta) notFound();

  const codes = codesForSpecialty(meta.slug as SpecialtySlug);
  if (codes.length === 0) notFound();

  const path = `/idr/specialty/${meta.slug}`;
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: meta.name, path },
  ];

  const codeLinks = codes.map((c) => ({
    name: `${c.shortLabel} (CPT ${c.code})`,
    href: idrCodePath(c.code),
  }));

  const stateLinks = LAUNCH_STATES.map((s) => ({
    name: s.name,
    href: idrStatePath(s.code),
  }));

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          itemListJsonLd(
            codes.map((c) => ({
              name: `${c.shortLabel} (CPT ${c.code})`,
              path: idrCodePath(c.code),
            })),
          ),
          serviceJsonLd({
            name: "Sydra NSA IDR software",
            description: `Software for preparing federal IDR submissions for ${meta.name.toLowerCase()} codes.`,
            serviceType: "Healthcare revenue cycle software",
          }),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="Federal IDR · Specialty"
            title={`Federal IDR for ${meta.name.toLowerCase()}.`}
            subtitle="The codes surgical teams dispute most."
            lead={meta.blurb}
          />
        </Section>

        <Section tone="neutral">
          <h2 className={textStyles.sectionTitle}>{meta.name} IDR codes.</h2>
          <p className={`${textStyles.body} mt-3 prose-measure`}>
            Each code page links through to payer benchmarks and dispute outcomes
            by state.
          </p>
          <div className="mt-8">
            <EntityLinks inline links={codeLinks} title="Procedure codes" />
          </div>
        </Section>

        <Section tone="white">
          <EntityLinks links={stateLinks} title="By state" />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
