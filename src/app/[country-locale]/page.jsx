import FilterSection from "@/components/home/FilterSection";
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import { getCompanies } from "@/services/ads/getCompanies";
import { getUserType } from "@/services/auth/getUserType";
import getProducts from "@/services/products/getProducts";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function generateMetadata() {
  return {
    other: {
      "google-site-verification": "kOD-M71HEym30Cx4W8U0FqAJXpQy8f5TgdYkxqNXeAk",
    },
  };
}

export default async function Home({ searchParams }) {
  const paramsObj = await searchParams;
  const user = await getUserType();
  // Create a QueryClient for server-side
  const queryClient = getQueryClient();

  const selectedCategory = paramsObj?.category;

  const [country_slug, lang] = locale.split("-");
  const type = searchParams?.type || null;
  const sort = searchParams?.sort || null;
  const city_id = searchParams?.city || null;
  const category_slug = searchParams?.category || null;
  const sub_category_slug = searchParams?.sub_category || null;
  const search = searchParams?.search || null;
  // Prefetch products
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "products",
      lang,
      country_slug,
      type,
      sort,
      city_id,
      category_slug,
      sub_category_slug,
      userType,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({
        pageParam,
        lang,
        country_slug,
        type,
        sort,
        city_id,
        category_slug,
        sub_category_slug,
        userType,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });

  // Prefetch companies
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["companies", country_slug, city_id, category_slug, lang, search],
    queryFn: ({ pageParam = 1 }) =>
      getCompanies({ pageParam, city_id, country_slug, category_slug, search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });
  return (
    <>
      <HeroSection />
      <FilterSection selectedCategory={selectedCategory} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsSection userType={user} />
      </HydrationBoundary>
    </>
  );
}
