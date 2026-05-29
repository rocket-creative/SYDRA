import { Section } from "@/components/ui/section";
import { EditorialImage } from "@/components/ui/editorial-image";
import { textStyles } from "@/lib/typography";

const prepSteps = [
  "Pull and parse the EOB",
  "Verify eligibility and cooling off period status",
  "Build a CPT specific payment offer",
  "Draft clinical necessity from the operative note",
  "Match market rates to prior determinations",
  "Prepare provider credentials",
  "Format for the IDRE portal",
] as const;

export function SydraTimeCost() {
  return (
    <Section
      ariaLabelledby="heading-time-cost"
      id="time-cost"
      sidebarLabel="Time cost"
      tone="white"
    >
      <header className="prose-measure border-b border-rule pb-8">
        <h2 className="type-h2 text-brand" id="heading-time-cost">
          What 30 minutes per claim actually costs at scale.
        </h2>
        <p className="mt-4 type-body text-body">
          Every federal IDR submission is manual work before your team ever reaches the portal.
        </p>
      </header>

      <EditorialImage
        alt="Billing team reviewing claim volume together on a laptop in a modern office"
        aspect="16/9"
        className="mt-10"
        sizes="(max-width: 1280px) 100vw, 1280px"
        src="/images/editorial/team-laptop-meeting.png"
      />

      <div className={`${textStyles.bodyStack} mt-10 space-y-10`}>
        <div>
          <h3 className="type-caption text-[var(--color-accent)]">What one submission includes</h3>
          <ul className="mt-4 space-y-2 type-body text-body">
            {prepSteps.map((step) => (
              <li key={step} className="flex gap-3">
                <span aria-hidden className="mt-[0.55rem] size-1 shrink-0 bg-[var(--color-hero)]" />
                <span className="min-w-0">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="type-caption text-[var(--color-accent)]">At 30 minutes per claim</h3>
          <ul className="mt-4 space-y-2 type-body text-body">
            <li>10 claims per month → 5 hours of biller time on IDR prep alone</li>
            <li>20 claims per month → 10 hours</li>
            <li>30 claims per month → 15 hours</li>
          </ul>
        </div>

        <div className="space-y-4 type-body text-body">
          <p>
            Most billing teams do not have 15 hours per month for a single workflow. They file
            fewer claims than they should, or none at all. CMS data shows only about 10% of
            eligible claims reach IDR (ACEP analysis).
          </p>
          <p>
            The other 90% are not filed or never reach arbitration. The insurer keeps the
            underpayment, every month.
          </p>
        </div>

        <p className="border-t border-rule pt-8 text-[17px] font-medium leading-relaxed text-brand">
          Sydra reduces prep to under 5 minutes per claim. Thirty claims per month becomes under
          2.5 hours of billing team time. Claims that were not being filed start getting filed.
        </p>
      </div>
    </Section>
  );
}
