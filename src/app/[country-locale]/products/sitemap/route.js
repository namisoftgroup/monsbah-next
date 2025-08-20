import { NextResponse } from 'next/server';
import getProducts from '@/services/products/getProducts';
import { LOCALES } from '@/i18n/routing';

const BASE_URL = 'https://monsbah.com';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id') || '0');
    const locale = params['country-locale'] || 'sa-ar';
    
    // Extract country and language from locale
    const [country_slug, lang] = locale.split('-');

    // Fetch products based on chunk ID
    const products = [];
    const productsPerChunk = 100; // Reduce chunk size for better performance
    const startPage = (id * productsPerChunk / 50) + 1; // Assuming ~50 products per page
    const maxPages = Math.ceil(productsPerChunk / 50);

    for (let page = startPage; page < startPage + maxPages && products.length < productsPerChunk; page++) {
      try {
        const data = await getProducts({
          pageParam: page,
          lang: lang,
          country_slug: country_slug,
          user: 'client',
        });
        
        const list = data?.data?.data || [];
        if (!list.length) break;
        
        products.push(...list);
        
        // Check if there are more pages
        const hasNext = Boolean(data?.data?.links?.next);
        if (!hasNext) break;
      } catch (error) {
        console.error(`Error fetching products page ${page}:`, error);
        break;
      }
    }

    // Generate URLs for both regular products and company products
    const urls = [];
    
    products.forEach(product => {
      if (product?.slug && product?.id) {
        // Regular product page
        urls.push(`  <url>
    <loc>${BASE_URL}/${locale}/product/${product.slug}-id=${product.id}</loc>
    <lastmod>${new Date(product.updated_at || product.created_at || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);

        // Company product page if it's a company product
        if (product?.user?.user_type === 'company') {
          urls.push(`  <url>
    <loc>${BASE_URL}/${locale}/company-product/${product.slug}-id=${product.id}</loc>
    <lastmod>${new Date(product.updated_at || product.created_at || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
        }
      }
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate'
      },
    });
  } catch (error) {
    console.error('Error generating products sitemap chunk:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}