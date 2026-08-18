import { Suspense } from "react";

import { Hero, ProofStrip, Thesis } from "@/components/homepage/above-the-fold";
import { CtaBlock } from "@/components/homepage/cta-block";
import { PathDetails } from "@/components/homepage/path-details";
import { Paths } from "@/components/homepage/paths";
import { Results } from "@/components/homepage/results";
import { SharedLeadForm } from "@/components/landing/shared-lead-form";
import { TrackingProvider } from "@/components/landing/tracking-provider";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { MagazineShell } from "@/components/ui/magazine-shell";
import type { CampaignTracking } from "@/lib/landing/tracking";
import {
  breadcrumbJsonLd,
  personJsonLd,
  serviceJsonLd,
  softwareApplicationJsonLd,
  sydraOrganizationJsonLd,
  sydraWebsiteJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";

type HomepageProps = {
  tracking: CampaignTracking;
  path: string;
};

/**
 * Homepage. Section order is fixed: hero, the four paths, proof strip and thesis
 * line above the fold, then the four path detail sections, the case study data
 * with its disclaimer, and the closing CTA. Do not reorder or insert sections.
 *
 * The postcard landing (src/components/landing/postcard-landing.tsx) still backs
 * /r and /r/[state], which are unchanged. This is the homepage only.
 */
export function Homepage({ tracking, path }: HomepageProps) {
  const jsonLd = [
    breadcrumbJsonLd([{ name: "Home", path: "" }]),
    sydraOrganizationJsonLd(),
    softwareApplicationJsonLd(),
    sydraWebsiteJsonLd(),
    webPageJsonLd({
      path: "",
      name: "That payment is an opening offer.",
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
      name: "Dr. John Abrahams, MD",
      jobTitle: "Founder, Sydra",
      description: "Board certified neurosurgeon and founder of Sydra.",
      isPhysician: true,
      medicalSpecialty: "Neurosurgery",
    }),
  ];

  return (
    <MagazineShell headerBorderless headerVariant="compact">
      <PageJsonLd data={jsonLd} />
      {/* Renders nothing. Keeps first-touch UTM attribution for postcard traffic landing on /. */}
      <TrackingProvider path={path} tracking={tracking} />

      <Hero />
      <Paths />
      <ProofStrip />
      <Thesis />

      {/*
        Mid-page lead capture, horizontal band. It sits after the thesis line
        rather than directly under the proof strip because the enforced fold
        budget (spec 3) requires #thesis to end above 660px at 1440x760, and it
        already ends at 654px. The card at the foot of the page keeps its own
        anchor, so both mount the same form with separate field ids.
      */}
      <Suspense fallback={<div className="h-[420px] animate-pulse bg-neutral-section" />}>
        <SharedLeadForm
          anchorId="claim-review-form"
          landingPage="home-band"
          variant="band"
        />
      </Suspense>

      <PathDetails />
      <Results />

      {/*
        Spec 8 describes this section as three buttons. The form below is an
        approved addition: the buttons all leave the page, so without it the
        homepage has no way to convert a visitor who is ready now. Same
        SharedLeadForm as every other page, so it lands in the same place.
      */}
      <section
        aria-labelledby="closing-cta-heading"
        className="anchor-under-header bg-white px-4 py-12 md:px-6 md:py-16 lg:px-8"
        id="cta"
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-5">
            <CtaBlock
              bordered={false}
              headingId="closing-cta-heading"
              headingLevel="h2"
              placement="homepage-closing"
            />
          </div>
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="h-96 animate-pulse bg-surface-muted" />}>
              <SharedLeadForm landingPage="home" />
            </Suspense>
          </div>
        </div>
      </section>
    </MagazineShell>
  );
}
