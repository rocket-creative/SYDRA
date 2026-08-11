import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { RESOURCE_UPDATES } from "@/lib/content/resources/updates";
import { itemListJsonLd, medicallyReviewedWebPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.resourcesUpdates;

function formatUpdateDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

function UpdatesHubJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.resourcesUpdates]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/resources/updates",
            name: "Resource updates",
            description: PAGE_METADATA.resourcesUpdates.description ?? "",
          }),
          itemListJsonLd(
            RESOURCE_UPDATES.map((update) => ({
              name: update.title.replace(/\.$/, ""),
              path: `/resources/updates/${update.slug}`,
            })),
          ),
        ]}
      />
    </>
  );
}

export default function ResourcesUpdatesPage() {
  return (
    <>
      <UpdatesHubJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.resourcesUpdates]}>
        <Section ariaLabelledby="heading-updates" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-updates">
              Resource updates.
              <span className={textStyles.pageSubtitle}>
                Short notes that point back to evergreen guides.
              </span>
            </h1>
            <p className={textStyles.pageLead}>
              Dated posts on federal IDR process changes and sourcing reminders. Each update links to
              the full guide or hub page that owns the lasting explanation. No new statistics beyond
              what already appears on Sydra.
            </p>
          </header>
        </Section>

        <Section sidebarLabel="Feed" tone="neutral">
          <ul className="divide-y divide-[var(--color-rule)] border-y border-rule">
            {RESOURCE_UPDATES.map((update) => (
              <li key={update.slug} className="py-8 md:py-10">
                <p className={textStyles.meta}>
                  <time dateTime={update.datePublished}>
                    {formatUpdateDate(update.datePublished)}
                  </time>
                </p>
                <h2 className={`${textStyles.subsectionTitle} mt-2`}>
                  <Link className="hover:text-[var(--color-hero)]" href={`/resources/updates/${update.slug}`}>
                    {update.title.replace(/\.$/, "")}
                  </Link>
                </h2>
                <p className={`${textStyles.bodyMeasure} mt-3`}>{update.excerpt}</p>
                <p className="mt-4">
                  <Link className={textStyles.textLink} href={`/resources/updates/${update.slug}`}>
                    Read the update
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="white">
          <div className="prose-measure">
            <p className={textStyles.body}>
              Looking for longer guides? Browse{" "}
              <Link className={textStyles.textLink} href="/resources">
                Resources
              </Link>{" "}
              or the{" "}
              <Link className={textStyles.textLink} href="/idr/guide">
                IDR guide library
              </Link>
              .
            </p>
          </div>
          <ServiceCrossLinks current="/resources/updates" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
