import type { ReactNode } from "react";

/**
 * The one table treatment. An outlined white card with the cell inset the card
 * needs: the outer columns get the wider first:/last: padding and the header
 * row an extra step on top. Without it the first column reads flush against the
 * card edge.
 *
 * Every comparison and data table on the site uses these so a table reads the
 * same whether it sits on a white or a grey section.
 */
export const dataTableClass = "w-full border-collapse border border-rule bg-white";

export const dataTableTh =
  "px-4 pt-5 pb-3 text-left align-bottom text-[13px] font-medium text-brand first:pl-6 last:pr-6";

export const dataTableTd =
  "px-4 py-3.5 text-left align-top text-[14px] text-body first:pl-6 last:pr-6";

/** Header rule is the text colour, so it reads heavier than the row rules under it. */
export const dataTableHeadRow = "border-b border-[var(--color-text)]";

export const dataTableBodyRow = "border-b border-rule";

/**
 * Horizontally scrollable table wrapper. Focusable and labelled so a keyboard
 * user can reach and scroll it, and negatively inset on phones so the table can
 * use the full viewport width inside the section gutter.
 */
export function TableScroller({
  children,
  labelledBy,
}: {
  children: ReactNode;
  labelledBy: string;
}) {
  return (
    <div
      aria-labelledby={labelledBy}
      className="-mx-4 mt-4 overflow-x-auto px-4 md:mx-0 md:px-0"
      role="region"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
