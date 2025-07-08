import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
// export default createMiddleware(routing);
const intlMiddleware = createMiddleware(routing);

export function middleware(req) {
  const res = intlMiddleware(req);
  const token = req.cookies.get("token");
  const { pathname, searchParams } = req.nextUrl;
  console.log(pathname);

  const locale = pathname.split("/")[1];
  console.log(locale);
  const protectedRoutes = [
    "/profile",
    "/chats",
    "/profile/notifications",
    "profile/settings",
    "/profile/ads",
    "/profile/addAd",
    "/profile/favorites",
    "/profile/verification",
  ].map((route) => `/${locale}${route}`);
  const normalizedPathname = pathname.replace(/\/$/, "");
  if (protectedRoutes.some((route) => normalizedPathname.startsWith(route))) {
    if (!token) {
      const homeUrl = new URL(`/${locale}/`, req.url);
      homeUrl.searchParams.set("authModal", "true");
      return NextResponse.redirect(homeUrl);
    }
  }
  return res;
}
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
