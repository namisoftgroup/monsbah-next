import axiosInstance from "@/utils/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

function useGetCompanies() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const lang = locale.split("-")[1];

  const country_id = searchParams.get("country");
  const city_id = searchParams.get("city");
  const category_id = searchParams.get("category");

  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["companies", country_id, city_id, category_id, lang],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("/client/companies", {
        params: {
          page: pageParam,
          city_id: city_id,
          country_id: country_id,
          category_id: category_id,
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

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
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

export default useGetCompanies;
