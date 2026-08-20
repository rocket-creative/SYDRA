import {
  NO_CASE_EXAMPLE,
  PRACTICE_A,
  PRACTICE_B,
  RESULTS_DISCLAIMER,
  RESULTS_INTRO,
} from "@/lib/content/homepage";

/**
 * The tables are white cards, so the cells carry the card's inset: the outer
 * columns get the wider first:/last: padding and the header row an extra step
 * on top. Without it the first column reads flush against the white edge. The
 * section itself is white, so each card is outlined rather than relying on fill
 * to separate it from the background.
 */
const TH =
  "px-4 pt-5 pb-3 text-left align-bottom text-[13px] font-medium text-brand first:pl-6 last:pr-6";
const TD = "px-4 py-3.5 text-left align-top text-[14px] text-body first:pl-6 last:pr-6";

/**
 * NOT SPEC COPY. The proof strip above the fold shows the published 88% federal
 * win rate; the table below shows a Sydra client at 92%. Two different numbers
 * for what a skimming reader will take to be the same thing, so this names the
 * difference before the table does. It also carries the source for the 88%,
 * which the approved PROOF_CELLS copy omits.
 */
const FEDERAL_VS_CLIENT_BRIDGE =
  "The 88% figure above is the federal record across every filer in the CMS dataset (Georgetown University CHIR, March 2026). The rate below is one Sydra client's own outcome across its decided cases. They measure different things and neither predicts the other.";

/**
 * Case study data. Every figure is transcribed from the source and must not be
 * rounded, reformatted, or recalculated, and the disclaimer has to stay on this
 * page with the tables.
 *
 * Both tables keep a min-width and scroll inside their own container on narrow
 * screens rather than stacking into definition lists, so the values stay in one
 * crawlable table with real column headers.
 */
export function Results() {
  return (
    <section
      aria-labelledby="results-heading"
      className="anchor-under-header bg-white px-4 py-12 md:px-6 md:py-16 lg:px-8"
      id="results"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="home-h2 max-w-[720px] text-brand" id="results-heading">
          {RESULTS_INTRO.heading}
        </h2>
        <p className="home-lead mt-5 max-w-[70ch] text-body">{RESULTS_INTRO.body}</p>

        <div className="mt-10 md:mt-12">
          <h3 className="page-subsection-title" id="practice-a-heading">
            {PRACTICE_A.heading}
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-body">{PRACTICE_A.subLabel}</p>
          <TableScroller labelledBy="practice-a-heading">
            <table className="w-full min-w-[46rem] border-collapse border border-rule bg-white">
              <caption className="sr-only">{PRACTICE_A.caption}</caption>
              <thead>
                <tr className="border-b border-[var(--color-text)]">
                  {PRACTICE_A.columns.map((column) => (
                    <th className={TH} key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRACTICE_A.rows.map((row) => (
                  <tr className="border-b border-rule" key={row.cpt}>
                    <th className={`${TD} font-medium text-brand tabular-nums`} scope="row">
                      {row.cpt}
                    </th>
                    <td className={TD}>{row.description}</td>
                    <td className={`${TD} tabular-nums`}>{row.areaAverage}</td>
                    <td className={`${TD} tabular-nums`}>{row.median}</td>
                    <td className={`${TD} tabular-nums`}>
                      {row.caseExample ?? NO_CASE_EXAMPLE}
                      {row.footnoted ? (
                        <sup>
                          <a
                            className="footnote-marker ml-0.5 text-[var(--color-accent)] no-underline"
                            href="#results-disclaimer"
                          >
                            1
                          </a>
                        </sup>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroller>
          <p className="mt-3 type-note text-body">
            <sup>1</sup> {PRACTICE_A.footnote}
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          <h3 className="page-subsection-title" id="practice-b-heading">
            {PRACTICE_B.heading}
          </h3>
          <p className="mt-2 max-w-[80ch] type-note text-body">{FEDERAL_VS_CLIENT_BRIDGE}</p>
          <TableScroller labelledBy="practice-b-heading">
            <table className="w-full min-w-[32rem] border-collapse border border-rule bg-white">
              <caption className="sr-only">{PRACTICE_B.caption}</caption>
              <thead>
                <tr className="border-b border-[var(--color-text)]">
                  <th className={TH} scope="col">
                    {PRACTICE_B.columns[0]}
                  </th>
                  {/*
                   * The Sydra column carries the accent. The prior-firm column stays
                   * neutral: no win/loss red or green anywhere in this table. It is a
                   * scorecard against a named competitor category, and colour that
                   * editorialises the comparison is legal exposure.
                   */}
                  <th className={`${TH} text-[var(--color-accent)]`} scope="col">
                    {PRACTICE_B.columns[1]}
                  </th>
                  <th className={TH} scope="col">
                    {PRACTICE_B.columns[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRACTICE_B.rows.map((row) => (
                  <tr className="border-b border-rule" key={row.metric}>
                    <th className={`${TD} font-medium text-brand`} scope="row">
                      {row.metric}
                    </th>
                    <td
                      className={`${TD} bg-[var(--color-accent-soft)] font-medium text-brand tabular-nums`}
                    >
                      {row.sydra}
                    </td>
                    <td className={`${TD} tabular-nums`}>{row.prior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroller>
        </div>

        <p
          className="anchor-under-header mt-10 max-w-[90ch] type-note text-body md:mt-12"
          id="results-disclaimer"
        >
          {RESULTS_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}

/**
 * Horizontally scrollable table wrapper. Focusable and labelled so a keyboard
 * user can reach and scroll it, and negatively inset on phones so the table can
 * use the full viewport width inside the section gutter.
 */
function TableScroller({
  children,
  labelledBy,
}: {
  children: React.ReactNode;
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
