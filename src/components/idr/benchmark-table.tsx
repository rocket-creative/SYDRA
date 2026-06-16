import { formatBenchmarkDate, usd } from "@/lib/idr/format";
import { getPayerMeta } from "@/lib/idr/taxonomy";
import type { IdrBenchmark } from "@/lib/idr/types";
import { textStyles } from "@/lib/typography";

type BenchmarkTableProps = {
  aggregate: IdrBenchmark;
  payerRows: IdrBenchmark[];
  codeLabel: string;
  stateName: string;
  /** When true, render the seed-data disclaimer. */
  isSeed: boolean;
};

/**
 * The benchmark table is the page's data atom and its sales hook: the spread
 * between what insurers allow out of network and the in-network median is the
 * reason to dispute. See playbook section 5.
 */
export function BenchmarkTable({
  aggregate,
  payerRows,
  codeLabel,
  stateName,
  isSeed,
}: BenchmarkTableProps) {
  const rows = [
    {
      key: "all",
      label: "All payers (median)",
      benchmark: aggregate,
      emphasis: true,
    },
    ...payerRows.map((row) => ({
      key: row.payerSlug ?? "unknown",
      label: getPayerMeta(row.payerSlug ?? "")?.name ?? row.payerSlug ?? "Payer",
      benchmark: row,
      emphasis: false,
    })),
  ];

  return (
    <div>
      <h2 className={textStyles.sectionTitle}>
        Payment benchmarks for {codeLabel} in {stateName}.
      </h2>
      <p className={`${textStyles.body} mt-3 prose-measure`}>
        What insurers allow out of network sits well below the in network median
        and the Medicare benchmark. That spread is what federal IDR exists to
        recover.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">
            Payer by payer payment benchmarks for {codeLabel} in {stateName}
          </caption>
          <thead>
            <tr className="border-b border-rule">
              <th className="type-caption py-3 pr-4 font-normal text-body" scope="col">
                Payer
              </th>
              <th className="type-caption py-3 pr-4 text-right font-normal text-body" scope="col">
                In network median
              </th>
              <th className="type-caption py-3 pr-4 text-right font-normal text-body" scope="col">
                Medicare rate
              </th>
              <th className="type-caption py-3 pr-4 text-right font-normal text-body" scope="col">
                OON allowed
              </th>
              <th className="type-caption py-3 text-right font-normal text-body" scope="col">
                Spread
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, label, benchmark, emphasis }) => {
              const spread = benchmark.inNetworkMedian - benchmark.oonAllowed;
              return (
                <tr
                  className={`border-b border-rule ${emphasis ? "bg-neutral-section" : ""}`}
                  key={key}
                >
                  <th
                    className={`py-4 pr-4 text-sm font-normal ${emphasis ? "text-brand" : "text-body"}`}
                    scope="row"
                  >
                    {label}
                  </th>
                  <td className="py-4 pr-4 text-right text-sm tabular-nums text-brand">
                    {usd(benchmark.inNetworkMedian)}
                  </td>
                  <td className="py-4 pr-4 text-right text-sm tabular-nums text-body">
                    {usd(benchmark.medicareRate)}
                  </td>
                  <td className="py-4 pr-4 text-right text-sm tabular-nums text-body">
                    {usd(benchmark.oonAllowed)}
                  </td>
                  <td className="py-4 text-right text-sm font-medium tabular-nums text-brand">
                    {usd(spread)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className={`${textStyles.meta} mt-4`}>
        {isSeed ? (
          <>
            Illustrative placeholder figures pending machine readable file
            ingestion. Not real negotiated rates.
          </>
        ) : (
          <>
            Source: Transparency in Coverage machine readable files and CMS
            Physician Fee Schedule. Updated {formatBenchmarkDate(aggregate.updatedAt)}.
          </>
        )}
      </p>
    </div>
  );
}
