import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import {
  DenialCta,
  PromiseAndDisclaimer,
  StatePathwayBlock,
  WaitHookBlock,
} from "@/components/idr/pain-sections";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { Section } from "@/components/ui/section";
import { isIndexable } from "@/lib/idr/indexable";
import { h1State, stateHubFaqsPain, stateHubMeta } from "@/lib/idr/pain-content";
import {
  demoDeepLink,
  idrCodeStatePath,
  idrStatePath,
  idrStateSpecialtyPath,
} from "@/lib/idr/seo";
import { getStatePathway } from "@/lib/idr/state-pathways";
import {
  IDR_CODES,
  SPECIALTIES,
  getStateName,
  stateCodeFromSlug,
} from "@/lib/idr/taxonomy";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ state: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: rawState } = await params;
  const code = stateCodeFromSlug(rawState);
  const stateName = code ? getStateName(code) : null;
  if (!code || !stateName) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  const pathway = getStatePathway(code);
  const indexable = isIndexable({
    tier: "state",
    hasStatePathway: !!pathway,
    stateCode: code,
    isLaunchState: pathway?.isLaunch ?? false,
  });
  return stateHubMeta({ stateCode: code, stateName, indexable });
}

export default async function StateHubPage({ params }: PageProps) {
  const { state: rawState } = await params;
  const code = stateCodeFromSlug(rawState);
  const stateName = code ? getStateName(code) : null;
  if (!code || !stateName) notFound();

  const pathway = getStatePathway(code);
  if (!pathway) notFound();

  const path = idrStatePath(code);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: stateName, path },
  ];

  const specialtyLinks = SPECIALTIES.map((s) => ({
    name: `${s.name} denials in ${stateName}`,
    href: idrStateSpecialtyPath(code, s.slug),
  }));

  const codeLinks = IDR_CODES.slice(0, 24).map((c) => ({
    name: `${c.shortLabel} denials in ${stateName}`,
    href: idrCodeStatePath(c.code, code),
  }));

  const faqs = stateHubFaqsPain(code, stateName);

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path,
            name: `Out of network surgical denials in ${stateName}`,
            description: `Federal IDR for out of network surgical claims in ${stateName}.`,
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            title={h1State(stateName)}
            subtitle="Federal IDR for out of network surgical claims."
            lead={`Out of network surgical claims in ${stateName} are routinely paid below the billed charge. The state pathway plus federal IDR is how surgical practices recover that gap, one denial at a time.`}
          />
        </Section>

        <Section tone="neutral">
          <StatePathwayBlock pathway={pathway} />
        </Section>

        <Section tone="white">
          <PromiseAndDisclaimer />
        </Section>

        <Section tone="neutral">
          <WaitHookBlock />
        </Section>

        <Section tone="white">
          <EntityLinks
            links={specialtyLinks}
            title={`Denials by specialty in ${stateName}`}
          />
          <div className="mt-10">
            <EntityLinks
              inline
              links={codeLinks}
              title={`Common procedure denials in ${stateName}`}
            />
          </div>
        </Section>

        <Section tone="neutral">
          <DenialCta href={demoDeepLink({ stateCode: code })} />
        </Section>

        <Section tone="white">
          <EntityFaq
            heading={`Federal IDR in ${stateName}: common questions.`}
            items={faqs}
          />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
