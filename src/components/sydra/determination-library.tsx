import { Section } from "@/components/ui/section";
import { EditorialImage } from "@/components/ui/editorial-image";

export function DeterminationLibrary() {
  return (
    <Section ariaLabelledby="heading-determination-library" sidebarLabel="Library" tone="white" topRule>
      <EditorialImage
        alt="Two revenue cycle analysts comparing determination data and reports in a meeting room"
        aspect="16/9"
        className="mb-10"
        sizes="(max-width: 1280px) 100vw, 1280px"
        src="/images/editorial/analysts-comparing-reports.png"
      />
      <h2 className="type-h2 prose-measure text-brand" id="heading-determination-library">
        Why prior determinations win IDR cases.
      </h2>

      <div className="prose-measure mt-8 space-y-4 type-body text-body">
        <p>
          The federal IDR arbitrator reviews two competing payment offers. Yours and the
          insurer&apos;s. The insurer&apos;s offer is anchored to the qualifying payment amount
          and argues QPA is the correct benchmark for your procedure.
        </p>
        <p>Your offer wins when it does two things well:</p>
        <p>
          First, establishes your fee is consistent with what providers actually win on this
          specific CPT. Not a general market rate claim. Prior cases where an IDRE decided the
          same code at similar amounts in the same region.
        </p>
        <p>
          Second, demonstrates the clinical circumstances of your specific case justify that
          fee. The operative note, the procedure complexity, the surgeon&apos;s volume on that code.
        </p>
        <p>
          Sydra&apos;s library contains 213+ ingested IDR determinations, over 90% provider wins,
          weighted toward spine and orthopedic CPT codes. When Sydra drafts a submission for CPT
          22612 (posterior lumbar fusion), it doesn&apos;t generate a generic argument. It cites the
          specific prior determinations that match your code, your state, and your procedure
          complexity.
        </p>
      </div>
    </Section>
  );
}
