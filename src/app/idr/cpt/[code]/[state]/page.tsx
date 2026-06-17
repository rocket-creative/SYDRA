import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import {
  CodeLine,
  DenialCta,
  DenialReasons,
  PromiseAndDisclaimer,
  StatePathwayBlock,
  WaitHookBlock,
} from "@/components/idr/pain-sections";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { Section } from "@/components/ui/section";
import { isNamedPayer } from "@/lib/idr/denial-reasons";
import { isIndexable } from "@/lib/idr/indexable";
import {
  composeDenialReasons,
  cptStateFaqs,
  cptStateMeta,
  h1CptState,
  painCodeLine,
  plainLineLength,
} from "@/lib/idr/pain-content";
import {
  demoDeepLink,
  idrCodePath,
  idrCodeStatePath,
  idrCodeStatePayerPath,
  idrStatePath,
  idrStateSpecialtyPath,
} from "@/lib/idr/seo";
import { getStatePathway } from "@/lib/idr/state-pathways";
import {
  getCodeMeta,
  getSpecialtyMeta,
  getStateName,
  IDR_PAYERS,
  stateCodeFromSlug,
} from "@/lib/idr/taxonomy";
import { faqPageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ code: string; state: string }>;
};

const NOT_FOUND_META: Metadata = {
  title: "Not found | Sydra",
  robots: { index: false, follow: false },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code, state: rawState } = await params;
  const stateCode = stateCodeFromSlug(rawState);
  const codeMeta = getCodeMeta(code);
  const stateName = stateCode ? getStateName(stateCode) : null;
  if (!stateCode || !codeMeta || !stateName) {
    return NOT_FOUND_META;
  }

  const proc = codeMeta.shortLabel;
  const pathway = getStatePathway(stateCode);
  const reasonCount = composeDenialReasons({ code, stateName }).reasons.length;
  const indexable = isIndexable({
    tier: "cptState",
    hasStatePathway: !!pathway,
    reasonCount,
    plainLineLength: plainLineLength(code),
    stateCode,
  });

  return cptStateMeta({ code, stateCode, proc, stateName, indexable });
}

export default async function CptStatePage({ params }: PageProps) {
  const { code, state: rawState } = await params;
  const stateCode = stateCodeFromSlug(rawState);
  const codeMeta = getCodeMeta(code);
  const stateName = stateCode ? getStateName(stateCode) : null;

  if (!stateCode || !codeMeta || !stateName) {
    notFound();
  }

  const pathway = getStatePathway(stateCode);
  if (!pathway) notFound();

  const proc = codeMeta.shortLabel;
  const specialtySlug = codeMeta.specialty;
  const specialtyMeta = getSpecialtyMeta(specialtySlug);
  const denial = composeDenialReasons({ code, stateName });

  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: `${proc} (CPT ${code})`, path: idrCodePath(code) },
    { name: stateName, path: idrCodeStatePath(code, stateCode) },
  ];

  const faqs = cptStateFaqs({ proc, code, stateName, stateCode });

  const payerLinks = IDR_PAYERS.filter((p) => isNamedPayer(p.slug)).map((p) => ({
    name: `${p.name} denials on this code in ${stateName}`,
    href: idrCodeStatePayerPath(code, stateCode, p.slug),
  }));

  const keepExploringLinks = [
    { name: `${proc} denied in any state`, href: idrCodePath(code) },
    {
      name: `All out of network surgical denials in ${stateName}`,
      href: idrStatePath(stateCode),
    },
    ...(specialtyMeta
      ? [
          {
            name: `${specialtyMeta.name} denials in ${stateName}`,
            href: idrStateSpecialtyPath(stateCode, specialtySlug),
          },
        ]
      : []),
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          faqPageJsonLd(faqs),
          serviceJsonLd({
            name: "Sydra NSA IDR software",
            description: `Software that prepares the federal IDR submission for ${proc} disputes.`,
            serviceType: "Healthcare revenue cycle software",
          }),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow={`Federal IDR · ${stateName}`}
            title={h1CptState(proc, stateName)}
            subtitle="The denial, the code, and the path to recovery."
            lead={`When an out of network ${proc} claim in ${stateName} is paid below the billed charge or denied outright, that gap is what federal independent dispute resolution exists to recover. We prepare the submission and you keep the recovery.`}
          />
        </Section>

        <Section tone="neutral">
          <CodeLine line={painCodeLine(code)} />
        </Section>

        <Section tone="white">
          <DenialReasons denial={denial} />
        </Section>

        <Section tone="neutral">
          <PromiseAndDisclaimer />
        </Section>

        <Section tone="white">
          <WaitHookBlock />
        </Section>

        <Section tone="neutral">
          <StatePathwayBlock pathway={pathway} />
        </Section>

        <Section tone="white">
          <DenialCta href={demoDeepLink({ code, stateCode })} />
        </Section>

        <Section tone="neutral">
          <EntityFaq items={faqs} />
        </Section>

        <Section tone="white">
          <div className="grid gap-12 md:grid-cols-2">
            {payerLinks.length > 0 ? (
              <EntityLinks
                links={payerLinks}
                title={`Named payers denying ${proc} in ${stateName}`}
              />
            ) : null}
            <EntityLinks links={keepExploringLinks} title="Keep exploring" />
          </div>
        </Section>
      </SydraPageShell>
    </>
  );
}
