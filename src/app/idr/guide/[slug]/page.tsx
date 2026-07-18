import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EntityFaq } from "@/components/idr/entity-faq";
import { EntityHero } from "@/components/idr/entity-hero";
import { LegalFooter } from "@/components/idr/legal-footer";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { getGuide } from "@/lib/idr/guides";
import { articleJsonLd, faqPageJsonLd, howToJsonLd } from "@/lib/seo/json-ld";
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

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          articleJsonLd({
            path,
            headline: guide.title.replace(/\.$/, ""),
            description: guide.metaDescription,
            datePublished: "2026-06-01",
            dateModified: "2026-07-18",
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
          faqPageJsonLd(guide.faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section tone="white">
          <EntityHero
            eyebrow="Federal IDR · Guide"
            title={guide.title}
            subtitle="A guide for surgical billing teams."
            lead={guide.lead}
            ctaHref="/demo"
            ctaLabel="Schedule a demo"
          />
          {guide.crossLink ? (
            <p className={`${textStyles.meta} mt-6`}>
              {guide.crossLink.intro}{" "}
              <Link className={textStyles.textLink} href={guide.crossLink.href}>
                {guide.crossLink.anchor}
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
          <EntityFaq items={guide.faqs} />
          <LegalFooter className="mt-10" />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
