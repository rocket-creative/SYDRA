import { breadcrumbJsonLd } from "@/lib/seo/json-ld";

type BreadcrumbJsonLdProps = {
  items: { name: string; path: string }[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }}
      type="application/ld+json"
    />
  );
}
