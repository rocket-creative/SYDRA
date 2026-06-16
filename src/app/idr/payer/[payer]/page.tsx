import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import { LegalFooter } from "@/components/idr/legal-footer";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { idrCodeStatePayerPath, payerHubMetadata } from "@/lib/idr/seo";
import {
  IDR_CODES,
  LAUNCH_STATES,
  getPayerMeta,
} from "@/lib/idr/taxonomy";
import { serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { textStyles } from "@/lib/typography";

export const dynamicParams = true;
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ payer: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { payer } = await params;
  const payerMeta = getPayerMeta(payer);
  if (!payerMeta) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  return payerHubMetadata({
    payerSlug: payer,
    payerName: payerMeta.name,
    hasData: payerMeta.hasMrf,
  });
}

export default async function PayerHubPage({ params }: PageProps) {
  const { payer } = await params;
  const payerMeta = getPayerMeta(payer);
  // Payer hubs only exist for payers whose data we hold.
  if (!payerMeta || !payerMeta.hasMrf) notFound();

  const payerName = payerMeta.name;
  const path = `/idr/payer/${payer}`;
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: payerName, path },
  ];

  // Surface a representative set of code x state x payer pages for crawl depth.
  const exampleLinks = IDR_CODES.slice(0, 8).flatMap((c) =>
    LAUNCH_STATES.slice(0, 3).map((s) => ({
      name: `${c.shortLabel} · ${s.code}`,
      href: idrCodeStatePayerPath(c.code, s.code, payer),
    })),
  );

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path,
            name: `${payerName} IDR disputes`,
            description: `Disputing underpaid out of network surgical claims with ${payerName} through federal IDR.`,
          }),
          serviceJsonLd({
            name: "Sydra NSA IDR software",
            description: `Software for preparing federal IDR submissions against ${payerName}.`,
            serviceType: "Healthcare revenue cycle software",
          }),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="Federal IDR · Payer overview"
            title={`Federal IDR disputes with ${payerName}.`}
            subtitle="Out of network surgical claims."
            lead={`When ${payerName} pays a surgical claim below the market rate out of network, the No Surprises Act federal IDR process is how practices recover the gap. Sydra prepares the ${payerName} dispute packet from an uploaded EOB.`}
          />
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <h2 className={textStyles.sectionTitle}>
              Disputing {payerName} underpayments.
            </h2>
            <p className={`${textStyles.body} mt-4`}>
              Sydra pulls the {payerName} out of network allowed amount, compares
              it against the in network median and the Medicare benchmark, and
              drafts a federal IDR submission citing prior determinations on the
              specific CPT code. Your billing team reviews and submits.
            </p>
            <LegalFooter className="mt-8" />
          </div>
        </Section>

        <Section tone="white">
          <EntityLinks
            inline
            links={exampleLinks}
            title={`${payerName} benchmarks by procedure and state`}
          />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
