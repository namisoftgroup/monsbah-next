import { getUserProducts } from "@/services/getUserProducts";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale, getTranslations } from "next-intl/server";
import AdsList from "./AdsList";
import MyAdsHeader from "./MyAdsHeader";
import { getQueryClient } from "@/utils/queryCLient";

export default async function MyAds() {
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
            <HydrationBoundary state={dehydrate(queryCLient)}>
              <AdsList />
            </HydrationBoundary>
          </div>
        </section>
      </div>
    </div>
  );
}
