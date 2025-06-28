import { useAuthStore } from "@/stores/useAuthStore";
import clientAxios from "@/libs/axios/clientAxios";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetNotifications() {
  const token = useAuthStore((state) => state.token);

  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications"],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await clientAxios.get(
        `/${localStorage.getItem("user_type")}/notifications`,
        {
          params: {
            page: pageParam,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    data: data?.pages.flatMap((page) => page.data) || [],
    total: data?.pages?.[0]?.total || 0,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useGetNotifications;
