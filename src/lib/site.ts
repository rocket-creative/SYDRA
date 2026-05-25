export function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  return url?.replace(/\/$/, "") ?? "https://www.sydrahealth.com";
}
