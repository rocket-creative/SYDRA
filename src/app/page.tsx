import { SectionReveal } from "@/components/motion/reveal";
import { MagazineShell } from "@/components/ui/magazine-shell";
import { SydraPlansSection } from "@/components/sydra/plans-section";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { SydraAbout } from "@/components/sydra/about";
import { SydraContactForm } from "@/components/sydra/contact-form";
import { DeterminationLibrary } from "@/components/sydra/determination-library";
import { SydraEconomics } from "@/components/sydra/economics";
import { SydraFaq } from "@/components/sydra/faq";
import { SydraHero } from "@/components/sydra/hero";
import { SydraHowItWorks } from "@/components/sydra/how-it-works";
import { HomepageSecurity } from "@/components/sydra/homepage-security";
import { HomepageJsonLd } from "@/components/sydra/json-ld";
import { MobileCtaBar } from "@/components/sydra/mobile-cta-bar";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { SydraTimeCost } from "@/components/sydra/time-cost";

export default function HomePage() {
  return (
    <MagazineShell>
      <HomepageJsonLd />
      <SydraHero />
      <SectionReveal>
        <SydraTimeCost />
      </SectionReveal>
      <SectionReveal>
        <SydraHowItWorks />
      </SectionReveal>
      <SectionReveal>
        <SydraEconomics />
      </SectionReveal>
      <SectionReveal>
        <DeterminationLibrary />
      </SectionReveal>
      <SectionReveal>
        <SydraPlansSection />
      </SectionReveal>
      <SectionReveal>
        <HomepageSecurity />
      </SectionReveal>
      <SectionReveal>
        <SydraCtaBand />
      </SectionReveal>
      <SectionReveal>
        <SydraAbout />
      </SectionReveal>
      <SectionReveal>
        <SydraFaq />
      </SectionReveal>
      <SectionReveal>
        <SydraContactForm />
      </SectionReveal>
      <SectionReveal>
        <div className="border-b border-rule bg-neutral-section px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[1280px]">
            <SourcesReferences />
          </div>
        </div>
      </SectionReveal>
      <MobileCtaBar />
    </MagazineShell>
  );
}
