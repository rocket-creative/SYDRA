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
import { ProofBar } from "@/components/landing/proof-bar";
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
      <Hero stateDisplay={stateDisplay} tracking={tracking} />
      <SectionReveal>
        <ProofBar />
      </SectionReveal>
      <SectionReveal>
        <HowItWorks />
      </SectionReveal>
      <SectionReveal>
        <FederalIdrExplainer />
      </SectionReveal>
      <SectionReveal>
        <BuiltOnClaude />
      </SectionReveal>
      <SectionReveal>
        <RecoverySection tracking={tracking} />
      </SectionReveal>
      <SectionReveal>
        <AudiencePaths />
      </SectionReveal>
      <SectionReveal>
        <FounderNote />
      </SectionReveal>
      <SectionReveal>
        <TwoPaths tracking={tracking} />
      </SectionReveal>
      <SectionReveal>
        <Faq stateDisplay={stateDisplay} />
      </SectionReveal>
      <SectionReveal>
        <ClosingCta tracking={tracking} />
      </SectionReveal>
      <SectionReveal>
        <LeadForm defaultState={stateCode} tracking={tracking} variant="section" />
      </SectionReveal>
      <MobileCtaBar tracking={tracking} />
    </MagazineShell>
  );
}
