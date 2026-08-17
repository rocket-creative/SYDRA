import { Cursor } from "@/components/motion/cursor";
import { HomepageReveal } from "@/components/motion/homepage-reveal";
import { AudienceSegments } from "@/components/landing/audience-segments";
import { ClaimReviewForm } from "@/components/landing/claim-review-form";
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
  tracking,
  path,
}: PostcardLandingProps) {
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
    <MagazineShell hasMobileCtaBar headerBorderless>
      <PageJsonLd data={jsonLd} />
      <Cursor />
      <TrackingProvider path={path} tracking={tracking} />
      <div className="flex flex-col">
        <div className="order-1">
          <Hero stateDisplay={stateDisplay} tracking={tracking} />
        </div>
        <HomepageReveal className="order-2">
          <HomepageProofBand />
        </HomepageReveal>
        <HomepageReveal className="order-3">
          <UnderuseStatement />
        </HomepageReveal>
        <HomepageReveal className="order-4">
          <AudienceSegments />
        </HomepageReveal>
        <HomepageReveal className="order-5">
          <RegulatoryCurrency />
        </HomepageReveal>
        <HomepageReveal className="order-6">
          <RecoverySection />
        </HomepageReveal>
        <HomepageReveal className="order-7">
          <ProcessProblemStatement />
        </HomepageReveal>
        <HomepageReveal className="order-8">
          <HomepageBandForm />
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
        <div className="max-w-2xl rounded-[2px] bg-white p-6 md:p-8" id="lead-form">
          <ClaimReviewForm source="homepage-closing" />
        </div>
      </div>
    </section>
  );
}
