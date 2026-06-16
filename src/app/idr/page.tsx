import type { Metadata } from "next";

import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { GUIDES } from "@/lib/idr/guides";
import { idrSpecialtyPath, idrStatePath } from "@/lib/idr/seo";
import { LAUNCH_STATES, SPECIALTIES } from "@/lib/idr/taxonomy";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { textStyles } from "@/lib/typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Federal IDR Benchmarks by Code, State, and Payer | Sydra",
  description:
    "Payment benchmarks, eligibility, and dispute win rates for surgical out of network claims under the No Surprises Act. Browse federal IDR data by CPT code, state, payer, and specialty.",
  path: "/idr",
  ogImageAlt: "Federal IDR benchmarks by code, state, and payer.",
});

const crumbs = [
  { name: "Home", path: "" },
  { name: "Federal IDR", path: "/idr" },
];

export default function IdrIndexPage() {
  const specialtyLinks = SPECIALTIES.map((s) => ({
    name: s.name,
    href: idrSpecialtyPath(s.slug),
  }));
  const stateLinks = LAUNCH_STATES.map((s) => ({
    name: s.name,
    href: idrStatePath(s.code),
  }));
  const guideLinks = GUIDES.map((g) => ({
    name: g.title,
    href: `/idr/guide/${g.slug}`,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/idr",
            name: "Federal IDR benchmarks",
            description:
              "Payment benchmarks, eligibility, and dispute outcomes for surgical out of network claims under the No Surprises Act.",
          }),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="No Surprises Act"
            title="Federal IDR benchmarks for surgical billing teams."
            subtitle="By code, state, payer, and specialty."
            lead="The code is the spine; the dollar figures are public, mandated data. Browse payer benchmarks, eligibility, and dispute win rates for the out of network surgical claims your team disputes most."
          />
        </Section>

        <Section tone="neutral">
          <EntityLinks links={specialtyLinks} title="Browse by specialty" />
        </Section>

        <Section tone="white">
          <EntityLinks inline links={stateLinks} title="Browse by state" />
        </Section>

        <Section tone="neutral">
          <h2 className={textStyles.sectionTitle}>Guides.</h2>
          <p className={`${textStyles.body} mt-3 prose-measure`}>
            How the federal IDR process works for surgical practices.
          </p>
          <div className="mt-6">
            <EntityLinks links={guideLinks} title="How-to guides" />
          </div>
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
