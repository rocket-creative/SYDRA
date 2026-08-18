import { Suspense } from "react";

import { Cursor } from "@/components/motion/cursor";
import { HomepageReveal } from "@/components/motion/homepage-reveal";
import { AudienceSegments } from "@/components/landing/audience-segments";
import { SharedLeadForm } from "@/components/landing/shared-lead-form";
import { Hero } from "@/components/landing/hero";
import { HomepageProofBand } from "@/components/landing/hero-proof-stack";
import {
  ProcessProblemStatement,
  UnderuseStatement,
} from "@/components/landing/homepage-statements";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { RecoverySection } from "@/components/landing/recovery-section";
import { RegulatoryCurrency } from "@/components/landing/regulatory-currency";
import { TrackingProvider } from "@/components/landing/tracking-provider";
import { MagazineShell } from "@/components/ui/magazine-shell";
import type { CampaignTracking } from "@/lib/landing/tracking";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import {
  breadcrumbJsonLd,
  personJsonLd,
  serviceJsonLd,
  softwareApplicationJsonLd,
  sydraOrganizationJsonLd,
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
  tracking,
  path,
}: PostcardLandingProps) {
  /*
   * This page describes itself, not the homepage. It previously passed path ""
   * and the homepage's name to webPageJsonLd, so /r and /r/[state] emitted
   * structured data claiming to be the site root while serving different
   * content. sydraWebsiteJsonLd is also gone: the WebSite node belongs on the
   * canonical homepage, not on a noindexed campaign lander.
   */
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "" },
      { name: stateDisplay ? `Federal IDR in ${stateDisplay}` : "Federal IDR recovery", path },
    ]),
    sydraOrganizationJsonLd(),
    softwareApplicationJsonLd(),
    webPageJsonLd({
      path,
      name: stateDisplay
        ? `Out of network recovery for surgical practices in ${stateDisplay}`
        : "Out of network recovery for surgical practices",
      description:
        "Surgeon built NSA IDR software your billing team runs in five minutes per claim, or Sydra files every dispute for you. Prepare federal IDR submissions and keep the recovery.",
    }),
    serviceJsonLd({
      name: "Sydra NSA IDR submission software",
      description:
        "Software that prepares federal independent dispute resolution submissions for out of network surgical claims under the No Surprises Act in about five minutes per claim.",
      serviceType: "NSA IDR claim preparation",
    }),
    personJsonLd({
      name: "Dr. John Abrahams, MD",
      jobTitle: "Founder, Sydra",
      description: "Board certified neurosurgeon and founder of Sydra.",
      isPhysician: true,
      medicalSpecialty: "Neurosurgery",
    }),
  ];

  return (
    <MagazineShell hasMobileCtaBar headerBorderless>
      <PageJsonLd data={jsonLd} />
      <Cursor />
      <TrackingProvider path={path} tracking={tracking} />
      {/*
       * Phones read the form straight after the hero, so the conversion ask
       * lands within the first two screens instead of ~7,000px down. From md up
       * the eight-section editorial order applies and the form closes the page.
       */}
      <div className="flex flex-col">
        <div className="order-1">
          <Hero stateDisplay={stateDisplay} tracking={tracking} />
        </div>
        <HomepageReveal className="order-2 md:order-8">
          <HomepageBandForm />
        </HomepageReveal>
        <HomepageReveal className="order-3 md:order-2">
          <HomepageProofBand />
        </HomepageReveal>
        <HomepageReveal className="order-4 md:order-3">
          <UnderuseStatement />
        </HomepageReveal>
        <HomepageReveal className="order-5 md:order-4">
          <AudienceSegments />
        </HomepageReveal>
        <HomepageReveal className="order-6 md:order-5">
          <RegulatoryCurrency />
        </HomepageReveal>
        <HomepageReveal className="order-7 md:order-6">
          <RecoverySection />
        </HomepageReveal>
        <HomepageReveal className="order-8 md:order-7">
          <ProcessProblemStatement />
        </HomepageReveal>
      </div>
      <MobileCtaBar tracking={tracking} />
    </MagazineShell>
  );
}

function HomepageBandForm() {
  return (
    <section className="bg-neutral-section py-12 md:py-16 lg:py-24" id="lead-form-closing">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Suspense fallback={<div className="h-96 animate-pulse bg-surface-muted" />}>
            <SharedLeadForm landingPage="postcard" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
