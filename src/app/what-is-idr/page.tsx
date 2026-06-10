import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import {
  WHAT_IS_IDR_CTA_LEAD,
  WHAT_IS_IDR_FAQS,
  WHAT_IS_IDR_HERO,
  WHAT_IS_IDR_SECTIONS,
} from "@/lib/content/what-is-idr-page";
import { faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.whatIsIdr;

function WhatIsIdrJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.whatIsIdr]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/what-is-idr",
            name: "What is federal IDR?",
            description: PAGE_METADATA.whatIsIdr.description ?? "",
          }),
          serviceJsonLd({
            name: "Federal IDR education for out of network providers",
            description:
              "An explanation of the No Surprises Act and federal independent dispute resolution for out of network surgical claims.",
            serviceType: "Healthcare billing education",
          }),
          faqPageJsonLd(WHAT_IS_IDR_FAQS),
        ]}
      />
    </>
  );
}

export default function WhatIsIdrPage() {
  return (
    <>
      <WhatIsIdrJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.whatIsIdr]}>
        <Section ariaLabelledby="heading-what-is-idr" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-what-is-idr">
              {WHAT_IS_IDR_HERO.title}
              <span className={textStyles.pageSubtitle}>{WHAT_IS_IDR_HERO.subtitle}</span>
            </h1>
            <p className={textStyles.pageLead}>{WHAT_IS_IDR_HERO.lead}</p>
          </header>
        </Section>

        <Section tone="neutral">
          <div className="space-y-14">
            {WHAT_IS_IDR_SECTIONS.map((section) => (
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
              </section>
            ))}
          </div>
        </Section>

        <Section tone="white">
          <div className="prose-measure">
            <p className={`${textStyles.body} mb-6`}>{WHAT_IS_IDR_CTA_LEAD}</p>
            <Button href="/demo" showArrow>
              Schedule a demo
            </Button>
            <CtaTrustSignals className="mt-4" />
            <p className={`${textStyles.body} mt-8`}>
              Go deeper:{" "}
              <Link className={textStyles.textLink} href="/resources/federal-idr-process">
                the full federal IDR process
              </Link>{" "}
              and{" "}
              <Link
                className={textStyles.textLink}
                href="/resources/idr-eligibility-deadlines-fees"
              >
                eligibility, deadlines, and fees
              </Link>
              .
            </p>
          </div>
          <ServiceFaqSection
            heading="Questions providers ask first"
            id="heading-what-is-idr-faq"
            items={WHAT_IS_IDR_FAQS}
          />
          <ServiceCrossLinks current="/what-is-idr" />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
