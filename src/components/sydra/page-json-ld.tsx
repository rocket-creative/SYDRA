type PageJsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function PageJsonLd({ data }: PageJsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          key={`ld-${String(index)}`}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
