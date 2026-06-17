import { Button } from "@/components/ui/button";
import type { ComposedDenial } from "@/lib/idr/denial-engine";
import { CTA, DISCLAIMER, PROMISE, WAIT_HOOK } from "@/lib/idr/copy";
import type { StatePathway } from "@/lib/idr/state-pathways";
import { statePathwaySentence } from "@/lib/idr/pain-content";
import { textStyles } from "@/lib/typography";

/**
 * Pain first catalog page blocks (build spec section 3). The DIFFERENT blocks
 * (code line, denial reasons, state pathway) are composed from data and carry
 * the uniqueness. The SAME blocks (promise, disclaimer, wait hook, CTA) are
 * constants in George's voice and never carry a per page number.
 */

/** 3.2 What the code is. One line. */
export function CodeLine({ line }: { line: string }) {
  return <p className={`${textStyles.body} prose-measure`}>{line}</p>;
}

/** 3.3 Why claims like this get denied. The difference engine. */
export function DenialReasons({ denial }: { denial: ComposedDenial }) {
  if (denial.reasons.length === 0) return null;
  return (
    <div className="prose-measure">
      <h2 className={textStyles.sectionTitle}>Why claims like this get denied.</h2>
      <p className={`${textStyles.body} mt-4`}>{denial.intro}</p>
      <ul className="mt-8 divide-y divide-[var(--color-rule)] border-y border-rule">
        {denial.reasons.map((reason) => (
          <li className="py-5" key={reason.key}>
            <p className="type-caption uppercase tracking-[0.08em] text-body/70">
              {reason.headline}
            </p>
            <p className={`${textStyles.body} mt-2`}>{reason.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 3.4 The promise + 3.5 the disclaimer, directly under it. SAME everywhere. */
export function PromiseAndDisclaimer() {
  return (
    <div className="prose-measure">
      <h2 className={textStyles.sectionTitle}>We do this for you.</h2>
      <p className={`${textStyles.pageLead} mt-4`}>{PROMISE}</p>
      <p className={`${textStyles.meta} mt-6`}>{DISCLAIMER}</p>
    </div>
  );
}

/** 3.6 Money is gone if you wait. The hook. SAME everywhere. */
export function WaitHookBlock() {
  return (
    <div className="prose-measure">
      <h2 className={textStyles.sectionTitle}>The window does not wait.</h2>
      <p className={`${textStyles.body} mt-4`}>{WAIT_HOOK}</p>
    </div>
  );
}

/** 3.7 The state pathway. DIFFERENT. */
export function StatePathwayBlock({ pathway }: { pathway: StatePathway }) {
  return (
    <div className="prose-measure">
      <h2 className={textStyles.sectionTitle}>
        The pathway in {pathway.name}.
      </h2>
      <p className={`${textStyles.body} mt-4`}>{statePathwaySentence(pathway)}</p>
      {pathway.differentiators.length > 0 ? (
        <ul className="mt-4 list-disc space-y-3 pl-5 type-body text-body">
          {pathway.differentiators.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** 3.8 CTA. SAME wording, DIFFERENT deep link. */
export function DenialCta({ href }: { href: string }) {
  return (
    <div className="prose-measure">
      <h2 className={textStyles.sectionTitle}>Send us this denial.</h2>
      <p className={`${textStyles.body} mt-4`}>{CTA}</p>
      <div className="mt-8">
        <Button href={href} showArrow>
          Send us this denial
        </Button>
      </div>
    </div>
  );
}
