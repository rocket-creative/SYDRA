import { SectionReveal } from "@/components/motion/reveal";
import { SydraPlansSection } from "@/components/sydra/plans-section";
import { TrustStrip } from "@/components/sydra/trust-strip";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { SydraAbout } from "@/components/sydra/about";
import { SydraContactForm } from "@/components/sydra/contact-form";
import { SydraFaq } from "@/components/sydra/faq";
import { SydraFeatures } from "@/components/sydra/features";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { SydraHero } from "@/components/sydra/hero";
import { SydraHowItWorks } from "@/components/sydra/how-it-works";
import { HomepageJsonLd } from "@/components/sydra/json-ld";
import { MobileCtaBar } from "@/components/sydra/mobile-cta-bar";
import { SydraProblem } from "@/components/sydra/problem";
import { SydraProof } from "@/components/sydra/proof";
import { SydraCostSavings } from "@/components/sydra/cost-savings";
import { SydraValueProps } from "@/components/sydra/value-props";
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
        <TrustStrip />
        <SectionReveal>
          <SydraPlansSection />
        </SectionReveal>
        <SectionReveal>
          <SydraValueProps />
        </SectionReveal>
        <SectionReveal>
          <SydraCostSavings />
        </SectionReveal>
        <SectionReveal>
          <SydraProblem />
        </SectionReveal>
        <SectionReveal>
          <SydraHowItWorks />
        </SectionReveal>
        <SectionReveal>
          <SydraFeatures />
        </SectionReveal>
        <SectionReveal>
          <SydraProof />
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
      </main>
      <SydraFooter />
      <MobileCtaBar />
    </div>
  );
}
