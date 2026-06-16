type LegalFooterProps = {
  className?: string;
};

/**
 * Eligibility guidance is a legal surface; every entity page carries this
 * disclaimer (playbook section 11).
 */
export function LegalFooter({ className = "" }: LegalFooterProps) {
  return (
    <p className={`type-caption text-body/70 ${className}`}>
      This page is general information about the No Surprises Act dispute process,
      not legal advice. Eligibility depends on the specific plan, claim, and
      current federal and state rules. Confirm details for your claim before
      filing.
    </p>
  );
}
