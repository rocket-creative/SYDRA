import { Section } from "@/components/ui/section";
import { CtaLink } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { textStyles } from "@/lib/typography";

export function HomepageSecurity() {
  return (
    <Section ariaLabelledby="heading-home-security" sidebarLabel="Security" tone="white">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
        <EditorialImage
          alt="Accountant and colleague handling protected claim documents at a desk"
          aspect="4/5"
          className="lg:sticky lg:top-24"
          sizes="(max-width: 1024px) 100vw, 40vw"
          src="/images/editorial/accountant-desk-review.png"
        />
        <div className="min-w-0">
      <h2 className="type-h2 prose-measure text-brand" id="heading-home-security">
        PHI in an IDR submission. How Sydra handles it.
      </h2>
      <div className={`${textStyles.bodyStack} mt-8`}>
        <p>
          An IDR submission contains your patient&apos;s name, date of service, diagnosis,
          procedure codes, operative note excerpts, and claim amounts. Every document that enters
          Sydra is protected health information under HIPAA.
        </p>
        <p>
          <strong className="text-brand">HIPAA eligible processing:</strong> All AI generation runs
          on Claude Sonnet 4 on AWS Bedrock. AWS Bedrock with Claude is HIPAA eligible. PHI stays
          inside AWS&apos;s HIPAA eligible service boundary during generation. No PHI is transmitted
          to Anthropic&apos;s infrastructure. No data used to train any model.
        </p>
        <p>
          <strong className="text-brand">Encryption:</strong> AES 256 at rest in Amazon S3. TLS 1.2
          or higher in transit. Signed URLs with short expiry windows for all document retrieval.
        </p>
        <p>
          <strong className="text-brand">Isolation:</strong> Strict per practice tenant isolation
          enforced at the database row level. No user account at one practice can access data from
          any other practice.
        </p>
        <p>
          <strong className="text-brand">BAA:</strong> Available for covered entities on request.
          Contact support@sydrahealth.com.
        </p>
        <p>
          <strong className="text-brand">SOC 2:</strong> SOC 2 Type II compliant. Report available
          to qualified prospects on request during evaluation.
        </p>
      </div>
      <p className="mt-8">
        <CtaLink href="/security">Full security overview</CtaLink>
      </p>
        </div>
      </div>
    </Section>
  );
}
