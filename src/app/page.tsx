import { SectionReveal } from "@/components/motion/reveal";
import { SydraPlansSection } from "@/components/sydra/plans-section";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { SydraAbout } from "@/components/sydra/about";
import { SydraContactForm } from "@/components/sydra/contact-form";
import { DeterminationLibrary } from "@/components/sydra/determination-library";
import { SydraEconomics } from "@/components/sydra/economics";
import { SydraFaq } from "@/components/sydra/faq";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { SydraHero } from "@/components/sydra/hero";
import { SydraHowItWorks } from "@/components/sydra/how-it-works";
import { HomepageSecurity } from "@/components/sydra/homepage-security";
import { HomepageJsonLd } from "@/components/sydra/json-ld";
import { MobileCtaBar } from "@/components/sydra/mobile-cta-bar";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { SydraTimeCost } from "@/components/sydra/time-cost";
import { SkipLink } from "@/components/sydra/skip-link";

export default function HomePage() {
  return (
    <div className="bg-white font-sans text-slate-900" id="top">
      <HomepageJsonLd />
      <SkipLink />
      <SydraHeader />
      <main
        className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0"
        id="main-content"
        tabIndex={-1}
      >
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
          <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 xl:max-w-[1200px] xl:px-8">
            <SourcesReferences />
          </div>
        </SectionReveal>
      </main>
      <SydraFooter />
      <MobileCtaBar />
    </div>
  );
}
