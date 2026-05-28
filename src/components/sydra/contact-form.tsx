import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import {
  getContactPhoneDisplay,
  getContactPhoneTel,
  getSalesEmail,
  salesMailtoHref,
} from "@/lib/contact";

export function SydraContactForm() {
  const phone = getContactPhoneDisplay();
  const phoneTel = getContactPhoneTel();

  return (
    <Section ariaLabelledby="heading-contact" id="contact" tone="white" topRule>
      <div className="prose-measure">
        <h2 className="type-h2 text-brand" id="heading-contact">
          Ready to see Sydra on a real claim?
        </h2>
        <p className="mt-6 type-body text-body">
          Schedule a 15 minute demo. We walk through Sydra live on a denied claim, recommend the
          right tier, and quote on your volume. No pressure.
        </p>
        <div className="mt-10">
          <Button href="/demo" showArrow>
            Schedule a demo
          </Button>
        </div>
        <p className="mt-6 text-sm text-body">
          Prefer email?{" "}
          <a className="text-brand underline decoration-rule underline-offset-4" href={salesMailtoHref()}>
            {getSalesEmail()}
          </a>
        </p>
        {phone && phoneTel ? (
          <p className="mt-3 text-sm text-body">
            Or call{" "}
            <a
              className="text-brand underline decoration-rule underline-offset-4"
              href={phoneTel}
            >
              {phone}
            </a>
            {" · "}
            9:00 to 5:00 ET, Monday through Friday
          </p>
        ) : null}
        <p className="mt-6">
          <CtaLink href="/contact">Sales and support contact paths</CtaLink>
        </p>
      </div>
    </Section>
  );
}
