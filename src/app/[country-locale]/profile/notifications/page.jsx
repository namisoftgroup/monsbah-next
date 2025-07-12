import NotificationList from "@/components/profile/notifications/NotificationList";
import getNotifications from "@/services/notifications/getNotifications";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("meta");

  return {
    title: t("notifications.title"),
    description: t("notifications.description"),
  };
}

export default async function page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 1 }) => getNotifications(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });

  return (
    <div className="tab-content">
      <div className="tab-content-pane ">
        <div className="Dashpoard_section w-100">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <NotificationList />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}
