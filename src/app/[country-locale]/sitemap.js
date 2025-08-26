import { LOCALES } from "@/i18n/routing";
import { getBlogs } from "@/services/blogs/getBlogs";
import { getCategories } from "@/services/categories/getCategories";
import getProducts from "@/services/products/getProducts";
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

// Function to get all products for sitemap
async function getAllProductsForSitemap() {
  try {
    // Get products from first user (just to get products, user_id might not matter for client products)
    const productsResponse = await getProducts({
      pageParam: 1,
      lang: "ar",
      country_slug: "sa",
      user: "client",
    });

    let allProducts = [];

    if (productsResponse?.data?.data) {
      allProducts = productsResponse.data.data;

      // If there are more pages, fetch them too
      const totalPages = productsResponse?.data?.meta?.last_page || 1;

      for (let page = 2; page <= Math.min(totalPages, 50); page++) {
        // Limit to 50 pages to avoid timeout
        try {
          const pageResponse = await getProducts({
            pageParam: page,
            lang: "ar",
            country_slug: "sa",
            user: "client",
          });

          if (pageResponse?.data?.data) {
            allProducts = [...allProducts, ...pageResponse.data.data];
          }
        } catch (error) {
          console.error(`Error fetching products page ${page}:`, error);
          break;
        }
      }
    }

    return allProducts;
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    return [];
  }
}

// Function to get all blogs for sitemap
async function getAllBlogsForSitemap() {
  try {
    const blogs = await getBlogs();
    return blogs || [];
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
    return [];
  }
}

// Function to get all categories for sitemap
async function getAllCategoriesForSitemap() {
  try {
    const categories = await getCategories();
    return categories || [];
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
    return [];
  }
}

export default async function sitemap() {
  try {
    const sitemapEntries = [];

    // Get dynamic data
    const [products, blogs, categories] = await Promise.all([
      getAllProductsForSitemap(),
      getAllBlogsForSitemap(),
      getAllCategoriesForSitemap(),
    ]);

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

    // Add dynamic product pages for all locales
    LOCALES.forEach((locale) => {
      products.forEach((product) => {
        if (product?.slug && product?.id) {
          sitemapEntries.push({
            url: `${BASE_URL}/${locale}/product/${product.slug}-id=${product.id}`,
            lastModified: new Date(
              product.updated_at || product.created_at || new Date()
            ),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
    });

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

    // Add category pages for all locales
    LOCALES.forEach((locale) => {
      categories.forEach((category) => {
        if (category?.slug) {
          sitemapEntries.push({
            url: `${BASE_URL}/${locale}/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      });
    });

    // Add company product pages (if they exist)
    LOCALES.forEach((locale) => {
      products.forEach((product) => {
        if (
          product?.slug &&
          product?.id &&
          product?.user?.user_type === "company"
        ) {
          sitemapEntries.push({
            url: `${BASE_URL}/${locale}/company-product/${product.slug}-id=${product.id}`,
            lastModified: new Date(
              product.updated_at || product.created_at || new Date()
            ),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
    });

    return sitemapEntries;
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return basic sitemap with static pages only in case of error
    const fallbackEntries = [];
    LOCALES.forEach((locale) => {
      STATIC_PAGES.slice(0, 5).forEach((page) => {
        // Only include first 5 static pages as fallback
        fallbackEntries.push({
          url: `${BASE_URL}/${locale}${page}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: page === "/" ? 1.0 : 0.8,
        });
      });
    });

    return fallbackEntries;
  }
}
