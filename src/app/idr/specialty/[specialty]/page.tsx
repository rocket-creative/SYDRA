import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import {
  DenialCta,
  PromiseAndDisclaimer,
  WaitHookBlock,
} from "@/components/idr/pain-sections";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { Section } from "@/components/ui/section";
import { isIndexable } from "@/lib/idr/indexable";
import {
  h1Specialty,
  specialtyHubFaqs,
  specialtyHubMeta,
  specialtyPainLabel,
} from "@/lib/idr/pain-content";
import {
  demoDeepLink,
  idrCodePath,
  idrSpecialtyPath,
  idrStateSpecialtyPath,
} from "@/lib/idr/seo";
import {
  LAUNCH_STATES,
  codesForSpecialty,
  getSpecialtyMeta,
} from "@/lib/idr/taxonomy";
import type { SpecialtySlug } from "@/lib/idr/types";
import { faqPageJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

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
  const painLabel = specialtyPainLabel(meta.slug);
  const indexable = isIndexable({ tier: "specialty" });
  return specialtyHubMeta({
    slug: meta.slug,
    name: meta.name,
    painLabel,
    indexable,
  });
}

export default async function SpecialtyHubPage({ params }: PageProps) {
  const { specialty } = await params;
  const meta = getSpecialtyMeta(specialty);
  if (!meta) notFound();

  const codes = codesForSpecialty(meta.slug as SpecialtySlug);
  const painLabel = specialtyPainLabel(meta.slug);

  const path = idrSpecialtyPath(meta.slug);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: meta.name, path },
  ];

  const codeLinks = codes.map((c) => ({
    name: `${c.shortLabel} (CPT ${c.code}) denials`,
    href: idrCodePath(c.code),
  }));

  const stateLinks = LAUNCH_STATES.map((s) => ({
    name: `${meta.name} denials in ${s.name}`,
    href: idrStateSpecialtyPath(s.code, meta.slug),
  }));

  const faqs = specialtyHubFaqs(meta.name, painLabel);

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path,
            name: `${meta.name} federal IDR`,
            description: meta.blurb,
          }),
          itemListJsonLd(
            codes.map((c) => ({
              name: `${c.shortLabel} (CPT ${c.code})`,
              path: idrCodePath(c.code),
            })),
          ),
          faqPageJsonLd(faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            title={h1Specialty(painLabel)}
            subtitle="The codes surgical teams dispute most."
            lead={meta.blurb}
          />
        </Section>

        <Section tone="neutral">
          <PromiseAndDisclaimer />
        </Section>

        <Section tone="white">
          <WaitHookBlock />
        </Section>

        <Section tone="neutral">
          <EntityLinks inline links={codeLinks} title="Procedure denials" />
          <div className="mt-10">
            <EntityLinks links={stateLinks} title="Denials by state" />
          </div>
        </Section>

        <Section tone="white">
          <DenialCta href={demoDeepLink({})} />
        </Section>

        <Section tone="neutral">
          <EntityFaq items={faqs} />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
