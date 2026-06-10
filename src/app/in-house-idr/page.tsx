import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { LaborCalculator } from "@/components/sydra/labor-calculator";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import {
  IN_HOUSE_IDR_CTA_LEAD,
  IN_HOUSE_IDR_FAQS,
  IN_HOUSE_IDR_HERO,
  IN_HOUSE_IDR_SECTIONS,
} from "@/lib/content/in-house-idr-page";
import { faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.inHouseIdr;

function InHouseIdrJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.inHouseIdr]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/in-house-idr",
            name: "In house IDR, without the headcount.",
            description: PAGE_METADATA.inHouseIdr.description ?? "",
          }),
          serviceJsonLd({
            name: "Sydra in house federal IDR software",
            description:
              "Software that lets a billing team prepare and submit federal IDR disputes in house in about five minutes per claim, adding capacity without adding staff.",
            serviceType: "Healthcare billing software",
          }),
          faqPageJsonLd(IN_HOUSE_IDR_FAQS),
        ]}
      />
    </>
  );
}

export default function InHouseIdrPage() {
  return (
    <>
      <InHouseIdrJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.inHouseIdr]}>
        <Section ariaLabelledby="heading-in-house-idr" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-in-house-idr">
              {IN_HOUSE_IDR_HERO.title}
              <span className={textStyles.pageSubtitle}>{IN_HOUSE_IDR_HERO.subtitle}</span>
            </h1>
            <p className={textStyles.pageLead}>{IN_HOUSE_IDR_HERO.lead}</p>
          </header>
        </Section>

        <Section ariaLabelledby="heading-labor-math" sidebarLabel="Your team's time" tone="neutral">
          <h2 className={textStyles.sectionTitle} id="heading-labor-math">
            What building submissions by hand costs you.
          </h2>
          <p className={`${textStyles.bodyMeasure} mt-4`}>
            Drag the sliders to match your practice. This is labor time, framed as the capacity you
            get back, not a Sydra performance claim.
          </p>
          <div className="mt-10 border-t border-rule pt-10">
            <LaborCalculator ctaHref="/demo" ctaLabel="Schedule a demo for your numbers" />
          </div>
        </Section>

        <Section tone="white">
          <div className="space-y-14">
            {IN_HOUSE_IDR_SECTIONS.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className={textStyles.sectionTitle} id={section.id}>
                  {section.title}
                </h2>
                <div className={`${textStyles.bodyStack} mt-4`}>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <p className={`${textStyles.body} mb-6`}>{IN_HOUSE_IDR_CTA_LEAD}</p>
            <Button href="/demo" showArrow>
              Schedule a demo
            </Button>
            <CtaTrustSignals className="mt-4" />
            <p className={`${textStyles.body} mt-8`}>
              See the full workflow:{" "}
              <Link className={textStyles.textLink} href="/how-it-works">
                how Sydra prepares a submission
              </Link>
              .
            </p>
          </div>
          <ServiceFaqSection
            heading="Questions about running it in house"
            id="heading-in-house-idr-faq"
            items={IN_HOUSE_IDR_FAQS}
          />
          <ServiceCrossLinks current="/in-house-idr" />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
