export function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  return url?.replace(/\/$/, "") ?? "https://sweet-kleicha-729ceb.netlify.app";
}
