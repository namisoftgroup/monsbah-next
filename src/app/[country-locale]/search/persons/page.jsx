import PersonsList from "@/components/search/PersonsList";
import { getPersons } from "@/services/ads/getPersons";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

export default async function page({ searchParams }) {
  const search = (await searchParams)?.search;
  const t = await getTranslations();
  const lang = (await getLocale()).split("-")[1];

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["ads", lang, search],
    queryFn: ({ pageParam = 1 }) => getPersons(search, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });

  return (
    <>
      <div className="col-12 p-2">
        <h6 className="title">{t("popularPersons")}</h6>
        <p className="desc">{t("popularPersonsDesc")}</p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PersonsList />
      </HydrationBoundary>
    </>
  );
}
