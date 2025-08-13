import CompaniesSection from "@/components/companies/CompaniesSection";
import ProductList from "@/components/companies/ProductList";
import FilterCompanySection from "@/components/home/FilterCompanySection";
import { getCompanies } from "@/services/ads/getCompanies";
import { getCompanyProducts } from "@/services/companies/getCompanyProducts";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ searchParams }) {
  const t = await getTranslations("meta");
  const category = (await searchParams)?.category;
  const sub_category = (await searchParams)?.sub_category;

  if (category && sub_category) {
    return {
      title: `${t(
        "companies.titleByCategorySub"
      )} ${category} - ${sub_category}`,
      description: `${t(
        "companies.descriptionByCategorySub"
      )} ${category}, ${sub_category}`,
    };
  }

  if (category) {
    return {
      title: `${t("companies.titleByCategory")} ${category}`,
      description: `${t("companies.descriptionByCategory")} ${category}`,
    };
  }

  return {
    title: t("companies.defaultTitle"),
    description: t("companies.defaultDescription"),
  };
}

export default async function Companies({ searchParams }) {
  const paramsObj = await searchParams;
  const selectedCategory = paramsObj?.category;
  const queryClient = getQueryClient();

  // Extract params from URL
  const country_slug = searchParams.country || "kw";
  const type = searchParams.type || null;
  const sort = searchParams.sort || null;
  const city_id = paramsObj?.city || null;
  const category_slug = searchParams.category || null;
  const sub_category_slug = searchParams.sub_category || null;
  const lang = searchParams.lang || "en";
  const search = searchParams.search || null;
  // const id = params?.id || null;

  const hasCategory = !!paramsObj?.category;
  const hasSubcategory = !!paramsObj?.sub_category;

  const shouldShowCompanies = Boolean(!hasSubcategory && hasCategory);

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "company-products",
      country_slug,
      type,
      sort,
      city_id,
      // id,
      category_slug,
      sub_category_slug,
      lang,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getCompanyProducts({
        pageParam,
        lang,
        country_slug,
        type,
        sort,
        city_slug,
        category_slug,
        sub_category_slug,
        id,
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
    <div className="pt-4 pb-4">
      <FilterCompanySection selectedCategory={selectedCategory} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        {shouldShowCompanies ? <CompaniesSection /> : <ProductList />}
      </HydrationBoundary>
    </div>
  );
}
