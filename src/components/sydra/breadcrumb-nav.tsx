import Link from "next/link";

import { textStyles } from "@/lib/typography";

type Crumb = { name: string; path: string };

type BreadcrumbNavProps = {
  items: readonly Crumb[];
};

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path || "home"} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden className="text-body/40">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="font-medium text-brand">
                  {item.name}
                </span>
              ) : (
                <Link className={`${textStyles.textLink} font-normal`} href={item.path || "/"}>
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
