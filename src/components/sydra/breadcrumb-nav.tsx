import Link from "next/link";

type BreadcrumbNavProps = {
  items: { name: string; path: string }[];
};

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path || "home"} className="flex items-center gap-x-2">
              {index > 0 ? (
                <span aria-hidden className="text-slate-300">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="font-medium text-[#1A2B48]">
                  {item.name}
                </span>
              ) : (
                <Link
                  className="rounded-sm text-slate-500 transition-colors duration-200 hover:text-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  href={item.path || "/"}
                >
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
