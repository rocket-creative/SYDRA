import { HomepageBand } from "@/components/landing/homepage-band";
import { CtaLink } from "@/components/ui/cta-link";
import { CALL_CTA_LABEL } from "@/lib/case-review";
import { THESIS } from "@/lib/content/homepage";

export function UnderuseStatement() {
  return (
    <HomepageBand
      ariaLabelledby="heading-underuse"
      id="very-few-practices"
      statement
      tone="white"
    >
      <div className="max-w-[720px]">
        <h2 className="type-h2 text-brand" id="heading-underuse">
          Very few practices use it.
        </h2>
        <p className="type-lead mt-6 text-body">
          The process is deadline driven, document heavy, and unforgiving of administrative error. So
          the work either goes undone, or it gets handed to a contingency firm that takes 20 percent
          or more of whatever comes back.
        </p>
      </div>
    </HomepageBand>
  );
}

export function ProcessProblemStatement() {
  return (
    <HomepageBand
      ariaLabelledby="heading-process-problem"
      id="process-problem"
      statement
      tone="white"
    >
      <div className="max-w-[720px]">
        {/* THESIS, not a second wording of it. See the note in landing/hero.tsx. */}
        <h2 className="type-h2 text-brand" id="heading-process-problem">
          {THESIS.heading}
        </h2>
        <p className="type-lead mt-6 text-body">{THESIS.body}</p>
        <p className="type-lead mt-6 text-body">
          We would welcome a short call to walk through where your out of network volume sits and
          what a realistic pathway looks like. Fifteen minutes is usually enough to tell whether this
          is worth either of our time.
        </p>
        <p className="mt-8">
          <CtaLink href="/demo">{CALL_CTA_LABEL}</CtaLink>
        </p>
      </div>
    </HomepageBand>
  );
}
