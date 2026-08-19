import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import { caseReviewUrl } from "@/lib/case-review";
import { RESOURCE_ARTICLES } from "@/lib/content/resources/articles";
import { EDITORIAL } from "@/lib/images";
import { itemListJsonLd, medicallyReviewedWebPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.resources;

function ResourcesJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.resources]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
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
      <SydraPageShell
        banded
        breadcrumb={[...BREADCRUMBS.resources]}
        stickyCtaHref={caseReviewUrl("resources-sticky")}
      >
        <Section ariaLabelledby="heading-resources" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-resources">
              Federal IDR and No Surprises Act resources.
              <span className={textStyles.pageSubtitle}>
                Written for billing teams, not patients.
              </span>
            </h1>
            <p className={textStyles.pageLead}>
              IDR is a process problem, not a legal mystery. The rules are published. The deadlines
              are fixed. The determinations are searchable. These pages cover how the process works,
              what qualifies a claim, what the federal record shows about recovery, and how the No
              Surprises Act changed out of network payment.
            </p>
          </header>
          <EditorialImage
            aspect="3/2"
            asset={EDITORIAL.billerKeyboardDashboard}
            className="mt-10"
            eager
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </Section>

        <Section sidebarLabel="Guides" tone="neutral">
          <ul className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2">
            {RESOURCE_ARTICLES.map((article) => (
              <li key={article.slug} className="bg-white">
                <Link
                  className="group flex h-full min-w-0 flex-col gap-3 p-5 transition-colors hover:bg-neutral-section focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:p-9"
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
            {RESOURCE_ARTICLES.length % 2 === 1 ? (
              <li aria-hidden="true" className="hidden bg-white sm:block" />
            ) : null}
          </ul>
        </Section>

        <Section tone="white">
          <div className="prose-measure space-y-8">
            <div>
              <h2 className={textStyles.sectionTitle}>Resource updates.</h2>
              <p className={`${textStyles.body} mt-3`}>
                Short, dated notes on federal IDR process changes and sourcing reminders. Each update
                links back to the evergreen guide or hub page.{" "}
                <Link className={textStyles.textLink} href="/resources/updates">
                  Browse updates
                </Link>
                .
              </p>
            </div>
            <div>
              <h2 className={textStyles.sectionTitle}>Federal IDR benchmarks and guides.</h2>
              <p className={`${textStyles.body} mt-3`}>
                Browse payment benchmarks, eligibility, and dispute outcomes by CPT code, state, and
                payer on the{" "}
                <Link className={textStyles.textLink} href="/idr">
                  Federal IDR hub
                </Link>
                , read the full set of{" "}
                <Link className={textStyles.textLink} href="/idr/guide">
                  step by step IDR guides
                </Link>
                , or look up terms in the{" "}
                <Link className={textStyles.textLink} href="/glossary">
                  IDR glossary
                </Link>
                .
              </p>
            </div>
          </div>
        </Section>

        <SydraCtaBand />

        <Section tone="white">
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
