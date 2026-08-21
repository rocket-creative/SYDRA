import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { LegalFooter } from "@/components/idr/legal-footer";
import { ConversionCtaPair } from "@/components/landing/conversion-cta-pair";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CmsRuleBatchingVideo } from "@/components/sydra/cms-rule-batching-video";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { RegulatoryAsOf } from "@/components/sydra/regulatory-as-of";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { CTA } from "@/lib/idr/copy";
import {
  CMS_RULE_BATCHING_VIDEO,
  getCmsRuleBatchingVideoUrl,
} from "@/lib/content/videos/cms-rule-batching";
import { getGuide } from "@/lib/idr/guides";
import {
  articleJsonLd,
  drAbrahamsPersonJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  videoObjectJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const dynamicParams = true;
export const revalidate = 86400;

/**
 * Guide slugs whose topic is already owned by a primary page. They stay live and
 * cross-linked, but defer their canonical to that page so the two do not compete
 * for the same query (playbook section 7.3).
 *
 * The NSA-IDR guide was de-cannibalized: it now owns the narrow "no surprises act
 * IDR" regulatory-mechanics query while /what-is-idr stays the definitional
 * pillar, so it self-canonicalizes and is no longer listed here.
 */
const CANONICAL_OVERRIDES: Record<string, string> = {};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    return { title: "Not found | Sydra", robots: { index: false, follow: false } };
  }
  const canonicalPath = CANONICAL_OVERRIDES[slug];
  return buildPageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/idr/guide/${slug}`,
    ...(canonicalPath ? { canonicalPath } : {}),
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/idr/guide/${slug}`;
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Federal IDR", path: "/idr" },
    { name: guide.title.replace(/\.$/, ""), path },
  ];
  const isBatchingGuide = slug === "idr-batching-claims";
  const batchingVideoUrl = isBatchingGuide ? getCmsRuleBatchingVideoUrl() : undefined;

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          drAbrahamsPersonJsonLd(),
          webPageJsonLd({
            path,
            name: guide.title.replace(/\.$/, ""),
            description: guide.metaDescription,
            reviewedBy: true,
          }),
          articleJsonLd({
            path,
            headline: guide.title.replace(/\.$/, ""),
            description: guide.metaDescription,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            reviewedBy: true,
          }),
          ...(guide.howToSteps
            ? [
                howToJsonLd({
                  path,
                  name: guide.title.replace(/\.$/, ""),
                  description: guide.metaDescription,
                  steps: guide.howToSteps,
                }),
              ]
            : []),
          ...(isBatchingGuide
            ? [
                videoObjectJsonLd({
                  path,
                  name: CMS_RULE_BATCHING_VIDEO.name,
                  description: CMS_RULE_BATCHING_VIDEO.description,
                  uploadDate: CMS_RULE_BATCHING_VIDEO.uploadDate,
                  transcript: CMS_RULE_BATCHING_VIDEO.transcript,
                  durationSeconds: CMS_RULE_BATCHING_VIDEO.durationSeconds,
                  ...(batchingVideoUrl
                    ? { embedUrl: batchingVideoUrl, contentUrl: batchingVideoUrl }
                    : {}),
                }),
              ]
            : []),
          faqPageJsonLd(guide.faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="Federal IDR · Guide"
            title={guide.title}
            subtitle="A guide for surgical billing teams."
            lead={guide.lead.split("\n\n")}
          />
          <div className="mt-8">
            <ConversionCtaPair placement="idr-guide" showSupportingLine={false} />
          </div>
          {isBatchingGuide ? <RegulatoryAsOf className="mt-6" /> : null}
          {guide.crossLink ? (
            <p className={`${textStyles.meta} mt-6`}>
              {guide.crossLink.intro}{" "}
              <Link className={textStyles.textLink} href={guide.crossLink.href}>
                {guide.crossLink.anchor}
              </Link>
              .
            </p>
          ) : null}
          {slug === "qualifying-payment-amount-explained" ? (
            <p className={`${textStyles.meta} mt-6`}>
              For the short definition, see{" "}
              <Link className={textStyles.textLink} href="/glossary#qpa">
                QPA in the glossary
              </Link>
              .
            </p>
          ) : null}
          {slug === "open-negotiation-explained" ? (
            <p className={`${textStyles.meta} mt-6`}>
              For the short definition, see{" "}
              <Link className={textStyles.textLink} href="/glossary#open-negotiation">
                open negotiation in the glossary
              </Link>
              .
            </p>
          ) : null}
        </Section>

        <Section tone="neutral">
          <div className="space-y-14">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className={textStyles.sectionTitle}>{section.heading}</h2>
                <div className={`${textStyles.bodyStack} mt-4`}>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Section>

        <Section tone="white">
          {isBatchingGuide ? <CmsRuleBatchingVideo className="mb-14" /> : null}
          <EntityFaq items={guide.faqs} />
          <LegalFooter className="mt-10" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <Section ariaLabelledby="heading-cta-band" tone="hero">
          <div className="prose-measure">
            <h2 className="type-h2 text-white" id="heading-cta-band">
              Ready to see Sydra on a real denied claim?
            </h2>
            <p className="prose-measure mt-6 type-body text-white/85">{CTA}</p>
            <div className="mt-10">
              <ConversionCtaPair
                onDark
                placement="idr-guide"
                showSupportingLine={false}
              />
            </div>
          </div>
        </Section>
      </SydraPageShell>
    </>
  );
}
