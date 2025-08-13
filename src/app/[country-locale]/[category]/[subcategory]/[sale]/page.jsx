import FilterSection from "@/components/home/FilterSection";
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import CompaniesList from "@/components/search/CompaniesList";
import { getUserType } from "@/services/auth/getUserType";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";
import React from "react";

export default async function page({ params, searchParams }) {
  const { category, subCategory, sale } = await params;
  const categoryDecoded = decodeURIComponent(category);
  const subCategoryDecoded = decodeURIComponent(subCategory);
  const saleDecoded = decodeURIComponent(sale);
  const paramsObj = await searchParams;
  const user = await getUserType();
  const locale = await getLocale();
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

  const hasCategory = !!categoryDecoded;
  const hasSubcategory = !!subCategoryDecoded;
  const showCompanies = !hasSubcategory && hasCategory && user === "company";

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
      <HeroSection />
      <FilterSection selectedCategory={selectedCategory} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        {showCompanies ? (
          <CompaniesList />
        ) : (
          <ProductsSection userType={user} />
        )}
      </HydrationBoundary>
    </>
  );
}
