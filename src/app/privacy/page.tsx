import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { Section } from "@/components/ui/section";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.privacy;

function pageTitle(): string {
  const meta = PAGE_METADATA.privacy;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Sydra Privacy Policy";
}

function PrivacyPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.privacy]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/privacy",
            name: pageTitle(),
            description: PAGE_METADATA.privacy.description ?? "",
          }),
        ]}
      />
    </>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PrivacyPageJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.privacy]} headerVariant="funnel">
        <Section ariaLabelledby="heading-privacy" tone="white">
          <div className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-privacy">
              Privacy policy
            </h1>
            <p className={textStyles.pageLead}>
              Sydra operates this marketing site. This policy explains how we collect, use, share,
              and retain information from demo requests, claim reviews, contact forms, and related
              messages. Last updated August 2026.
            </p>
          </div>
        </Section>

        <Section sidebarLabel="Privacy" tone="neutral">
          <article className="prose-measure">
            <h2 className={textStyles.sectionTitle}>Information we collect</h2>
            <p className={`${textStyles.body} mt-3`}>
              When you submit a form or message, we collect the information you provide, such as
              name, work email, phone number, practice name, role, state, out of network volume,
              product interest, and your message. We also collect campaign attribution (for example
              UTM parameters and landing route) and technical data needed to operate the site and
              prevent spam. We do not collect payment information on this site.
            </p>

            <h2 className={`${textStyles.sectionTitle} mt-10`}>How we use it</h2>
            <p className={`${textStyles.body} mt-3`}>
              We use submitted information to respond to your request, schedule demos or claim
              reviews, evaluate fit for Sydra, operate and improve this site, and keep records of
              our communications with you.
            </p>
            <p className={`${textStyles.body} mt-3`}>
              If you opt in on a form, we may also send product updates and promotional emails, and
              use your contact information for advertising as described below. Sales follow up about
              a request you submitted does not require that optional opt in.
            </p>

            <h2 className={`${textStyles.sectionTitle} mt-10`}>Advertising and Google Customer Match</h2>
            <p className={`${textStyles.body} mt-3`}>
              If you check the marketing consent box, Sydra may share hashed versions of your contact
              information (such as email or phone) with Google so Google can match those contacts to
              Google accounts for personalized advertising, including Google Ads Customer Match. We
              do this only for contacts who provided that consent, and we upload only first party
              data collected directly through our forms or related first party channels.
            </p>
            <p className={`${textStyles.body} mt-3`}>
              Under some U.S. state privacy laws, this type of advertising use may be considered
              “sharing” personal information for cross context behavioral advertising. You can opt
              out at any time using our{" "}
              <Link className={textStyles.textLink} href="/do-not-sell">
                Do Not Sell or Share
              </Link>{" "}
              page. When you opt out, we stop using your information for that purpose and remove it
              from future Customer Match uploads.
            </p>

            <h2 className={`${textStyles.sectionTitle} mt-10`}>Marketing emails</h2>
            <p className={`${textStyles.body} mt-3`}>
              Promotional emails are sent only when you opt in. Every marketing email includes an
              unsubscribe link. Unsubscribing also opts you out of Customer Match advertising use of
              that contact information. Transactional messages about a request you made (for example
              confirming we received your demo request) may still be sent.
            </p>

            <h2 className={`${textStyles.sectionTitle} mt-10`}>Sale and sharing</h2>
            <p className={`${textStyles.body} mt-3`}>
              We do not sell contact lists to data brokers. We may share information with service
              providers that help us operate email delivery, hosting, analytics, CRM tools, and
              advertising platforms such as Google, subject to this policy and applicable law. Where
              required, we offer a Do Not Sell or Share choice as described above.
            </p>

            <h2 className={`${textStyles.sectionTitle} mt-10`}>Retention</h2>
            <p className={`${textStyles.body} mt-3`}>
              We retain lead and contact records as long as needed to respond to inquiries, maintain
              business records, honor opt outs, and meet legal obligations. Consent records are kept
              so we can demonstrate what you agreed to and when.
            </p>

            <h2 className={`${textStyles.sectionTitle} mt-10`}>Your choices</h2>
            <p className={`${textStyles.body} mt-3`}>
              You may request to unsubscribe from marketing, opt out of sale or sharing for
              advertising, or ask us to delete personal information we hold from this marketing site,
              subject to legal exceptions. Submit a request on our{" "}
              <Link className={textStyles.textLink} href="/do-not-sell">
                Do Not Sell or Share
              </Link>{" "}
              page or email{" "}
              <Link className={textStyles.textLink} href="/contact">
                our contact team
              </Link>
              .
            </p>

            <h2 className={`${textStyles.sectionTitle} mt-10`}>PHI on this site</h2>
            <p className={`${textStyles.body} mt-3`}>
              Do not submit protected health information through this marketing site. PHI belongs in
              the Sydra application under a signed BAA.
            </p>

            <h2 className={`${textStyles.sectionTitle} mt-10`}>Changes</h2>
            <p className={`${textStyles.body} mt-3`}>
              We may update this policy from time to time. The “Last updated” date at the top of this
              page will change when we do. Continued use of the site after an update means the
              revised policy applies to new information collected after that date.
            </p>

            <p className={`${textStyles.meta} mt-10`}>
              Questions?{" "}
              <Link className={textStyles.textLink} href="/contact">
                Contact us
              </Link>
              .
            </p>
          </article>
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
