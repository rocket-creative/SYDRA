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

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
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
  matcher: ["/admin/:path*"],
};
