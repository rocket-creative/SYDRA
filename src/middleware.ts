import { NextResponse, type NextRequest } from "next/server";

function getLeadsAdminPassword(): string | null {
  const raw = process.env.LEADS_ADMIN_PASSWORD?.trim();
  return raw && raw.length > 0 ? raw : null;
}

function isAuthorized(request: NextRequest, password: string): boolean {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.slice(6));
    const colon = decoded.indexOf(":");
    if (colon < 0) return false;
    const user = decoded.slice(0, colon);
    const pass = decoded.slice(colon + 1);
    return user === "leads" && pass === password;
  } catch {
    return false;
  }
}

function markdownTwinPath(pathname: string): string | null {
  if (pathname === "/") return "/index.md";
  const hasTwin =
    /^\/(what-is-idr|how-it-works|pricing|faq|glossary|security|about|contact|case-review|idr-filing-deadline|in-house-idr|idr-for-billing-companies|idr-for-contingency-firms|sydra-vs-idr-attorney|idr-recovery-calculator|demo|schedule|roadmap|privacy|terms|do-not-sell|idr)$/.test(
      pathname,
    ) ||
    /^\/idr\/(guide|specialty)(?:\/[^/]+)?$/.test(pathname) ||
    /^\/idr\/state\/[^/]+$/.test(pathname) ||
    /^\/compare\/[^/]+$/.test(pathname) ||
    /^\/resources(?:\/updates)?(?:\/[^/]+)?$/.test(pathname);
  return hasTwin ? `${pathname}.md` : null;
}

function withMarkdownLink(request: NextRequest, response: NextResponse): NextResponse {
  const twin = markdownTwinPath(request.nextUrl.pathname);
  if (twin) {
    response.headers.set(
      "Link",
      `<${twin}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"`,
    );
  }
  return response;
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return withMarkdownLink(request, NextResponse.next());
  }

  const password = getLeadsAdminPassword();
  if (!password) {
    return new NextResponse(
      "Leads admin is not configured. Set LEADS_ADMIN_PASSWORD in the environment.",
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!isAuthorized(request, password)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sydra Leads Admin", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)",
  ],
};
