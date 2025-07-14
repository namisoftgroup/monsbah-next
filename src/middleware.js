import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(req) {
  const res = intlMiddleware(req);
  const token = req.cookies.get("token");
  const role = req.cookies.get("user_type")?.value;
  const { pathname } = req.nextUrl;

  const locale = pathname.split("/")[1];
  const normalizedPathname = pathname.replace(/\/$/, "");

  const protectedRoutes = [
    "/profile",
    "/chats",
    "/profile/notifications",
    "/profile/settings",
    "/profile/ads",
    "/profile/addAd",
    "/profile/favorites",
    "/profile/verification",
    "/company-profile",
    "/edit-company-profile",
    "/add-company-product",
    "/company-verification",
    "/company-favorites",
  ].map((route) => `/${locale}${route}`);

  const restrictedForCompany = [
    "/profile",
    "/profile/notifications",
    "/profile/settings",
    "/profile/ads",
    "/profile/addAd",
    "/profile/favorites",
    "/profile/verification",
  ].map((route) => `/${locale}${route}`);

  const restrictedForUserOrClient = [
    "/company-profile",
    "/edit-company-profile",
    "/add-company-product",
    "/company-verification",
    "/company-favorites",
  ].map((route) => `/${locale}${route}`);

  // Block unauthenticated users from protected routes
  if (protectedRoutes.some((route) => normalizedPathname.startsWith(route))) {
    if (!token) {
      const homeUrl = req.nextUrl.clone();
      homeUrl.pathname = `/${locale}/`;
      homeUrl.searchParams.set("authModal", "true");
      return NextResponse.redirect(homeUrl);
    }
  }

  //  Block company from user-only routes
  if (
    role === "company" &&
    restrictedForCompany.some((route) => normalizedPathname.startsWith(route))
  ) {
    const referer = req.headers.get("referer");
    const redirectUrl = referer?.startsWith("http")
      ? referer
      : `${req.nextUrl.origin}/${locale}/`;
    return NextResponse.redirect(redirectUrl);
  }

  //  Block user/client from company-only routes
  if (
    (role === "user" || role === "client") &&
    restrictedForUserOrClient.some((route) =>
      normalizedPathname.startsWith(route)
    )
  ) {
    const referer = req.headers.get("referer");
    const redirectUrl = referer?.startsWith("http")
      ? referer
      : `${req.nextUrl.origin}/${locale}/`;
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
