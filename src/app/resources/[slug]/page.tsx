import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { articleBreadcrumb, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  getArticleBySlug,
  RESOURCE_SLUGS,
  type ResourceArticle,
} from "@/lib/content/resources/articles";
import { articleJsonLd, faqPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return RESOURCE_SLUGS.map((slug) => ({ slug }));
}

function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return buildPageMetadata({
      title: "Resource not found | Sydra",
      description: "The requested resource could not be found.",
      path: `/resources/${slug}`,
      robots: { index: false, follow: true },
    });
  }
  return buildPageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/resources/${article.slug}`,
  });
}

function RelatedGuides({ article }: { article: ResourceArticle }) {
  const related = article.related
    .map((slug) => getArticleBySlug(slug))
    .filter((item): item is ResourceArticle => Boolean(item));

  if (related.length === 0) return null;

  return (
    <nav aria-label="Related guides" className="prose-measure mt-16 border-t border-rule pt-10">
      <h2 className={textStyles.subsectionTitle}>Keep reading</h2>
      <ul className="mt-4 space-y-3">
        {related.map((item) => (
          <li key={item.slug}>
            <Link className={textStyles.textLink} href={`/resources/${item.slug}`}>
              {item.title.replace(/\.$/, "")}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const crumbs = articleBreadcrumb(article.title.replace(/\.$/, ""), article.slug);

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          articleJsonLd({
            path: `/resources/${article.slug}`,
            headline: article.title.replace(/\.$/, ""),
            description: article.metaDescription,
            datePublished: article.datePublished,
            dateModified: article.dateModified,
          }),
          faqPageJsonLd(article.faqs),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section ariaLabelledby="heading-article" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-article">
              {article.title}
              <span className={textStyles.pageSubtitle}>{article.subtitle}</span>
            </h1>
            <p className={textStyles.pageLead}>{article.lead}</p>
            <p className="type-caption mt-6 text-body">
              Published{" "}
              <time dateTime={article.datePublished}>
                {formatArticleDate(article.datePublished)}
              </time>
              {article.dateModified && article.dateModified !== article.datePublished ? (
                <>
                  {" · "}Last updated{" "}
                  <time dateTime={article.dateModified}>
                    {formatArticleDate(article.dateModified)}
                  </time>
                </>
              ) : null}
            </p>
            <div className="mt-8">
              <Button href="/demo" showArrow>
                Schedule a demo
              </Button>
            </div>
          </header>
        </Section>

        <Section tone="neutral">
          <div className="space-y-14">
            {article.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className={textStyles.sectionTitle} id={section.id}>
                  {section.heading}
                </h2>
                <div className={`${textStyles.bodyStack} mt-4`}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
                {section.list ? (
                  <ul className={textStyles.list}>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Section>

        <Section ariaLabelledby="heading-article-faq" tone="white">
          <h2 className={textStyles.sectionTitle} id="heading-article-faq">
            Common questions.
          </h2>
          <div className="mt-6 max-w-2xl divide-y divide-[var(--color-rule)] border-y border-rule">
            {article.faqs.map((item) => (
              <details key={item.q} className="group py-0">
                <summary className="cursor-pointer list-none py-6 text-left text-base font-normal text-brand md:text-[17px] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-6">
                    {item.q}
                    <span
                      aria-hidden
                      className="type-caption shrink-0 text-body transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-rule pb-6 pt-2 text-[15px] leading-relaxed text-body">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Section>

        <SydraCtaBand />

        <Section tone="white">
          <RelatedGuides article={article} />
          <ServiceCrossLinks current="/resources" />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
