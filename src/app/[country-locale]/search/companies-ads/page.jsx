import CompaniesAds from "@/components/companies/CompaniesAds";
import { getAuthedUser } from "@/services/auth/getAuthedUser";
import { getCompanyProducts } from "@/services/companies/getCompanyProducts";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";

export default async function page({ searchParams }) {
  const storeSearchparams = await searchParams;
  const lang = (await getLocale()).split("-")[1];
  const authedUser = await getAuthedUser();
  const id = authedUser?.id;
  const {
    search,
    country_id,
    city_id,
    category_id,
    type,
    sort,
    sub_category_id,
  } = storeSearchparams;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "company-products",
      country_id,
      type,
      sort,
      city_id,
      id,
      category_id,
      sub_category_id,
      lang,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getCompanyProducts({
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompaniesAds />
    </HydrationBoundary>
  );
}
