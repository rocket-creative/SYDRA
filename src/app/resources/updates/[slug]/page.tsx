import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CmsRuleBatchingVideo } from "@/components/sydra/cms-rule-batching-video";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell, updateBreadcrumb } from "@/components/sydra/page-shell";
import { RegulatoryAsOf } from "@/components/sydra/regulatory-as-of";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  getUpdateBySlug,
  RESOURCE_UPDATE_SLUGS,
  type ResourceUpdate,
} from "@/lib/content/resources/updates";
import {
  CMS_RULE_BATCHING_VIDEO,
  getCmsRuleBatchingVideoUrl,
} from "@/lib/content/videos/cms-rule-batching";
import {
  articleJsonLd,
  drAbrahamsPersonJsonLd,
  newsArticleJsonLd,
  videoObjectJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return RESOURCE_UPDATE_SLUGS.map((slug) => ({ slug }));
}

function formatUpdateDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);
  if (!update) {
    return buildPageMetadata({
      title: "Update not found | Sydra",
      description: "The requested update could not be found.",
      path: `/resources/updates/${slug}`,
      robots: { index: false, follow: true },
    });
  }
  return buildPageMetadata({
    title: update.metaTitle,
    description: update.metaDescription,
    path: `/resources/updates/${update.slug}`,
    article: {
      publishedTime: update.datePublished,
      modifiedTime: update.dateModified ?? update.datePublished,
    },
  });
}

function RelatedEvergreen({ update }: { update: ResourceUpdate }) {
  if (update.relatedLinks.length === 0) return null;

  return (
    <nav aria-label="Related evergreen pages" className="prose-measure mt-16 border-t border-rule pt-10">
      <h2 className={textStyles.subsectionTitle}>Read the evergreen pages</h2>
      <ul className="mt-4 space-y-3">
        {update.relatedLinks.map((link) => (
          <li key={link.href}>
            <Link className={textStyles.textLink} href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function ResourceUpdatePage({ params }: PageProps) {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);

  if (!update) {
    notFound();
  }

  const crumbs = updateBreadcrumb(update.title.replace(/\.$/, ""), update.slug);
  const path = `/resources/updates/${update.slug}`;
  const isFinalRuleUpdate = update.slug === "cms-2026-idr-final-rule";
  const isNewsUpdate =
    isFinalRuleUpdate || update.slug === "may-2026-idr-operations-rule";
  const batchingVideoUrl = isFinalRuleUpdate ? getCmsRuleBatchingVideoUrl() : undefined;
  const articleNode = isNewsUpdate
    ? newsArticleJsonLd({
        path,
        headline: update.title.replace(/\.$/, ""),
        description: update.metaDescription,
        datePublished: update.datePublished,
        dateModified: update.dateModified,
        reviewedBy: true,
      })
    : articleJsonLd({
        path,
        headline: update.title.replace(/\.$/, ""),
        description: update.metaDescription,
        datePublished: update.datePublished,
        dateModified: update.dateModified,
        reviewedBy: true,
      });

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          drAbrahamsPersonJsonLd(),
          articleNode,
          ...(isFinalRuleUpdate
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
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section ariaLabelledby="heading-update" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-update">
              {update.title}
              <span className={textStyles.pageSubtitle}>{update.subtitle}</span>
            </h1>
            <p className={textStyles.pageLead}>{update.lead}</p>
            <p className="type-caption mt-6 text-body">
              Published{" "}
              <time dateTime={update.datePublished}>
                {formatUpdateDate(update.datePublished)}
              </time>
              {update.dateModified && update.dateModified !== update.datePublished ? (
                <>
                  {" · "}Last updated{" "}
                  <time dateTime={update.dateModified}>
                    {formatUpdateDate(update.dateModified)}
                  </time>
                </>
              ) : null}
            </p>
            {isFinalRuleUpdate ? <RegulatoryAsOf className="mt-4" /> : null}
            <div className="mt-8">
              <Button href="/demo" showArrow>
                Schedule a demo
              </Button>
            </div>
          </header>
        </Section>

        <Section tone="neutral">
          <div className="space-y-14">
            {update.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className={textStyles.sectionTitle} id={section.id}>
                  {section.heading}
                </h2>
                <div className={`${textStyles.bodyStack} mt-4`}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          {isFinalRuleUpdate ? <CmsRuleBatchingVideo className="mt-14" /> : null}
        </Section>

        <SydraCtaBand />

        <Section tone="white">
          <RelatedEvergreen update={update} />
          <p className={`${textStyles.bodyMeasure} mt-10`}>
            <Link className={textStyles.textLink} href="/resources/updates">
              Back to all updates
            </Link>
            {" · "}
            <Link className={textStyles.textLink} href="/resources">
              Resources hub
            </Link>
          </p>
          <ServiceCrossLinks current="/resources/updates" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
