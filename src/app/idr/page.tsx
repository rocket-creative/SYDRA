import type { Metadata } from "next";
import Link from "next/link";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { EntityLinks } from "@/components/idr/entity-links";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { RegulatoryAsOf } from "@/components/sydra/regulatory-as-of";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { US_STATES } from "@/lib/constants/us-states";
import { DISCLAIMER } from "@/lib/idr/copy";
import { GUIDES } from "@/lib/idr/guides";
import { IDR_HUB_FAQS } from "@/lib/idr/pain-content";
import { PROOF_POINTS } from "@/lib/idr/proof-points";
import { idrSpecialtyPath, idrStatePath } from "@/lib/idr/seo";
import { SPECIALTIES } from "@/lib/idr/taxonomy";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd, medicallyReviewedWebPageJsonLd } from "@/lib/seo/json-ld";
import { textStyles } from "@/lib/typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Out of network surgical claims denied? | Federal IDR | Sydra",
  description:
    "Out of network surgical claims get underpaid and denied. See why these claims get denied and how federal IDR recovers the gap, by procedure, state, and payer. We file it, you keep the recovery.",
  path: "/idr",
  ogImageAlt: "Out of network surgical denials and federal IDR by code, state, and payer.",
});

const crumbs = [
  { name: "Home", path: "" },
  { name: "Federal IDR", path: "/idr" },
];

const QPA_PHRASE = "qualifying payment amount";
const FIRST_QPA_PROOF_ID = PROOF_POINTS.find((p) =>
  p.claim.toLowerCase().includes(QPA_PHRASE),
)?.id;

export default function IdrIndexPage() {
  const specialtyLinks = SPECIALTIES.map((s) => ({
    name: s.name,
    href: idrSpecialtyPath(s.slug),
  }));
  const stateLinks = US_STATES.map((s) => ({
    name: s.name,
    href: idrStatePath(s.code),
  }));
  const guideLinks = [
    ...GUIDES.map((g) => ({
      name: g.listLabel ?? g.title,
      href: `/idr/guide/${g.slug}`,
    })),
    {
      name: "IDR eligibility, deadlines, and fees",
      href: "/resources/idr-eligibility-deadlines-fees",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/idr",
            name: "Federal IDR benchmarks",
            description:
              "Payment benchmarks, eligibility, and dispute outcomes for surgical out of network claims under the No Surprises Act.",
          }),
          faqPageJsonLd(IDR_HUB_FAQS),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="No Surprises Act"
            title="Out of network surgical claims denied or underpaid?"
            subtitle="Federal IDR, by code, state, payer, and specialty."
            lead="Out of network surgical claims are routinely paid below the billed charge or denied outright. Find your procedure, state, and payer to see why these claims get denied and how federal IDR recovers the gap. We build the submission and you keep the recovery."
          />
          <p className={`${textStyles.meta} mt-6`}>
            New to this? Start with{" "}
            <Link className={textStyles.textLink} href="/what-is-idr">
              what federal IDR is
            </Link>
            , see{" "}
            <Link className={textStyles.textLink} href="/how-it-works">
              how Sydra files a claim
            </Link>
            , review{" "}
            <Link className={textStyles.textLink} href="/pricing">
              pricing
            </Link>
            , or{" "}
            <Link className={textStyles.textLink} href="/demo">
              request a 15-minute demo
            </Link>
            .
          </p>
        </Section>

        <Section tone="neutral">
          <EntityLinks
            links={[
              {
                name: "Billing companies and RCM firms",
                href: "/idr-for-billing-companies",
              },
              { name: "In house IDR teams", href: "/in-house-idr" },
              {
                name: "Sydra vs an IDR attorney",
                href: "/sydra-vs-idr-attorney",
              },
            ]}
            title="Start by audience"
          />
        </Section>

        <Section tone="white">
          <EntityLinks links={specialtyLinks} title="Browse by specialty" />
        </Section>

        <Section tone="neutral">
          <EntityLinks inline links={stateLinks} title="Browse by state" />
        </Section>

        <Section tone="white">
          <h2 className={textStyles.sectionTitle}>The federal record.</h2>
          <p className={`${textStyles.body} mt-3 prose-measure`}>
            The published federal IDR record across all disputes. These are
            aggregate federal figures, sourced and dated, not a prediction about
            any one claim.
          </p>
          <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF_POINTS.map((point) => {
              const qpaIndex =
                point.id === FIRST_QPA_PROOF_ID
                  ? point.claim.toLowerCase().indexOf(QPA_PHRASE)
                  : -1;

              return (
                <div key={point.id}>
                  <dt
                    className="font-light leading-none tracking-[-0.03em] tabular-nums text-brand text-balance"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                  >
                    {point.value}
                  </dt>
                  <dd className={`${textStyles.body} mt-3`}>
                    {qpaIndex >= 0 ? (
                      <>
                        {point.claim.slice(0, qpaIndex)}
                        <Link
                          className={textStyles.textLink}
                          href="/glossary#qpa"
                        >
                          {point.claim.slice(qpaIndex, qpaIndex + QPA_PHRASE.length)}
                        </Link>
                        {point.claim.slice(qpaIndex + QPA_PHRASE.length)}
                      </>
                    ) : (
                      point.claim
                    )}
                  </dd>
                  <dd className={`${textStyles.meta} mt-3`}>
                    {point.source}. As of {point.asOf}.
                  </dd>
                </div>
              );
            })}
          </dl>
          <p className={`${textStyles.body} mt-8 prose-measure`}>
            See the full{" "}
            <Link
              className={textStyles.textLink}
              href="/resources/sydra-idr-win-rate-award-benchmark"
            >
              IDR win rate and award benchmark
            </Link>{" "}
            for every figure, sourced and dated.             For dated regulatory notes and
            sourcing reminders, see the{" "}
            <Link
              className={textStyles.textLink}
              href="/resources/updates/cms-2026-idr-final-rule"
            >
              CMS May 2026 final rule update
            </Link>
            {" "}
            ($15 fee and batching), the{" "}
            <Link
              className={textStyles.textLink}
              href="/resources/updates/cms-federal-idr-puf-benchmarks"
            >
              CMS Federal IDR PUF update
            </Link>
            , or the{" "}
            <Link
              className={textStyles.textLink}
              href="/resources/updates/may-2026-idr-operations-rule"
            >
              May 2026 operations rule update
            </Link>
            .
          </p>
          <p className={`${textStyles.meta} mt-8 prose-measure`}>{DISCLAIMER}</p>
        </Section>

        <Section tone="neutral">
          <h2 className={textStyles.sectionTitle}>Guides.</h2>
          <p className={`${textStyles.body} mt-3 prose-measure`}>
            How the federal IDR process works for surgical practices.
          </p>
          <div className="mt-6">
            <EntityLinks links={guideLinks} title="How-to guides" />
          </div>
        </Section>

        <Section tone="white">
          <EntityFaq items={IDR_HUB_FAQS} />
        </Section>

        <Section tone="neutral">
          <RegulatoryAsOf />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
