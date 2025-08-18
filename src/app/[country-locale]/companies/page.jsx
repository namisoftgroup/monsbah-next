import ProductList from "@/components/companies/ProductList";
import FilterCompanySection from "@/components/home/FilterCompanySection";
import { getCompanyProducts } from "@/services/companies/getCompanyProducts";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale, getTranslations } from "next-intl/server";

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

export default async function Companies({ searchParams, params }) {
  const paramsObj = await searchParams;
  const { id } = await params;
  const locale = await getLocale();

  // Create a QueryClient for server-side
  const queryClient = getQueryClient();
  const [country_slug, lang] = locale.split("-");

  // Extract all search parameters
  const type = paramsObj?.type || null;
  const sort = paramsObj?.sort || null;
  const city_id = paramsObj?.city || null;
  const category_slug = paramsObj?.category || null;
  const sub_category_slug = paramsObj?.sub_category || null;
  const search = paramsObj?.search || null;

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "company-products",
      country_slug,
      type,
      sort,
      city_id,
      id,
      category_slug,
      sub_category_slug,
      search,
      lang,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getCompanyProducts({
        pageParam,
        lang,
        country_slug,
        type,
        sort,
        city_id,
        category_slug,
        sub_category_slug,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });

  return (
    <div className="pt-4 pb-4">
      <FilterCompanySection />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </div>
  );
}
