import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
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
  SYDRA_VS_ATTORNEY_CTA_LEAD,
  SYDRA_VS_ATTORNEY_FAQS,
  SYDRA_VS_ATTORNEY_HERO,
  SYDRA_VS_ATTORNEY_SECTIONS,
} from "@/lib/content/sydra-vs-attorney-page";
import { faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.sydraVsAttorney;

function SydraVsAttorneyJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.sydraVsAttorney]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/sydra-vs-idr-attorney",
            name: "Sydra vs an IDR attorney",
            description: PAGE_METADATA.sydraVsAttorney.description ?? "",
          }),
          serviceJsonLd({
            name: "Sydra IDR software versus IDR attorney comparison",
            description:
              "A comparison of running federal IDR on Sydra software versus paying an IDR attorney a contingency fee on out of network surgical claims.",
            serviceType: "Healthcare billing software",
          }),
          faqPageJsonLd(SYDRA_VS_ATTORNEY_FAQS),
        ]}
      />
    </>
  );
}

export default function SydraVsAttorneyPage() {
  return (
    <>
      <SydraVsAttorneyJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.sydraVsAttorney]}>
        <Section ariaLabelledby="heading-sydra-vs-attorney" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-sydra-vs-attorney">
              {SYDRA_VS_ATTORNEY_HERO.title}
              <span className={textStyles.pageSubtitle}>{SYDRA_VS_ATTORNEY_HERO.subtitle}</span>
            </h1>
            <p className={textStyles.pageLead}>{SYDRA_VS_ATTORNEY_HERO.lead}</p>
          </header>
        </Section>

        <Section ariaLabelledby="heading-fee-math" sidebarLabel="The fee math" tone="neutral">
          <h2 className={textStyles.sectionTitle} id="heading-fee-math">
            What a 20 percent attorney would take.
          </h2>
          <p className={`${textStyles.bodyMeasure} mt-4`}>
            Drag the sliders to match your practice. The estimate uses published CMS win rates and
            Georgetown CHIR award benchmarks, not a Sydra performance claim.
          </p>
          <div className="mt-10 border-t border-rule pt-10">
            <RecoveryCalculator ctaHref="/demo" ctaLabel="Schedule a demo for your numbers" />
          </div>
        </Section>

        <Section tone="white">
          <div className="space-y-14">
            {SYDRA_VS_ATTORNEY_SECTIONS.map((section) => (
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
            <p className={`${textStyles.body} mb-6`}>{SYDRA_VS_ATTORNEY_CTA_LEAD}</p>
            <Button href="/demo" showArrow>
              Schedule a demo
            </Button>
            <CtaTrustSignals className="mt-4" />
            <p className={`${textStyles.body} mt-8`}>
              Related reading:{" "}
              <Link className={textStyles.textLink} href="/resources/idr-attorney-vs-software">
                IDR attorney vs software, in depth
              </Link>
              .
            </p>
          </div>
          <ServiceFaqSection
            heading="Questions about cost and control"
            id="heading-sydra-vs-attorney-faq"
            items={SYDRA_VS_ATTORNEY_FAQS}
          />
          <ServiceCrossLinks current="/sydra-vs-idr-attorney" />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
