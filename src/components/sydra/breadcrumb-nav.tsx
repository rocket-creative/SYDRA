import Link from "next/link";

import { textStyles } from "@/lib/typography";

type Crumb = { name: string; path: string };

type BreadcrumbNavProps = {
  items: readonly Crumb[];
};

const crumbLinkClass = `${textStyles.textLink} inline-flex min-h-12 min-w-0 items-center truncate font-normal`;

function CrumbSeparator() {
  return (
    <span aria-hidden className="text-body/40">
      /
    </span>
  );
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const truncated = items.length > 3;
  const displayItems = truncated
    ? ([items[0], { name: "…", path: "", ellipsis: true as const }, items[items.length - 1]] as const)
    : items;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body">
        {displayItems.map((item, index) => {
          const isEllipsis = "ellipsis" in item && item.ellipsis;
          const isLast = index === displayItems.length - 1;
          const key = isEllipsis ? "ellipsis" : item.path || "home";

          return (
            <li key={key} className="flex min-w-0 items-center gap-2">
              {index > 0 ? <CrumbSeparator /> : null}
              {isEllipsis ? (
                <span aria-hidden className="text-body/40">
                  …
                </span>
              ) : isLast ? (
                <span
                  aria-current="page"
                  className="line-clamp-2 min-w-0 truncate font-medium text-brand"
                >
                  {item.name}
                </span>
              ) : (
                <Link className={crumbLinkClass} href={item.path || "/"}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
