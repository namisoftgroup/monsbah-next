import { LOCALES } from "@/i18n/routing";
import { getBlogs } from "@/services/blogs/getBlogs";
import { BASE_URL } from "@/utils/constants";

export const dynamic = "force-dynamic";

// Function to get all blogs for sitemap  <mcreference link="https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap" index="1">1</mcreference>
async function getAllBlogsForSitemap() {
  try {
    const blogs = await getBlogs();
    return blogs || [];
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
    return [];
  }
}

export async function GET() {
  try {
    const sitemapEntries = [];

    // Get blogs data
    const blogs = await getAllBlogsForSitemap();

    // Add dynamic blog pages for all locales
    LOCALES.forEach((locale) => {
      blogs.forEach((blog) => {
        if (blog?.slug || blog?.id) {
          // Use slug if available, otherwise use id
          const blogIdentifier = blog.slug || blog.id;
          sitemapEntries.push({
            url: `${BASE_URL}/${locale}/blogs/${blogIdentifier}`,
            lastModified: new Date(
              blog.updated_at || blog.created_at || new Date()
            ),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
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
    console.error("Error generating blogs sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}