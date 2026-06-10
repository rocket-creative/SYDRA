import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { RESOURCE_ARTICLES } from "@/lib/content/resources/articles";
import { itemListJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.resources;

function ResourcesJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.resources]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/resources",
            name: "Resources — Federal IDR and No Surprises Act guides",
            description: PAGE_METADATA.resources.description ?? "",
          }),
          itemListJsonLd(
            RESOURCE_ARTICLES.map((article) => ({
              name: article.title.replace(/\.$/, ""),
              path: `/resources/${article.slug}`,
            })),
          ),
        ]}
      />
    </>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <ResourcesJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.resources]}>
        <Section ariaLabelledby="heading-resources" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-resources">
              Federal IDR and No Surprises Act resources.
              <span className={textStyles.pageSubtitle}>
                Practical guides for surgical billing teams.
              </span>
            </h1>
            <p className={textStyles.pageLead}>
              Clear, provider focused explanations of how federal independent dispute resolution
              works, what qualifies a claim, what the process recovers, and how the No Surprises Act
              changed out of network payment. Written for billing teams and practice administrators,
              not patients.
            </p>
          </header>
        </Section>

        <Section sidebarLabel="Guides" tone="neutral">
          <ul className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2">
            {RESOURCE_ARTICLES.map((article) => (
              <li key={article.slug} className="bg-white">
                <Link
                  className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-neutral-section focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:p-9"
                  href={`/resources/${article.slug}`}
                >
                  <h2 className="text-lg font-medium text-brand transition-colors group-hover:text-[var(--color-hero)]">
                    {article.title.replace(/\.$/, "")}
                  </h2>
                  <p className={textStyles.meta}>{article.excerpt}</p>
                  <span className={`${textStyles.textLink} mt-auto pt-2 text-sm`}>Read the guide</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <SydraCtaBand />

        <Section tone="white">
          <SourcesReferences />
        </Section>
      </SydraPageShell>
    </>
  );
}
