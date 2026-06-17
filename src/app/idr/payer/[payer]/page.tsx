import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
import { DENIAL_REASONS, isNamedPayer, payerEmphasis } from "@/lib/idr/denial-reasons";
import {
  demoDeepLink,
  idrCodeStatePayerPath,
  payerHubMetadata,
} from "@/lib/idr/seo";
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
  // Payer only hubs are a navigation and paid landing surface, not an indexable
  // matrix tier, so they stay noindex while still serving traffic.
  return payerHubMetadata({
    payerSlug: payer,
    payerName: payerMeta.name,
    hasData: false,
  });
}

function generic(body: string): string {
  return body
    .replaceAll("{proc}", "out of network surgical claims")
    .replaceAll("{state}", "your state")
    .replaceAll("{specialty}", "surgical");
}

export default async function PayerHubPage({ params }: PageProps) {
  const { payer } = await params;
  const payerMeta = getPayerMeta(payer);
  if (!payerMeta || !isNamedPayer(payer)) notFound();

  const payerName = payerMeta.name;
  const path = `/idr/payer/${payer}`;
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: payerName, path },
  ];

  const patterns = payerEmphasis(payer).map((key) => DENIAL_REASONS[key]);

  // A representative set of code by state by payer pages for crawl depth.
  const exampleLinks = IDR_CODES.slice(0, 8).flatMap((c) =>
    LAUNCH_STATES.slice(0, 3).map((s) => ({
      name: `${c.shortLabel} denials by ${payerName} in ${s.name}`,
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
            name: `${payerName} out of network surgical denials`,
            description: `Why ${payerName} underpays out of network surgical claims and how federal IDR recovers the gap.`,
          }),
          serviceJsonLd({
            name: "Sydra NSA IDR software",
            description: `Software that prepares the federal IDR submission for ${payerName} denials.`,
            serviceType: "Healthcare revenue cycle software",
          }),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow={`${payerName} · Federal IDR`}
            title={`Denied or underpaid by ${payerName}?`}
            subtitle="Out of network surgical claims."
            lead={`When ${payerName} pays an out of network surgical claim below the billed charge, that gap is what federal independent dispute resolution exists to recover. We build the submission, your billing team approves it, and you keep the recovery.`}
          />
          {payerMeta.aka && payerMeta.aka.length > 0 ? (
            <p className={`${textStyles.meta} mt-6`}>
              Also searched as {payerMeta.aka.join(", ")}.
            </p>
          ) : null}
        </Section>

        {patterns.length > 0 ? (
          <Section tone="neutral">
            <div className="prose-measure">
              <h2 className={textStyles.sectionTitle}>
                How {payerName} denials commonly land.
              </h2>
              <p className={`${textStyles.body} mt-4`}>
                These are commonly observed patterns for {payerName}, not a rule
                about any specific claim.
              </p>
              <ul className="mt-8 divide-y divide-[var(--color-rule)] border-y border-rule">
                {patterns.map((reason) => (
                  <li className="py-5" key={reason.key}>
                    <p className="type-caption uppercase tracking-[0.08em] text-body/70">
                      {reason.headline}
                    </p>
                    <p className={`${textStyles.body} mt-2`}>{generic(reason.body)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        ) : null}

        <Section tone="white">
          <PromiseAndDisclaimer />
        </Section>

        <Section tone="neutral">
          <WaitHookBlock />
        </Section>

        <Section tone="white">
          <DenialCta href={demoDeepLink({ payerSlug: payer })} />
        </Section>

        <Section tone="neutral">
          <EntityLinks
            inline
            links={exampleLinks}
            title={`${payerName} denials by procedure and state`}
          />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
