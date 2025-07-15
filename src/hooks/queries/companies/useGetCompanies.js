"use client";
import clientAxios from "@/libs/axios/clientAxios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

function useGetCompanies() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const lang = locale.split("-")[1];

  const country_id = searchParams.get("country");
  const city_id = searchParams.get("city");
  const category_slug = searchParams.get("category");
  const search = searchParams.get("search");

  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["companies", country_id, city_id, category_slug, lang, search],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await clientAxios.get("/client/companies", {
        params: {
          page: pageParam,
          city_id,
          country_id,
          category_slug,
          search,
        },
      });
      if (res.status === 200) {
        console.log("response", res);

        return res.data;
      } else {
        throw new Error("Failed to fetch companies");
      }
    },

    getNextPageParam: (lastPage, pages) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
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
