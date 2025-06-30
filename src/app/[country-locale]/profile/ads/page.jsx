import AdsList from "@/components/profile/ads/AdsList";
import MyAdsHeader from "@/components/profile/ads/MyAdsHeader";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale, getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations();

  const queryCLient = getQueryClient();

  const locale = await getLocale();

  const lang = locale.split("-")[1];

  await queryCLient.prefetchInfiniteQuery({
    queryKey: ["user-products", lang],
    queryFn: ({ pageParam = 1 }) => getUserProducts({ pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const isMore = lastPage.data.length >= lastPage.per_page;
      return isMore ? pages.length + 1 : undefined;
    },
  });
  return (
    <div className="tab-content">
      <div className="tab-content-pane ">
        <section className="products_section w-100">
          <div className="row">
            <MyAdsHeader />
          </div>
          <HydrationBoundary state={dehydrate(queryCLient)}>
            <AdsList />
          </HydrationBoundary>
        </section>
      </div>
    </div>
  );
}
