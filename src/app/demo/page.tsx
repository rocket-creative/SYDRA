import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { DemoFunnelForm } from "@/components/sydra/demo-funnel-form";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.demo;

function pageTitle(): string {
  const meta = PAGE_METADATA.demo;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Schedule a Sydra Demo";
}

function DemoPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.demo]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/demo",
            name: pageTitle(),
            description: PAGE_METADATA.demo.description ?? "",
          }),
        ]}
      />
    </>
  );
}

const proofPoints = [
  "213+ real IDR determinations in the library",
  ">90% provider wins cited in the reference library",
  "Under 5 minutes per claim vs 30 minutes manual",
  "Spine and ortho determination depth",
  "Federal IDR in all states; TX live, NY/CA/NJ/FL/AZ rolling out in 2026",
] as const;

export default function DemoPage() {
  return (
    <>
      <DemoPageJsonLd />
      <SydraPageShell
        breadcrumb={[...BREADCRUMBS.demo]}
        headerVariant="funnel"
        mainClassName="px-4 py-10 sm:px-6 md:py-14 xl:px-8"
      >
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
            <CtaTrustSignals className="mt-8" />
            <p className="mt-6 text-sm text-slate-500">
              Already a customer?{" "}
              <Link
                className="font-medium text-[#1A2B48] underline decoration-slate-300 underline-offset-2 hover:decoration-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
      </SydraPageShell>
    </>
  );
}
