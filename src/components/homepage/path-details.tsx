import { CtaBlock } from "@/components/homepage/cta-block";
import { PathDetailLink } from "@/components/homepage/path-detail-link";
import { PATH_DETAIL_LINKS, PATH_DETAILS } from "@/lib/content/homepage";

/**
 * The four detail sections the path cards scroll to. DOM order matches the card
 * order and must not change. Backgrounds alternate so each section reads as its
 * own surface, and .anchor-under-header keeps the heading clear of the sticky
 * header when a card link lands here.
 *
 * Each section carries a deep link to the page written for that audience, above
 * the CTA block, so a visitor who wants to read before converting has somewhere
 * to go. See PATH_DETAIL_LINKS for the destination rationale.
 */
export function PathDetails() {
  return (
    <>
      {PATH_DETAILS.map((detail, index) => {
        const link = PATH_DETAIL_LINKS[detail.id];
        return (
          <section
            aria-labelledby={`${detail.id}-heading`}
            className={`anchor-under-header px-4 py-12 md:px-6 md:py-16 lg:px-8 ${
              index % 2 === 0 ? "bg-white" : "bg-neutral-section"
            }`}
            id={detail.id}
            key={detail.id}
          >
            <div className="mx-auto w-full max-w-[1200px]">
              <h2 className="home-h2 max-w-[720px] text-brand" id={`${detail.id}-heading`}>
                {detail.heading}
              </h2>
              <p className="home-lead mt-5 max-w-[64ch] text-body">{detail.body}</p>
              {link ? (
                <p className="mt-4">
                  <PathDetailLink href={link.href} label={link.label} placement={detail.id} />
                </p>
              ) : null}
              <CtaBlock
                headingId={`${detail.id}-cta-heading`}
                headingLevel="h3"
                placement={detail.id}
              />
            </div>
          </section>
        );
      })}
    </>
  );
}
