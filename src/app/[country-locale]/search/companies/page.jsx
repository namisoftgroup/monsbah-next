import CompaniesList from "@/components/search/CompaniesList";
import { getCompanies } from "@/services/ads/getCompanies";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({ searchParams }) {
  const t = await getTranslations("meta");
  const { search, country_id, city_id, category_id } = searchParams || {};

  const hasFilters = search || country_id || city_id || category_id;

  return {
    title: hasFilters
      ? `${t("searchCompanies.title")} "${search || ""}"`
      : t("popularCompanies.title"),
    description: hasFilters
      ? `${t("searchCompanies.description")} "${search || ""}"`
      : t("popularCompanies.description"),
  };
}

export default async function pages({ searchParams }) {
  const storeSearchparams = await searchParams;
  const { search, country_id, city_id, category_id } = storeSearchparams;

  const lang = (await getLocale()).split("-")[1];

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["companies", country_id, city_id, category_id, lang, search],
    queryFn: ({ pageParam = 1 }) =>
      getCompanies(search, country_id, city_id, category_id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CompaniesList />
      </HydrationBoundary>
    </>
  );
}
