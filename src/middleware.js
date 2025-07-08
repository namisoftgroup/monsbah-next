// import createMiddleware from "next-intl/middleware";
// import { routing } from "@/i18n/routing";
// import { NextRequest, NextResponse } from "next/server";
// // export default createMiddleware(routing);
// const intlMiddleware = createMiddleware(routing);

// export function middleware(req) {
//   const res = intlMiddleware(req);
//   const token = req.cookies.get("token");
//   const { pathname, searchParams } = req.nextUrl;
//   console.log(pathname);

//   const locale = pathname.split("/")[1];
//   console.log(locale);
//   const protectedRoutes = [
//     "/profile",
//     "/chats",
//     "/profile/notifications",
//     "profile/settings",
//     "/profile/ads",
//     "/profile/addAd",
//     "/profile/favorites",
//     "/profile/verification",
//   ].map((route) => `/${locale}${route}`);
//   const normalizedPathname = pathname.replace(/\/$/, "");
//   if (protectedRoutes.some((route) => normalizedPathname.startsWith(route))) {
//     if (!token) {
//       const homeUrl = new URL(`/${locale}/`, req.url);
//       homeUrl.searchParams.set("authModal", "true");
//       return NextResponse.redirect(homeUrl);
//     }
//   }
//   return res;
// }
// export const config = {
//   matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
// };

// import { routing } from "@/i18n/routing";
// import createMiddleware from "next-intl/middleware";
// import { NextResponse } from "next/server";

// const intlMiddleware = createMiddleware(routing);

// export function middleware(req) {
//   const res = intlMiddleware(req);
//   const token = req.cookies.get("token");
//   const role = req.cookies.get("user_type")?.value;
//   const { pathname } = req.nextUrl;

//   const locale = pathname.split("/")[1];
//   console.log("///////loacle/////////////////", locale);

//   const normalizedPathname = pathname.replace(/\/$/, "");

//   const protectedRoutes = [
//     "/profile",
//     "/chats",
//     "/profile/notifications",
//     "/profile/settings",
//     "/profile/ads",
//     "/profile/addAd",
//     "/profile/favorites",
//     "/profile/verification",
//     "/company-profile",
//     "/edit-company-profile",
//     "/add-company-product",
//     "/company-verification",
//     "/favorites",
//   ].map((route) => `/${locale}${route}`);

//   const restrictedForCompany = [
//     "/profile",
//     "/profile/notifications",
//     "/profile/settings",
//     "/profile/ads",
//     "/profile/addAd",
//     "/profile/favorites",
//     "/profile/verification",
//   ].map((route) => `/${locale}${route}`);

//   const restrictedForUserOrClient = [
//     "/company-profile",
//     "/edit-company-profile",
//     "/add-company-product",
//     "/company-verification",
//     "/favorites",
//   ].map((route) => `/${locale}${route}`);

//   if (protectedRoutes.some((route) => normalizedPathname.startsWith(route))) {
//     if (!token) {
//       const homeUrl = new URL(`/${locale}/`, req.url);
//       homeUrl.searchParams.set("authModal", "true");
//       return NextResponse.redirect(homeUrl);
//     }
//   }

//   //  Block company from accessing user-only features
//   if (
//     role === "company" &&
//     restrictedForCompany.some((route) => normalizedPathname.startsWith(route))
//   ) {
//     const referer = req.headers.get("referer");
//     return NextResponse.redirect(referer || `/${locale}/`);
//   }

//   //  Block user/client from accessing company-only features
//   if (
//     (role === "user" || role === "client") &&
//     restrictedForUserOrClient.some((route) =>
//       normalizedPathname.startsWith(route)
//     )
//   ) {
//     const referer = req.headers.get("referer");
//     return NextResponse.redirect(referer || `/${locale}/`);
//   }

//   return res;
// }

// export const config = {
//   matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
// };

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
    "/favorites",
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
    "/favorites",
  ].map((route) => `/${locale}${route}`);

  //  Block unauthenticated users from protected routes
  if (protectedRoutes.some((route) => normalizedPathname.startsWith(route))) {
    if (!token) {
      const homeUrl = req.nextUrl.clone();
      console.log("/////------------------homeurl --------", homeUrl);

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
