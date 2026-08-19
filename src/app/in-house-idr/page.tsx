import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { DualPageCta } from "@/components/sydra/dual-page-cta";
import { FullServiceBanner } from "@/components/sydra/full-service-banner";
import { LaborCalculator } from "@/components/sydra/labor-calculator";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import { caseReviewUrl } from "@/lib/case-review";
import {
  IN_HOUSE_IDR_FAQS,
  IN_HOUSE_IDR_HERO,
  IN_HOUSE_IDR_SECTIONS,
} from "@/lib/content/in-house-idr-page";
import { EDITORIAL } from "@/lib/images";
import {
  faqPageJsonLd,
  medicallyReviewedWebPageJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.inHouseIdr;

function InHouseIdrJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.inHouseIdr]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
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
      <SydraPageShell
        banded
        breadcrumb={[...BREADCRUMBS.inHouseIdr]}
        stickyCtaHref={caseReviewUrl("in-house-idr-sticky")}
      >
        <Section ariaLabelledby="heading-in-house-idr" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-in-house-idr">
              {IN_HOUSE_IDR_HERO.title}
              <span className={textStyles.pageSubtitle}>{IN_HOUSE_IDR_HERO.subtitle}</span>
            </h1>
            <p className={textStyles.pageLead}>{IN_HOUSE_IDR_HERO.lead}</p>
          </header>
          <EditorialImage
            aspect="16/9"
            asset={EDITORIAL.billerStandingDesk}
            className="mt-10"
            eager
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
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
            <LaborCalculator ctaHref="/case-review" ctaLabel="See what one denied claim is worth" />
            <p className={`${textStyles.bodyMeasure} mt-6`}>
              Prefer recovery math instead of labor time?{" "}
              <Link className={textStyles.textLink} href="/idr-recovery-calculator">
                Open the full calculator
              </Link>
              .
            </p>
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

        {/*
          The whole page argues for keeping the work in house, so the reader who
          concludes they would rather not needs the alternative named here.
        */}
        <FullServiceBanner variant="subtle" />

        <Section tone="neutral">
          <div className="prose-measure">
            <DualPageCta />
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
            className="mt-16"
            heading="Questions about running it in house"
            id="heading-in-house-idr-faq"
            items={IN_HOUSE_IDR_FAQS}
          />
          <ServiceCrossLinks current="/in-house-idr" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
