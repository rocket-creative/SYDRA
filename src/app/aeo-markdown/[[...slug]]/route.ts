import { allMarkdownHtmlPaths } from "@/lib/aeo/markdown-paths";
import { markdownForHtmlPath } from "@/lib/aeo/page-markdown";

export const dynamicParams = true;
export const revalidate = 86400;

type RouteProps = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return allMarkdownHtmlPaths().map((htmlPath) => {
    if (htmlPath === "/") return { slug: [] };
    return { slug: htmlPath.replace(/^\//, "").split("/") };
  });
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const htmlPath = slug?.length ? `/${slug.join("/")}` : "/";
  const body = markdownForHtmlPath(htmlPath);
  if (!body) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
