import Link from "next/link";

import { textStyles } from "@/lib/typography";

type RegulatoryAsOfProps = {
  className?: string;
  /** Visible month/year stamp, e.g. "August 2026". */
  asOf?: string;
};

export function RegulatoryAsOf({
  className = "",
  asOf = "August 2026",
}: RegulatoryAsOfProps) {
  return (
    <p className={`${textStyles.meta} ${className}`.trim()}>
      Page current as of {asOf}. Federal IDR rules change; see{" "}
      <Link className={textStyles.textLink} href="/resources/updates">
        dated updates
      </Link>{" "}
      for the latest.
    </p>
  );
}
