import Link from "next/link";

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
  IDR_RECOVERY_CALCULATOR_CTA_LEAD,
  IDR_RECOVERY_CALCULATOR_FAQS,
  IDR_RECOVERY_CALCULATOR_HERO,
  IDR_RECOVERY_CALCULATOR_SECTIONS,
} from "@/lib/content/idr-recovery-calculator-page";
import {
  faqPageJsonLd,
  medicallyReviewedWebPageJsonLd,
  webApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.idrRecoveryCalculator;

function CalculatorJsonLd() {
  const description = PAGE_METADATA.idrRecoveryCalculator.description ?? "";
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.idrRecoveryCalculator]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/idr-recovery-calculator",
            name: IDR_RECOVERY_CALCULATOR_HERO.title,
            description,
          }),
          webApplicationJsonLd({
            path: "/idr-recovery-calculator",
            name: "Free IDR Recovery Calculator",
            description,
          }),
          faqPageJsonLd(IDR_RECOVERY_CALCULATOR_FAQS),
        ]}
      />
    </>
  );
}

export default function IdrRecoveryCalculatorPage() {
  const [howCalculated, whatItDoesNotTell] = IDR_RECOVERY_CALCULATOR_SECTIONS;

  return (
    <>
      <CalculatorJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.idrRecoveryCalculator]}>
        <Section ariaLabelledby="heading-recovery-calculator" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-recovery-calculator">
              {IDR_RECOVERY_CALCULATOR_HERO.title}
            </h1>
            <p className={textStyles.pageLead}>{IDR_RECOVERY_CALCULATOR_HERO.lead}</p>
            <div className="mt-8">
              <Button href="/demo" showArrow>
                Schedule a demo
              </Button>
              <CtaTrustSignals className="mt-4" />
            </div>
          </header>
        </Section>

        <Section ariaLabelledby="heading-calculator-tool" sidebarLabel="Estimate" tone="neutral">
          <h2 className="sr-only" id="heading-calculator-tool">
            Recovery estimate tool
          </h2>
          <RecoveryCalculator ctaHref="/demo" ctaLabel="Schedule a demo" />
        </Section>

        <Section tone="white">
          <div className="space-y-14">
            <section aria-labelledby={howCalculated.id}>
              <h2 className={textStyles.sectionTitle} id={howCalculated.id}>
                {howCalculated.title}
              </h2>
              <div className={`${textStyles.bodyStack} mt-4`}>
                {howCalculated.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby={whatItDoesNotTell.id}>
              <h2 className={textStyles.sectionTitle} id={whatItDoesNotTell.id}>
                {whatItDoesNotTell.title}
              </h2>
              <div className={`${textStyles.bodyStack} mt-4`}>
                {whatItDoesNotTell.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                <p>
                  See specialty and payer context on the{" "}
                  <Link className={textStyles.textLink} href="/idr">
                    Federal IDR hub
                  </Link>
                  .
                </p>
              </div>
            </section>
          </div>
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <h2 className={textStyles.sectionTitle} id="heading-calculator-cta">
              {IDR_RECOVERY_CALCULATOR_CTA_LEAD}
            </h2>
            <p className={`${textStyles.body} mt-4 mb-6`}>
              Free 15 minute demo. We look at your actual specialty, state, and payer mix.
            </p>
            <Button href="/demo" showArrow>
              Schedule a demo
            </Button>
            <CtaTrustSignals className="mt-4" />
            <p className={`${textStyles.body} mt-8`}>
              Related:{" "}
              <Link className={textStyles.textLink} href="/sydra-vs-idr-attorney">
                Sydra vs an IDR attorney
              </Link>
              ,{" "}
              <Link className={textStyles.textLink} href="/resources/idr-win-rates-and-awards">
                IDR win rates and awards
              </Link>
              .
            </p>
          </div>
          <ServiceFaqSection
            className="mt-16"
            heading="Questions about this estimate"
            id="heading-calculator-faq"
            items={IDR_RECOVERY_CALCULATOR_FAQS}
          />
          <ServiceCrossLinks current="/idr-recovery-calculator" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
