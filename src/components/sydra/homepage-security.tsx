import Link from "next/link";

export function HomepageSecurity() {
  return (
    <section
      aria-labelledby="heading-home-security"
      className="border-b border-slate-100 bg-slate-50 py-14 md:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[720px] xl:px-8">
        <h2
          className="text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2rem]"
          id="heading-home-security"
        >
          PHI in an IDR submission. How Sydra handles it.
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          <p>
            An IDR submission contains your patient&apos;s name, date of service, diagnosis,
            procedure codes, operative note excerpts, and claim amounts. Every document that
            enters Sydra is protected health information under HIPAA.
          </p>
          <p>
            <strong className="text-[#1A2B48]">HIPAA eligible processing:</strong> All AI
            generation runs on Claude Sonnet 4 on AWS Bedrock. AWS Bedrock with Claude is
            HIPAA eligible. PHI stays inside AWS&apos;s HIPAA eligible service boundary during
            generation. No PHI is transmitted to Anthropic&apos;s infrastructure. No data used
            to train any model.
          </p>
          <p>
            <strong className="text-[#1A2B48]">Encryption:</strong> AES 256 at rest in Amazon
            S3. TLS 1.2 or higher in transit. Signed URLs with short expiry windows for all
            document retrieval.
          </p>
          <p>
            <strong className="text-[#1A2B48]">Isolation:</strong> Strict per practice tenant
            isolation enforced at the database row level. No user account at one practice can
            access data from any other practice.
          </p>
          <p>
            <strong className="text-[#1A2B48]">BAA:</strong> Available for covered entities on
            request. Contact support@sydrahealth.com.
          </p>
          <p>
            <strong className="text-[#1A2B48]">SOC 2:</strong> In progress. Not yet complete. We
            will tell you the timeline when you ask. We&apos;re not going to claim a certification
            we haven&apos;t finished.
          </p>
        </div>
        <p className="mt-8">
          <Link
            className="text-sm font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
            href="/security"
          >
            Full security overview →
          </Link>
        </p>
      </div>
    </section>
  );
}
