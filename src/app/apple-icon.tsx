import { createAppIconResponse } from "@/lib/seo/app-icon";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return createAppIconResponse(180);
}
