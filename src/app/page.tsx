import { SectionReveal } from "@/components/motion/reveal";
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

export default function HomePage() {
  return (
    <div className="bg-white font-sans text-slate-900" id="top">
      <HomepageJsonLd />
      <a
        href="#main-content"
        className="fixed left-4 top-[-100px] z-[100] min-h-11 min-w-11 rounded-md bg-[#1A2B48] px-4 py-3 text-sm text-white outline-none ring-offset-2 transition-all duration-300 ease-out focus:top-[max(1rem,env(safe-area-inset-top))] focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Skip to main content
      </a>
      <SydraHeader />
      <main
        className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0"
        id="main-content"
        tabIndex={-1}
      >
        <SydraHero />
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
