import FilterSection from "@/components/home/FilterSection";
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import { getUserType } from "@/services/auth/getUserType";
import getProducts from "@/services/products/getProducts";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata({ params }) {
  const { category, subcategory } = await params;
  const categoryDecoded =
    category && category !== "undefined" ? decodeURIComponent(category) : null;
  const subCategoryDecoded =
    subcategory && subcategory !== "undefined"
      ? decodeURIComponent(subcategory)
      : null;
  let pathname = "/";
  if (categoryDecoded && subCategoryDecoded) {
    pathname = `/${categoryDecoded}/${subCategoryDecoded}`;
  } else if (categoryDecoded) {
    pathname = `/${categoryDecoded}`;
  }
  const alternates = generateHreflangAlternates(pathname);
  return { alternates };
}

export default async function page({ params, searchParams }) {
  const { category, subcategory } = await params;
  const categoryDecoded =
    category && category !== "undefined" ? decodeURIComponent(category) : null;
  const subCategoryDecoded =
    subcategory && subcategory !== "undefined"
      ? decodeURIComponent(subcategory)
      : null;

  const paramsObj = await searchParams;
  const user = await getUserType();
  const locale = await getLocale();

  // Create a QueryClient for server-side
  const queryClient = getQueryClient();
  const selectedCategory = categoryDecoded;
  const [country_slug, lang] = locale.split("-");

  // Extract all search parameters
  const sort = paramsObj?.type || null;
  const type = paramsObj?.type || null;
  const city_id = paramsObj?.city || null;
  const category_slug = categoryDecoded || null;
  const sub_category_slug = subCategoryDecoded || null;
  const search = paramsObj?.search || null;

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
      search,
      user,
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
        search,
        user,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });

  return (
    <>
      <HeroSection />
      <FilterSection selectedCategory={selectedCategory} />{" "}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsSection userType={user} />
      </HydrationBoundary>
    </>
  );
}
