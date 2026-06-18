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
import { payerAngleIsDistinct } from "@/lib/idr/denial-engine";
import { isNamedPayer } from "@/lib/idr/denial-reasons";
import { isIndexable } from "@/lib/idr/indexable";
import {
  composeDenialReasons,
  cptStatePayerFaqs,
  cptStatePayerMeta,
  h1CptStatePayer,
  painCodeLine,
  plainLineLength,
} from "@/lib/idr/pain-content";
import {
  demoDeepLink,
  idrCodePath,
  idrCodeStatePath,
  idrCodeStatePayerPath,
} from "@/lib/idr/seo";
import { getStatePathway } from "@/lib/idr/state-pathways";
import {
  getCodeMeta,
  getPayerMeta,
  getStateName,
  IDR_PAYERS,
  stateCodeFromSlug,
} from "@/lib/idr/taxonomy";
import { faqPageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ code: string; state: string; payer: string }>;
};

const NOT_FOUND_META: Metadata = {
  title: "Not found | Sydra",
  robots: { index: false, follow: false },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code, state: rawState, payer } = await params;
  const stateCode = stateCodeFromSlug(rawState);
  const codeMeta = getCodeMeta(code);
  const payerMeta = getPayerMeta(payer);
  const stateName = stateCode ? getStateName(stateCode) : null;
  if (!stateCode || !codeMeta || !payerMeta || !stateName || !isNamedPayer(payer)) {
    return NOT_FOUND_META;
  }

  const proc = codeMeta.shortLabel;
  const pathway = getStatePathway(stateCode);
  const reasonCount = composeDenialReasons({
    code,
    stateName,
    payerSlug: payer,
  }).reasons.length;
  const indexable = isIndexable({
    tier: "cptStatePayer",
    hasStatePathway: !!pathway,
    reasonCount,
    plainLineLength: plainLineLength(code),
    stateCode,
    payerAngleIsDistinct: payerAngleIsDistinct(code, payer),
  });

  return cptStatePayerMeta({
    code,
    stateCode,
    payerSlug: payer,
    proc,
    stateName,
    payerName: payerMeta.name,
    indexable,
  });
}

export default async function CptStatePayerPage({ params }: PageProps) {
  const { code, state: rawState, payer } = await params;
  const stateCode = stateCodeFromSlug(rawState);
  const codeMeta = getCodeMeta(code);
  const payerMeta = getPayerMeta(payer);
  const stateName = stateCode ? getStateName(stateCode) : null;

  if (!stateCode || !codeMeta || !payerMeta || !stateName || !isNamedPayer(payer)) {
    notFound();
  }

  const pathway = getStatePathway(stateCode);
  if (!pathway) notFound();

  const proc = codeMeta.shortLabel;
  const payerName = payerMeta.name;
  const denial = composeDenialReasons({ code, stateName, payerSlug: payer });

  const path = idrCodeStatePayerPath(code, stateCode, payer);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: `${proc} (CPT ${code})`, path: idrCodePath(code) },
    { name: stateName, path: idrCodeStatePath(code, stateCode) },
    { name: payerName, path },
  ];

  const faqs = cptStatePayerFaqs({ proc, code, stateName, stateCode, payerName });

  const otherPayerLinks = IDR_PAYERS.filter(
    (p) => isNamedPayer(p.slug) && p.slug !== payer,
  ).map((p) => ({
    name: `${p.name} denials on this code in ${stateName}`,
    href: idrCodeStatePayerPath(code, stateCode, p.slug),
  }));

  const keepExploringLinks = [
    {
      name: `All payers denying ${proc} in ${stateName}`,
      href: idrCodeStatePath(code, stateCode),
    },
    { name: `${proc} denied in any state`, href: idrCodePath(code) },
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
            eyebrow={`${payerName} · ${stateName}`}
            title={h1CptStatePayer(proc, stateName, payerName)}
            subtitle="The denial, the code, and the path to recovery."
            lead={`${payerName} paid your out of network ${proc} in ${stateName} below the billed charge, or denied it outright. That gap is what federal independent dispute resolution exists to recover, and we prepare the submission for you.`}
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
          <DenialCta href={demoDeepLink({ code, stateCode, payerSlug: payer })} />
        </Section>

        <Section tone="neutral">
          <EntityFaq items={faqs} />
        </Section>

        <Section tone="white">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {otherPayerLinks.length > 0 ? (
              <EntityLinks
                links={otherPayerLinks}
                title={`Other payers denying this code in ${stateName}`}
              />
            ) : null}
            <EntityLinks links={keepExploringLinks} title="Keep exploring" />
          </div>
        </Section>
      </SydraPageShell>
    </>
  );
}
