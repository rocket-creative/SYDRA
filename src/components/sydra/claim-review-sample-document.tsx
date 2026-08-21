import { TableScroller } from "@/components/ui/data-table";
import { CLAIM_REVIEW_SAMPLE } from "@/lib/content/claim-review-sample";
import { textStyles } from "@/lib/typography";

type FactRow = {
  label: string;
  value: string;
  emphasize?: boolean;
};

function FactList({
  rows,
  caption,
  labelledBy,
}: {
  rows: readonly FactRow[];
  caption: string;
  labelledBy: string;
}) {
  return (
    <TableScroller labelledBy={labelledBy}>
      <table className="w-full min-w-[18rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((row) => (
            <tr className="border-b border-rule" key={row.label}>
              <th
                className={`py-3 pr-4 text-sm font-normal ${row.emphasize ? "text-brand" : "text-body"}`}
                scope="row"
              >
                {row.label}
              </th>
              <td
                className={`py-3 text-sm ${row.emphasize ? "font-medium text-brand" : "text-brand"}`}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableScroller>
  );
}

/** Public labeled sample. No booking link — that belongs on the delivery email. */
export function ClaimReviewSampleDocument() {
  const sample = CLAIM_REVIEW_SAMPLE;

  return (
    <article className="prose-measure">
      {sample.kicker ? (
        <p className="type-caption text-[var(--color-accent)]">{sample.kicker}</p>
      ) : null}
      <h1 className={`${textStyles.pageTitle} ${sample.kicker ? "mt-3" : ""}`} id="heading-sample-review">
        {sample.title}
      </h1>
      <p className="mt-4 text-sm text-body">{sample.preparedLine}</p>

      <section className="mt-12" aria-labelledby="heading-sample-verdict">
        <h2 className={textStyles.subsectionTitle} id="heading-sample-verdict">
          Verdict
        </h2>
        <blockquote className="mt-4 border-l-2 border-[var(--color-accent)] pl-5">
          <p className="text-lg font-medium text-brand">{sample.verdict}</p>
          <p className="mt-3 type-body text-body">{sample.verdictDetail}</p>
        </blockquote>
      </section>

      <section className="mt-12" aria-labelledby="heading-sample-why">
        <h2 className={textStyles.subsectionTitle} id="heading-sample-why">
          Why
        </h2>
        <ul className={`${textStyles.listNone} mt-4 list-disc pl-5`}>
          {sample.why.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="heading-sample-money">
        <h2 className={textStyles.subsectionTitle} id="heading-sample-money">
          The money
        </h2>
        <div className="mt-4">
          <FactList
            caption="Sample claim money"
            labelledBy="heading-sample-money"
            rows={sample.money}
          />
        </div>
        <p className="mt-4 type-body text-body">{sample.moneyNote}</p>
      </section>

      <section className="mt-12" aria-labelledby="heading-sample-clock">
        <h2 className={textStyles.subsectionTitle} id="heading-sample-clock">
          The clock
        </h2>
        <div className="mt-4">
          <FactList
            caption="Sample claim deadlines"
            labelledBy="heading-sample-clock"
            rows={sample.clock}
          />
        </div>
        <blockquote className="mt-6 border-l-2 border-[var(--color-accent)] pl-5">
          <p className="font-medium text-brand">{sample.clockCallout}</p>
          <p className="mt-3 type-body text-body">{sample.clockNote}</p>
        </blockquote>
        <p className="mt-4 type-body text-body">{sample.clockRule}</p>
      </section>

      <section className="mt-12" aria-labelledby="heading-sample-file">
        <h2 className={textStyles.subsectionTitle} id="heading-sample-file">
          What we&apos;d file
        </h2>
        <p className="mt-4 type-body text-brand">
          Offer: <strong>{sample.offer}</strong>
        </p>
        <p className="mt-4 type-body text-body">{sample.fileNote}</p>
      </section>

      <section className="mt-12" aria-labelledby="heading-sample-costs">
        <h2 className={textStyles.subsectionTitle} id="heading-sample-costs">
          What it costs to pursue
        </h2>
        <ul className={`${textStyles.listNone} mt-4 list-disc pl-5`}>
          {sample.costs.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 type-body text-body">{sample.costsNote}</p>
      </section>

      <section className="mt-12" aria-labelledby="heading-sample-next">
        <h2 className={textStyles.subsectionTitle} id="heading-sample-next">
          What happens next
        </h2>
        <h3 className={`${textStyles.subsectionTitle} mt-4`}>{sample.nextSelfHeading}</h3>
        <p className="mt-3 type-body text-body">{sample.nextSelf}</p>
        <h3 className={`${textStyles.subsectionTitle} mt-8`}>{sample.nextFullHeading}</h3>
        <p className="mt-3 type-body text-body">{sample.nextFull}</p>
      </section>

      <p className="mt-12 text-sm leading-relaxed text-body/80">{sample.footer}</p>
    </article>
  );
}
