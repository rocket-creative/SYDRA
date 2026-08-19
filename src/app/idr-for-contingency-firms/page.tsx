import { Suspense } from "react";

import Link from "next/link";

import { HeroProofStack } from "@/components/landing/hero-proof-stack";
import { SharedLeadForm } from "@/components/landing/shared-lead-form";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { LaborCalculator } from "@/components/sydra/labor-calculator";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import {
  IDR_FOR_CONTINGENCY_CTA_BAND,
  IDR_FOR_CONTINGENCY_CTA_LEAD,
  IDR_FOR_CONTINGENCY_FAQS,
  IDR_FOR_CONTINGENCY_HERO,
  IDR_FOR_CONTINGENCY_SECTIONS,
  IDR_FOR_CONTINGENCY_STATS,
  IDR_FOR_CONTINGENCY_THRESHOLD_SECTION,
} from "@/lib/content/idr-for-contingency-firms-page";
import { EDITORIAL } from "@/lib/images";
import {
  faqPageJsonLd,
  medicallyReviewedWebPageJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.idrForContingencyFirms;

function IdrForContingencyFirmsJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.idrForContingencyFirms]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/idr-for-contingency-firms",
            name: IDR_FOR_CONTINGENCY_HERO.title,
            description: PAGE_METADATA.idrForContingencyFirms.description ?? "",
          }),
          serviceJsonLd({
            name: "Federal IDR automation for contingency firms",
            description:
              "Preparation layer that assembles federal IDR submissions for firms filing on behalf of client practices, raising recoveries per reviewer. Licensed per claim or by subscription, never a share of recovery.",
            serviceType: "Healthcare billing software",
          }),
          faqPageJsonLd(IDR_FOR_CONTINGENCY_FAQS),
        ]}
      />
    </>
  );
}

export default function IdrForContingencyFirmsPage() {
  return (
    <>
      <IdrForContingencyFirmsJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.idrForContingencyFirms]}>
        <Section ariaLabelledby="heading-idr-for-contingency" tone="white">
          <header className="prose-measure">
            <p className="type-caption mb-4 uppercase tracking-[0.12em] text-body/70">
              {IDR_FOR_CONTINGENCY_HERO.eyebrow}
            </p>
            <h1 className={textStyles.pageTitle} id="heading-idr-for-contingency">
              {IDR_FOR_CONTINGENCY_HERO.title}
            </h1>
            <p className={textStyles.pageLead}>{IDR_FOR_CONTINGENCY_HERO.lead}</p>
            <p className={`${textStyles.body} mt-4`}>
              <strong>{IDR_FOR_CONTINGENCY_HERO.whiteLabelBold}</strong>{" "}
              {IDR_FOR_CONTINGENCY_HERO.whiteLabelRest}
            </p>
            <div className="mt-8">
              <Button href="#contingency-lead-form" showArrow>
                {IDR_FOR_CONTINGENCY_HERO.ctaLabel}
              </Button>
              <CtaTrustSignals className="mt-4" />
            </div>
          </header>
          <EditorialImage
            aspect="16/9"
            asset={EDITORIAL.seniorPartnerDocuments}
            className="mt-10"
            eager
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <HeroProofStack className="mt-12" items={[...IDR_FOR_CONTINGENCY_STATS]} />
        </Section>

        <Section ariaLabelledby={IDR_FOR_CONTINGENCY_THRESHOLD_SECTION.id} tone="neutral">
          <h2 className={textStyles.sectionTitle} id={IDR_FOR_CONTINGENCY_THRESHOLD_SECTION.id}>
            {IDR_FOR_CONTINGENCY_THRESHOLD_SECTION.title}
          </h2>
          <div className={`${textStyles.bodyStack} mt-4`}>
            {IDR_FOR_CONTINGENCY_THRESHOLD_SECTION.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Section>

        {/*
          Labor calculator, not the recovery calculator: this reader's constraint
          is reviewer hours per dispute, and recovery volume is already their
          own number. Its CTA stays on the call rather than the claim review,
          because a firm evaluating a preparation layer is not sending us one of
          its client's EOBs for a free opinion.
        */}
        <Section ariaLabelledby="heading-reviewer-time" sidebarLabel="Reviewer time" tone="white">
          <h2 className={textStyles.sectionTitle} id="heading-reviewer-time">
            What assembly costs you per reviewer.
          </h2>
          <p className={`${textStyles.bodyMeasure} mt-4`}>
            Drag the sliders to match your team. This is reviewer labor time, framed as the capacity
            you get back, not a Sydra performance claim.
          </p>
          <div className="mt-10 border-t border-rule pt-10">
            <LaborCalculator />
          </div>
        </Section>

        <Section tone="neutral">
          <div className="space-y-14">
            {IDR_FOR_CONTINGENCY_SECTIONS.map((section) => (
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
                {section.id === "heading-firm-throughput" ? (
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

        {/*
          The form is on the page rather than behind a link to /demo because this
          route doubles as a paid destination, where a second click before the
          first field is the most expensive thing on the page. intent="demo"
          keeps the ask the call, matching every other CTA written for firms.
        */}
        <Section ariaLabelledby="heading-contingency-form" tone="white">
          <h2 className={textStyles.sectionTitle} id="heading-contingency-form">
            Book the call from here.
          </h2>
          <p className={`${textStyles.bodyMeasure} mt-4`}>
            Fifteen minutes on your own numbers: the disputes you are declining today, and what
            assembly time would have to drop to for them to be worth filing. Nothing to sign.
          </p>
          <div className="mt-10">
            <Suspense fallback={<div className="h-96 animate-pulse bg-surface-muted" />}>
              <SharedLeadForm
                anchorId="contingency-lead-form"
                defaultSegment="contingency_firm"
                intent="demo"
                landingPage="idr-for-contingency-firms"
              />
            </Suspense>
          </div>
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <p className={`${textStyles.body} mb-6`}>{IDR_FOR_CONTINGENCY_CTA_LEAD}</p>
            <Button href="#contingency-lead-form" showArrow>
              {IDR_FOR_CONTINGENCY_HERO.ctaLabel}
            </Button>
            <CtaTrustSignals className="mt-4" />
            <p className={`${textStyles.body} mt-8`}>
              Also see{" "}
              <Link className={textStyles.textLink} href="/idr-for-billing-companies">
                Sydra for billing companies and RCM firms
              </Link>
              ,{" "}
              <Link className={textStyles.textLink} href="/how-it-works">
                how Sydra prepares a submission
              </Link>
              , and{" "}
              <Link className={textStyles.textLink} href="/sydra-vs-idr-attorney">
                how the filing arrangements compare
              </Link>
              .
            </p>
          </div>
          <ServiceFaqSection
            className="mt-16"
            heading="Questions firms ask first"
            id="heading-idr-for-contingency-faq"
            items={IDR_FOR_CONTINGENCY_FAQS}
          />
          <ServiceCrossLinks current="/idr-for-contingency-firms" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        {/*
          hideSecondary: the claim review asks the visitor to send one denied EOB
          for our opinion, which is not an action a firm filing its own disputes
          would take. The call is the only ask that fits this reader.
        */}
        <SydraCtaBand
          ctaLabel={IDR_FOR_CONTINGENCY_CTA_BAND.ctaLabel}
          hideSecondary
          lead={IDR_FOR_CONTINGENCY_CTA_BAND.lead}
          title={IDR_FOR_CONTINGENCY_CTA_BAND.title}
        />
      </SydraPageShell>
    </>
  );
}
