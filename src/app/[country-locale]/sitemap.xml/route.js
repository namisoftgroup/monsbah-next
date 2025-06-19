export async function GET() {
  const baseUrl = "https://www.monsbah.com";

  const staticPaths = ["", "/about", "/contact"];
  const dynamicPaths = ["/products/item-1", "/products/item-2"];

  const urls = [...staticPaths, ...dynamicPaths].map(
    (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
