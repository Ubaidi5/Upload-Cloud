import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: headers,
    },
  });

  if (request.nextUrl.pathname === "/token") {
    const token = request.nextUrl.searchParams.get("token");
    const appId = process.env.NEXT_PUBLIC_APP_ID;

    const redirect_url =
      process.env.NODE_ENV === "development"
        ? "https://upload-cloud.loca.lt/install"
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/install`;

    return NextResponse.redirect(
      `https://www.wix.com/installer/install?token=${token}&appId=${appId}&redirectUrl=${redirect_url}`
    );
  }

  if (request.nextUrl.pathname === "/install") {
    const code = request.nextUrl.searchParams.get("code");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/install`,
      requestOptions
    );
    const data = await res.json();

    console.log({ data });

    await fetch("https://www.wixapis.com/apps/v1/bi-event", {
      method: "POST",
      headers: { Authorization: data.access_token },
      body: JSON.stringify({ eventName: "APP_FINISHED_CONFIGURATION" }),
    });

    return NextResponse.redirect(
      `https://www.wix.com/installer/close-window?access_token=${data.access_token}`
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|asset|fonts|icons|favicon.ico|images).*)"],
};
