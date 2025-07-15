"use client";

import clientAxios from "@/libs/axios/clientAxios";
import { useAuthModal } from "@/stores/useAuthModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

function useGetProducts(userType) {
  const searchParams = useSearchParams();
  const lang = useLocale().split("-")[1];

  const country_id = searchParams.get("country");
  const type = searchParams.get("type");
  const sort = searchParams.get("sort");
  const city_id = searchParams.get("city");
  const category_slug = searchParams.get("category");
  const sub_category_slug = searchParams.get("sub_category");

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
      country_id,
      type,
      sort,
      city_id,
      category_slug,
      sub_category_slug,
    ],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await clientAxios.get(`/${userType}/products`, {
        params: {
          page: pageParam,
          country_id: country_id,
          type: type,
          sort: sort,
          city_id: city_id,
          category_slug: category_slug,
          sub_category_slug: sub_category_slug,
        },
      });
      if (res.status === 200) {
        return {
          data: res.data?.data?.data,
          total: res.data?.data?.meta?.total,
          per_page: res.data?.data?.meta?.per_page,
        };
      } else {
        throw new Error("Failed to fetch products");
      }
    },

    getNextPageParam: (lastPage, pages) => {
      const isMore = lastPage.data.length >= lastPage.per_page;
      return isMore ? pages.length + 1 : undefined;
    },
  });

  return {
    isLoading,
    data: data?.pages.flatMap((page) => page.data),
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useGetProducts;
