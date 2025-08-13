"use client";

import clientAxios from "@/libs/axios/clientAxios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

function useGetProducts(userType) {
  const searchParams = useSearchParams();
  const lang = useLocale().split("-")[1];
  const country_slug = useLocale().split("-")[0];
  const type = searchParams.get("type");
  const sort = searchParams.get("sort");
  const city_id = searchParams.get("city");
  const category_slug = searchParams.get("category");
  const sub_category_slug = searchParams.get("sub_category");
  const search = searchParams.get("search");
  console.log(
    "client keys",
    lang,
    country_slug,
    type,
    sort,
    city_id,
    category_slug,
    sub_category_slug,
    search
  );

  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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
      userType,
    ],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await clientAxios.get(`/${userType}/products`, {
        params: {
          page: pageParam,
          country_slug,
          type: type,
          sort: sort,
          city_id,
          category_slug,
          sub_category_slug,
          search, // Added search to params
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to fetch products");
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
    error,
    total: data?.pages?.[0]?.total || 0,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useGetProducts;
