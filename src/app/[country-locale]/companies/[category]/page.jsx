import CompaniesSection from "@/components/companies/CompaniesSection";
import ProductList from "@/components/companies/ProductList";
import FilterCompanySection from "@/components/home/FilterCompanySection";
import { getCompanies } from "@/services/ads/getCompanies";
import { getUserType } from "@/services/auth/getUserType";
import getProducts from "@/services/products/getProducts";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";

export default async function page({ params, searchParams }) {
  const locale = await getLocale();
  const user = await getUserType();
  const { category, subcategory, sale } = await params;
  const paramsObj = await searchParams;
  
  const categoryDecoded =
    category && category !== "undefined" ? decodeURIComponent(category) : null;
  const subCategoryDecoded =
    subcategory && subcategory !== "undefined"
      ? decodeURIComponent(subcategory)
      : null;
  const saleDecoded =
    sale && sale !== "undefined" ? decodeURIComponent(sale) : null;


  // Create a QueryClient for server-side
  const queryClient = getQueryClient();
  const selectedCategory = categoryDecoded;
  const [country_slug, lang] = locale.split("-");

  // Extract all search parameters
  const type = saleDecoded || null;
  const sort = paramsObj?.sort || null;
  const city_id = paramsObj?.city || null;
  const category_slug = categoryDecoded || null;
  const sub_category_slug = subCategoryDecoded || null;
  const search = paramsObj?.search || null;

  // Prefetch products with ALL parameters including search
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

  // Prefetch companies
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["companies", country_slug, city_id, category_slug, lang, search],
    queryFn: ({ pageParam = 1 }) =>
      getCompanies({
        pageParam,
        city_id,
        country_slug,
        category_slug,
        lang,
        search,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });

  return (
    <>
      <div className="pt-4 pb-4">
        <FilterCompanySection selectedCategory={selectedCategory} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CompaniesSection />
        </HydrationBoundary>
      </div>
    </>
  );
}
