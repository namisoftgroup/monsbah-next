import { LOCALES } from "@/i18n/routing";
import { BASE_URL } from "@/utils/constants";

// Static pages that exist for all locales
const STATIC_PAGES = [
  "/",
  "/about",
  "/contact",
  "/terms-and-conditions",
  "/categories",
  "/companies",
  "/blogs",
  "/sections",
  "/search",
  "/chats",
  // Profile pages (these require auth but should be in sitemap)
  "/profile",
  "/profile/ads",
  "/profile/addAd",
  "/profile/notifications",
  "/profile/favorites",
  "/profile/settings",
  "/profile/verification",
  // Company pages
  "/company-profile",
  "/edit-company-profile",
  "/add-company-product",
  "/company-verification",
  "/company-favorites",
  "/company-notification",
  "/followers",
  "/followers/followings",
  "/search/companies",
  "/search/companies-ads",
  "/search/persons",
];

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sitemapEntries = [];

    // Add static pages for all locales
    LOCALES.forEach((locale) => {
      STATIC_PAGES.forEach((page) => {
        sitemapEntries.push({
          url: `${BASE_URL}/${locale}${page}`,
          lastModified: new Date(),
          changeFrequency: page === "/" ? "daily" : "weekly",
          priority: page === "/" ? 1.0 : 0.8,
        });
      });
    });

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
        "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating static sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
