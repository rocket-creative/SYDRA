import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CalendlyEmbed } from "@/components/sydra/calendly-embed";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { Section } from "@/components/ui/section";
import { SALES_PHONE_DISPLAY, SALES_PHONE_TEL } from "@/lib/contact";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.schedule;

function pageTitle(): string {
  const meta = PAGE_METADATA.schedule;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Book a Sydra Demo";
}

export default function SchedulePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.schedule]} />
      <PageJsonLd
        data={webPageJsonLd({
          path: "/schedule",
          name: pageTitle(),
          description: PAGE_METADATA.schedule.description ?? "",
        })}
      />
      <SydraPageShell
        banded
        breadcrumb={[...BREADCRUMBS.schedule]}
        headerVariant="default"
      >
        <Section tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-schedule">
              Book a demo
              <span className={textStyles.pageSubtitle}>
                Bring one denied claim. We&apos;ll tell you what federal IDR would do with it.
              </span>
            </h1>
            <p className={`${textStyles.body} mt-4`}>
              Or set up a call:{" "}
              <a className={textStyles.textLink} href={SALES_PHONE_TEL}>
                {SALES_PHONE_DISPLAY}
              </a>
            </p>
          </header>
          <CalendlyEmbed className="mt-10" />
        </Section>
      </SydraPageShell>
    </>
  );
}
