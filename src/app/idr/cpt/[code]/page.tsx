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
  WaitHookBlock,
} from "@/components/idr/pain-sections";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { isIndexable } from "@/lib/idr/indexable";
import {
  composeDenialReasons,
  cptHubFaqs,
  cptHubMeta,
  h1Cpt,
  painCodeLine,
  plainLineLength,
} from "@/lib/idr/pain-content";
import {
  demoDeepLink,
  idrCodePath,
  idrCodeStatePath,
  idrSpecialtyPath,
} from "@/lib/idr/seo";
import { getCodeMeta, getSpecialtyMeta } from "@/lib/idr/taxonomy";
import { US_STATES } from "@/lib/constants/us-states";
import {
  faqPageJsonLd,
  medicallyReviewedWebPageJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ code: string }>;
};

const NOT_FOUND_META: Metadata = {
  title: "Not found | Sydra",
  robots: { index: false, follow: false },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const codeMeta = getCodeMeta(code);
  if (!codeMeta) {
    return NOT_FOUND_META;
  }

  const indexable = isIndexable({
    tier: "cpt",
    plainLineLength: plainLineLength(code),
  });

  return cptHubMeta({ code, proc: codeMeta.shortLabel, indexable });
}

export default async function CptHubPage({ params }: PageProps) {
  const { code } = await params;
  const codeMeta = getCodeMeta(code);
  if (!codeMeta) notFound();

  const proc = codeMeta.shortLabel;
  const cptDescription =
    (codeMeta.shortDescription ?? codeMeta.shortLabel).trim() || proc;
  const specialtySlug = codeMeta.specialty;
  const specialtyMeta = getSpecialtyMeta(specialtySlug);
  const denial = composeDenialReasons({ code, stateName: "any state" });
  const faqs = cptHubFaqs({ code, description: cptDescription });

  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: `${proc} (CPT ${code})`, path: idrCodePath(code) },
  ];

  const stateLinks = US_STATES.map((s) => ({
    name: `${proc} denials in ${s.name}`,
    href: idrCodeStatePath(code, s.code),
  }));

  const relatedCodeLinks = (codeMeta.relatedCodes ?? [])
    .map((related) => getCodeMeta(related))
    .filter((meta): meta is NonNullable<typeof meta> => meta !== null)
    .map((meta) => ({
      name: `${meta.shortLabel} denials`,
      href: idrCodePath(meta.code),
    }));
  const demoHref = demoDeepLink({ code });

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: idrCodePath(code),
            name: `${proc} (CPT ${code}) federal IDR`,
            description: `Out of network ${proc} (CPT ${code}) is routinely paid below billed charges or denied. That payment is an opening offer, and federal IDR exists to contest it. Sydra identifies what qualifies, assembles the submission, and can file it for you.`,
          }),
          serviceJsonLd({
            name: "Sydra federal IDR submissions",
            description: `Sydra identifies which ${proc} claims qualify for federal IDR, assembles the submission, holds every deadline, and can file on your behalf. Priced per claim or by subscription, never a percentage of recovery.`,
            serviceType: "Healthcare revenue cycle software",
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs} stickyDemoHref={demoHref}>
        <Section tone="white">
          <EntityHero
            eyebrow="Federal IDR · Code overview"
            title={h1Cpt(proc, code)}
            subtitle="The denial, the code, and the path to recovery."
            lead={`Out of network ${proc} (CPT ${code}) is routinely paid below the billed charge or denied outright. Most practices treat what arrives as the amount owed. Under the No Surprises Act it is an opening offer, and federal independent dispute resolution exists to contest it. We prepare the submission, and we can file it for you.`}
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
          <DenialCta />
        </Section>

        <Section tone="white">
          <EntityFaq items={faqs} />
        </Section>

        <Section tone="neutral">
          <EntityLinks
            inline
            links={stateLinks}
            title={`${proc} denials by state`}
          />
          {relatedCodeLinks.length > 0 ? (
            <div className="mt-12">
              <EntityLinks links={relatedCodeLinks} title="Related codes" />
            </div>
          ) : null}
          {specialtyMeta ? (
            <div className="mt-12">
              <EntityLinks
                links={[
                  {
                    name: `All ${specialtyMeta.name} denials`,
                    href: idrSpecialtyPath(specialtySlug),
                  },
                ]}
                title="Browse the specialty"
              />
            </div>
          ) : null}
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
