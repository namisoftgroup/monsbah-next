"use client";
import clientAxios from "@/libs/axios/clientAxios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";

function useGetCompanies() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = useLocale();

  const lang = locale.split("-")[1];
  const country_slug = useLocale().split("-")[0];

  const city_id = searchParams.get("city");
  const category_slug =
    params.category && params.category !== "undefined"
      ? decodeURIComponent(params.category)
      : null;
  const search = searchParams.get("search");
  console.log(
    typeof country_slug,
    typeof city_id,
    typeof category_slug,
    typeof lang,
    typeof search
  );
  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["companies", country_slug, city_id, category_slug, lang, search],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await clientAxios.get("/client/companies", {
        params: {
          page: pageParam,
          city_id,
          country_slug,
          category_slug,
          search,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to fetch companies");
      }
    },

    getNextPageParam: (lastPage, pages) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
    retry: false,
  });

  return {
    isLoading,
    data,
    total: data?.pages?.[0]?.total || 0,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useGetCompanies;
