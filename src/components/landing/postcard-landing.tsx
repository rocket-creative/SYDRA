import { Suspense } from "react";

import { Cursor } from "@/components/motion/cursor";
import { SectionReveal } from "@/components/motion/reveal";
import { AudiencePaths } from "@/components/landing/audience-paths";
import { BuiltOnClaude } from "@/components/landing/built-on-claude";
import { ClosingCta } from "@/components/landing/closing-cta";
import { Faq } from "@/components/landing/faq";
import { FederalIdrExplainer } from "@/components/landing/federal-idr-explainer";
import { FounderNote } from "@/components/landing/founder-note";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LeadForm } from "@/components/landing/lead-form";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { RecoverySection } from "@/components/landing/recovery-section";
import { TrackingProvider } from "@/components/landing/tracking-provider";
import { TwoPaths } from "@/components/landing/two-paths";
import { MagazineShell } from "@/components/ui/magazine-shell";
import type { CampaignTracking } from "@/lib/landing/tracking";
import { buildFaqs } from "@/lib/landing/faqs";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  kronosHealthOrganizationJsonLd,
  personJsonLd,
  serviceJsonLd,
  softwareApplicationJsonLd,
  sydraOrganizationJsonLd,
  sydraWebsiteJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";

type PostcardLandingProps = {
  stateDisplay: string | null;
  stateCode: string;
  tracking: CampaignTracking;
  path: string;
};

export function PostcardLanding({
  stateDisplay,
  stateCode,
  tracking,
  path,
}: PostcardLandingProps) {
  const faqs = buildFaqs(stateDisplay);
  const jsonLd = [
    breadcrumbJsonLd([{ name: "Home", path: "" }]),
    kronosHealthOrganizationJsonLd(),
    sydraOrganizationJsonLd(),
    softwareApplicationJsonLd(),
    sydraWebsiteJsonLd(),
    webPageJsonLd({
      path: "",
      name: "Stop writing off out of network claims",
      description:
        "Surgeon built NSA IDR software your billing team runs in five minutes per claim. Prepare federal IDR submissions and keep the recovery.",
    }),
    serviceJsonLd({
      name: "Sydra NSA IDR submission software",
      description:
        "Software that prepares federal independent dispute resolution submissions for out of network surgical claims under the No Surprises Act in about five minutes per claim.",
      serviceType: "NSA IDR claim preparation",
    }),
    personJsonLd({
      name: "Dr. John M. Abrahams, MD",
      jobTitle: "Founder, Kronos Health",
      description:
        "Board certified neurosurgeon and founder of Kronos Health, which builds Sydra and Kronos Revenue.",
      isPhysician: true,
      medicalSpecialty: "Neurosurgery",
    }),
    faqPageJsonLd(faqs.map(({ q, a }) => ({ q, a }))),
  ];

  return (
    <MagazineShell hasMobileCtaBar headerBorderless mainClassName="landing-compact">
      <PageJsonLd data={jsonLd} />
      <Cursor />
      <TrackingProvider path={path} tracking={tracking} />
      <div className="flex flex-col">
        {/* 1. Hero with proof stack */}
        <div className="order-1">
          <Hero stateDisplay={stateDisplay} tracking={tracking} />
        </div>
        {/* 2. Demo form */}
        <SectionReveal className="order-2">
          <div className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
            <Suspense fallback={<div className="h-80 animate-pulse rounded-[2px] bg-surface-muted" />}>
              <LeadForm
                anchorId="lead-form"
                defaultState={stateCode}
                landingPage="home"
                tracking={tracking}
                variant="card"
              />
            </Suspense>
          </div>
        </SectionReveal>
        {/* 3. Recovery calculator */}
        <SectionReveal className="order-3">
          <RecoverySection tracking={tracking} />
        </SectionReveal>
        {/* 4. Three ways in */}
        <SectionReveal className="order-4">
          <AudiencePaths />
        </SectionReveal>
        {/* 5. How Sydra works */}
        <SectionReveal className="order-5">
          <HowItWorks />
        </SectionReveal>
        {/* 6. Built by a surgeon who files these claims */}
        <SectionReveal className="order-6">
          <FounderNote />
        </SectionReveal>
        {/* 7. Built on Claude */}
        <SectionReveal className="order-7">
          <BuiltOnClaude />
        </SectionReveal>
        {/* 8. What is Federal IDR */}
        <SectionReveal className="order-8">
          <FederalIdrExplainer />
        </SectionReveal>
        {/* 9. Two paths */}
        <SectionReveal className="order-9">
          <TwoPaths tracking={tracking} />
        </SectionReveal>
        {/* 10. FAQ */}
        <SectionReveal className="order-10">
          <Faq stateDisplay={stateDisplay} />
        </SectionReveal>
        {/* 11. Closing CTA and form */}
        <SectionReveal className="order-11">
          <ClosingCta tracking={tracking} />
        </SectionReveal>
        <SectionReveal className="order-12">
          <Suspense fallback={<div className="h-80 animate-pulse bg-surface-muted" />}>
            <LeadForm
              anchorId="lead-form-closing"
              defaultState={stateCode}
              landingPage="home"
              tracking={tracking}
              variant="section"
            />
          </Suspense>
        </SectionReveal>
      </div>
      <MobileCtaBar tracking={tracking} />
    </MagazineShell>
  );
}
