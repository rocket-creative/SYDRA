import Link from "next/link";

import { HeroProofStack } from "@/components/landing/hero-proof-stack";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { RecoveryCalculator } from "@/components/sydra/recovery-calculator";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import {
  IDR_FOR_BILLING_CTA_BAND,
  IDR_FOR_BILLING_CTA_LEAD,
  IDR_FOR_BILLING_FAQS,
  IDR_FOR_BILLING_HERO,
  IDR_FOR_BILLING_SECTIONS,
  IDR_FOR_BILLING_STATS,
  IDR_FOR_BILLING_VOLUME_SECTION,
} from "@/lib/content/idr-for-billing-companies-page";
import {
  faqPageJsonLd,
  medicallyReviewedWebPageJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.idrForBillingCompanies;

function IdrForBillingCompaniesJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.idrForBillingCompanies]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/idr-for-billing-companies",
            name: IDR_FOR_BILLING_HERO.title,
            description: PAGE_METADATA.idrForBillingCompanies.description ?? "",
          }),
          serviceJsonLd({
            name: "Federal IDR for multi practice billing organizations",
            description:
              "Software that prepares specialty coded federal IDR submissions for billing companies and RCM firms, with per practice tenant isolation at the data layer.",
            serviceType: "Healthcare billing software",
          }),
          faqPageJsonLd(IDR_FOR_BILLING_FAQS),
        ]}
      />
    </>
  );
}

export default function IdrForBillingCompaniesPage() {
  return (
    <>
      <IdrForBillingCompaniesJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.idrForBillingCompanies]}>
        <Section ariaLabelledby="heading-idr-for-billing" tone="white">
          <header className="prose-measure">
            <p className="type-caption mb-4 uppercase tracking-[0.12em] text-body/70">
              {IDR_FOR_BILLING_HERO.eyebrow}
            </p>
            <h1 className={textStyles.pageTitle} id="heading-idr-for-billing">
              {IDR_FOR_BILLING_HERO.title}
            </h1>
            <p className={textStyles.pageLead}>{IDR_FOR_BILLING_HERO.lead}</p>
            <div className="mt-8">
              <Button href={IDR_FOR_BILLING_HERO.ctaHref} showArrow>
                {IDR_FOR_BILLING_HERO.ctaLabel}
              </Button>
              <CtaTrustSignals className="mt-4" />
            </div>
          </header>
          <HeroProofStack className="mt-12" items={[...IDR_FOR_BILLING_STATS]} />
        </Section>

        <Section ariaLabelledby={IDR_FOR_BILLING_VOLUME_SECTION.id} tone="neutral">
          <h2 className={textStyles.sectionTitle} id={IDR_FOR_BILLING_VOLUME_SECTION.id}>
            {IDR_FOR_BILLING_VOLUME_SECTION.title}
          </h2>
          <div className={`${textStyles.bodyStack} mt-4`}>
            {IDR_FOR_BILLING_VOLUME_SECTION.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Section>

        <Section ariaLabelledby="heading-recovery-math" sidebarLabel="The fee math" tone="white">
          <h2 className={textStyles.sectionTitle} id="heading-recovery-math">
            What recovery looks like at your volume.
          </h2>
          <p className={`${textStyles.bodyMeasure} mt-4`}>
            Drag the sliders to match a client practice or your book. The estimate uses published
            CMS win rates and Georgetown CHIR award benchmarks, not a Sydra performance claim.
          </p>
          <div className="mt-10 border-t border-rule pt-10">
            <RecoveryCalculator ctaHref="/demo" ctaLabel="Schedule a demo" />
            <p className={`${textStyles.bodyMeasure} mt-6`}>
              <Link className={textStyles.textLink} href="/idr-recovery-calculator">
                Open the full calculator
              </Link>
            </p>
          </div>
        </Section>

        <Section tone="neutral">
          <div className="space-y-14">
            {IDR_FOR_BILLING_SECTIONS.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className={textStyles.sectionTitle} id={section.id}>
                  {section.title}
                </h2>
                <div className={`${textStyles.bodyStack} mt-4`}>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                {section.list ? (
                  <ul className={textStyles.listNone}>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 40)}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.id === "heading-tenant-isolation" ? (
                  <p className={`${textStyles.bodyMeasure} mt-4`}>
                    Full details:{" "}
                    <Link className={textStyles.textLink} href="/security">
                      Sydra security and HIPAA controls
                    </Link>
                    .
                  </p>
                ) : null}
              </section>
            ))}
          </div>
        </Section>

        <Section tone="white">
          <div className="prose-measure">
            <p className={`${textStyles.body} mb-6`}>{IDR_FOR_BILLING_CTA_LEAD}</p>
            <Button href="/demo" showArrow>
              {IDR_FOR_BILLING_HERO.ctaLabel}
            </Button>
            <CtaTrustSignals className="mt-4" />
            <p className={`${textStyles.body} mt-8`}>
              Also see{" "}
              <Link className={textStyles.textLink} href="/faq#heading-billing-faq">
                billing company FAQs
              </Link>
              ,{" "}
              <Link className={textStyles.textLink} href="/in-house-idr">
                running IDR in house
              </Link>
              , and{" "}
              <Link className={textStyles.textLink} href="/sydra-vs-idr-attorney">
                Sydra vs an IDR attorney
              </Link>
              .
            </p>
          </div>
          <ServiceFaqSection
            className="mt-16"
            heading="Questions billing companies ask first"
            id="heading-idr-for-billing-faq"
            items={IDR_FOR_BILLING_FAQS}
          />
          <ServiceCrossLinks current="/idr-for-billing-companies" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand
          ctaLabel={IDR_FOR_BILLING_CTA_BAND.ctaLabel}
          lead={IDR_FOR_BILLING_CTA_BAND.lead}
          title={IDR_FOR_BILLING_CTA_BAND.title}
        />
      </SydraPageShell>
    </>
  );
}
