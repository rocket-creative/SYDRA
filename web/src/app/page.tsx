import { SydraAbout } from "@/components/sydra/about";
import { SydraContactForm } from "@/components/sydra/contact-form";
import { SydraFaq } from "@/components/sydra/faq";
import { SydraFeatures } from "@/components/sydra/features";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { SydraHero } from "@/components/sydra/hero";
import { SydraHowItWorks } from "@/components/sydra/how-it-works";
import { HomepageJsonLd } from "@/components/sydra/json-ld";
import { SydraProblem } from "@/components/sydra/problem";
import { SydraProof } from "@/components/sydra/proof";

export default function HomePage() {
  return (
    <div className="bg-white font-sans text-slate-900" id="top">
      <HomepageJsonLd />
      <a
        href="#contact"
        className="fixed left-4 top-[-100px] z-[100] rounded-lg bg-[#1A2B48] px-4 py-3 text-sm text-white outline-none ring-offset-2 transition-all focus:top-4 focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Skip to demo request
      </a>
      <SydraHeader />
      <main>
        <SydraHero />
        <SydraProblem />
        <SydraHowItWorks />
        <SydraFeatures />
        <SydraProof />
        <SydraAbout />
        <SydraFaq />
        <SydraContactForm />
      </main>
      <SydraFooter />
    </div>
  );
}
