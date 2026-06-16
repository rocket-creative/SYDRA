import { LegalFooter } from "@/components/idr/legal-footer";
import { pathwayLabel } from "@/lib/idr/format";
import type { IdrStateProfile } from "@/lib/idr/types";
import { textStyles } from "@/lib/typography";

type EligibilityBlockProps = {
  profile: IdrStateProfile | null;
  codeLabel: string;
  stateName: string;
};

export function EligibilityBlock({
  profile,
  codeLabel,
  stateName,
}: EligibilityBlockProps) {
  return (
    <div className="prose-measure">
      <h2 className={textStyles.sectionTitle}>
        Does federal IDR apply to {codeLabel} in {stateName}?
      </h2>

      {profile ? (
        <>
          <dl className="mt-6 space-y-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-rule pb-4">
              <dt className="type-caption w-40 shrink-0 text-body">
                Predominant pathway
              </dt>
              <dd className="text-sm text-brand">
                {pathwayLabel(profile.nsaPathway)}
              </dd>
            </div>
          </dl>
          <p className={`${textStyles.body} mt-6`}>{profile.stateLawSummary}</p>
        </>
      ) : (
        <p className={`${textStyles.body} mt-6`}>
          Eligibility for {stateName} depends on the plan type behind the claim.
          Self funded ERISA plans follow the federal IDR process; some fully
          insured plans follow a state pathway.
        </p>
      )}

      <p className={`${textStyles.body} mt-6`}>
        In general, a claim qualifies for federal IDR when it is an out of network
        surgical service covered by the No Surprises Act, open negotiation has
        run its course, and the deadline to initiate has not passed.
      </p>

      <LegalFooter className="mt-8" />
    </div>
  );
}
