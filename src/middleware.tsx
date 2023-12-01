import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: headers,
    },
  });

  if (request.nextUrl.pathname === "/first") {
    const token = request.nextUrl.searchParams.get("token");
    const appId = process.env.NEXT_PUBLIC_APP_ID;
    const redirect_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/install"
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/install`;

    return NextResponse.redirect(
      `https://www.wix.com/installer/install?token=${token}&appId=${appId}&redirectUrl=${redirect_url}`
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|asset|fonts|icons|favicon.ico|images).*)"],
};
