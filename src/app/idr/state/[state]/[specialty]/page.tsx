import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import {
  DenialCta,
  DenialReasons,
  PromiseAndDisclaimer,
  StatePathwayBlock,
  WaitHookBlock,
} from "@/components/idr/pain-sections";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { Section } from "@/components/ui/section";
import { isIndexable } from "@/lib/idr/indexable";
import {
  composeDenialReasons,
  h1SpecialtyState,
  specialtyPainLabel,
  specialtyStateFaqs,
  specialtyStateMeta,
} from "@/lib/idr/pain-content";
import {
  demoDeepLink,
  idrCodeStatePath,
  idrSpecialtyPath,
  idrStatePath,
  idrStateSpecialtyPath,
} from "@/lib/idr/seo";
import { getStatePathway } from "@/lib/idr/state-pathways";
import {
  codesForSpecialty,
  getSpecialtyMeta,
  getStateName,
  stateCodeFromSlug,
} from "@/lib/idr/taxonomy";
import type { SpecialtySlug } from "@/lib/idr/types";
import { faqPageJsonLd, medicallyReviewedWebPageJsonLd } from "@/lib/seo/json-ld";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ state: string; specialty: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: rawState, specialty } = await params;
  const code = stateCodeFromSlug(rawState);
  const stateName = code ? getStateName(code) : null;
  const specialtyMeta = getSpecialtyMeta(specialty);
  const pathway = code ? getStatePathway(code) : null;
  if (!code || !stateName || !specialtyMeta || !pathway) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }

  const painLabel = specialtyPainLabel(specialtyMeta.slug);
  const codes = codesForSpecialty(specialtyMeta.slug as SpecialtySlug);
  const firstCode = codes[0];
  const denial = firstCode
    ? composeDenialReasons({ code: firstCode.code, stateName })
    : { intro: "", reasons: [] };
  const indexable = isIndexable({
    tier: "specialtyState",
    hasStatePathway: !!pathway,
    reasonCount: denial.reasons.length,
    stateCode: code,
    isLaunchState: pathway?.isLaunch ?? false,
  });
  return specialtyStateMeta({
    slug: specialtyMeta.slug,
    stateCode: code,
    painLabel,
    name: specialtyMeta.name,
    stateName,
    indexable,
  });
}

export default async function SpecialtyStatePage({ params }: PageProps) {
  const { state: rawState, specialty } = await params;
  const code = stateCodeFromSlug(rawState);
  const stateName = code ? getStateName(code) : null;
  const specialtyMeta = getSpecialtyMeta(specialty);
  const pathway = code ? getStatePathway(code) : null;
  if (!code || !stateName || !specialtyMeta || !pathway) notFound();

  const painLabel = specialtyPainLabel(specialtyMeta.slug);
  const codes = codesForSpecialty(specialtyMeta.slug as SpecialtySlug);
  const firstCode = codes[0];
  if (!firstCode) notFound();

  const denial = composeDenialReasons({ code: firstCode.code, stateName });

  const path = idrStateSpecialtyPath(code, specialtyMeta.slug);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: stateName, path: idrStatePath(code) },
    { name: specialtyMeta.name, path },
  ];

  const codeLinks = codes.map((c) => ({
    name: `${c.shortLabel} denials in ${stateName}`,
    href: idrCodeStatePath(c.code, code),
  }));

  const upLinks = [
    {
      name: `All ${specialtyMeta.name} denials`,
      href: idrSpecialtyPath(specialtyMeta.slug),
    },
    {
      name: `All out of network surgical denials in ${stateName}`,
      href: idrStatePath(code),
    },
  ];

  const faqs = specialtyStateFaqs({
    name: specialtyMeta.name,
    painLabel,
    stateName,
    stateCode: code,
  });
  const demoHref = demoDeepLink({ stateCode: code });

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path,
            name: h1SpecialtyState(painLabel, stateName),
            description: `Federal IDR for ${painLabel} in ${stateName}.`,
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs} stickyDemoHref={demoHref}>
        <Section tone="white">
          <EntityHero
            title={h1SpecialtyState(painLabel, stateName)}
            subtitle={`${specialtyMeta.name} claims under the No Surprises Act.`}
            lead={`When ${painLabel} in ${stateName} is paid below the billed charge, that payment is an opening offer, not the amount owed. Federal IDR is how surgical teams contest it, denial by denial.`}
          />
        </Section>

        <Section tone="neutral">
          <DenialReasons denial={denial} />
        </Section>

        <Section tone="white">
          <PromiseAndDisclaimer />
        </Section>

        <Section tone="neutral">
          <WaitHookBlock />
        </Section>

        <Section tone="white">
          <StatePathwayBlock pathway={pathway} />
        </Section>

        <Section tone="neutral">
          <DenialCta />
        </Section>

        <Section tone="white">
          <EntityLinks
            inline
            links={codeLinks}
            title={`Procedure denials in ${stateName}`}
          />
          <div className="mt-10">
            <EntityLinks links={upLinks} title="Related denials" />
          </div>
        </Section>

        <Section tone="neutral">
          <EntityFaq items={faqs} />
          <MedicalReviewBlock />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
