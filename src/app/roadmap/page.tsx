import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { ROADMAP_FAQ, ROADMAP_HERO, ROADMAP_ITEMS } from "@/lib/content/roadmap-page";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.roadmap;

function pageTitle(): string {
  const meta = PAGE_METADATA.roadmap;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Sydra Roadmap";
}

function RoadmapPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.roadmap]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/roadmap",
            name: pageTitle(),
            description: PAGE_METADATA.roadmap.description ?? "",
          }),
          faqPageJsonLd(ROADMAP_FAQ),
        ]}
      />
    </>
  );
}

export default function RoadmapPage() {
  return (
    <>
      <RoadmapPageJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.roadmap]}>
        <Section ariaLabelledby="heading-roadmap" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-roadmap">
              {ROADMAP_HERO.title}
            </h1>
            <p className={textStyles.pageLead}>{ROADMAP_HERO.intro}</p>
          </header>
        </Section>

        {ROADMAP_ITEMS.map((item, index) => (
          <Section
            key={item.id}
            ariaLabelledby={item.id}
            tone={index % 2 === 0 ? "neutral" : "white"}
          >
            <section aria-labelledby={item.id} className="prose-measure">
              <h2 className={textStyles.sectionTitle} id={item.id}>
                {item.title}
              </h2>
              <p className={`${textStyles.body} mt-4`}>{item.body}</p>
            </section>
          </Section>
        ))}

        <Section tone="neutral">
          <ServiceFaqSection
            heading="Roadmap FAQ"
            id="heading-roadmap-faq"
            items={ROADMAP_FAQ}
          />
        </Section>

        <SydraCtaBand />

        <Section tone="white">
          <ServiceCrossLinks current="/roadmap" />
          <SourcesReferences />
        </Section>
      </SydraPageShell>
    </>
  );
}
