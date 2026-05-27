import type { Metadata } from "next";
import Link from "next/link";

import { DemoFunnelForm } from "@/components/sydra/demo-funnel-form";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { DemoPageJsonLd } from "@/components/sydra/demo-json-ld";
import { siteUrl } from "@/lib/site";

const description =
  "Schedule a 15 minute Sydra demo on a real denied claim. Built for surgical billing teams filing federal IDR / NSA disputes.";

export const metadata: Metadata = {
  title: "Schedule a demo",
  description,
  alternates: { canonical: `${siteUrl()}/demo` },
  openGraph: {
    title: "Schedule a demo · Sydra",
    description,
    url: `${siteUrl()}/demo`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule a demo · Sydra",
    description,
  },
};

const proofPoints = [
  "213+ real IDR determinations in the library",
  ">90% provider wins cited in the reference library",
  "Under 5 minutes per claim vs 30 minutes manual",
  "Spine and ortho determination depth",
  "Federal IDR in all states; TX live, NY/CA/NJ/FL/AZ rolling out in 2026",
] as const;

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <DemoPageJsonLd />
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader variant="funnel" />
        <main className="px-4 py-10 sm:px-6 md:py-14 xl:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,40,184)] sm:text-xs">
                Schedule a demo
              </p>
              <h1 className="mt-4 text-[1.75rem] font-semibold leading-snug tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.25rem]">
                Show us a recent denied claim
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
                A 15 minute walkthrough on a real case. We recommend the right tier,
                quote on your volume, and offer sandbox access if you want it. No
                pressure.
              </p>
              <ul className="mt-8 space-y-3">
                {proofPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[15px] leading-relaxed text-slate-700"
                  >
                    <span
                      className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded bg-blue-600/15 text-[12px] font-bold text-blue-700"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-slate-500">
                HIPAA controls in place · ModMed and Stedi integrations · No setup
                fees · SOC 2 aligned
              </p>
              <p className="mt-6 text-sm text-slate-500">
                Already a customer?{" "}
                <Link
                  className="font-medium text-[#1A2B48] underline decoration-slate-300 underline-offset-2 hover:decoration-[#1A2B48]"
                  href="https://sydra.health/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <div className="mt-10 lg:col-span-6 lg:mt-0">
              <DemoFunnelForm />
            </div>
          </div>
        </main>
        <SydraFooter />
      </div>
    </div>
  );
}
