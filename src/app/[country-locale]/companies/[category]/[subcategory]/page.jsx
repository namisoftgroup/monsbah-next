import ProductList from "@/components/companies/ProductList";
import FilterCompanySection from "@/components/home/FilterCompanySection";
import { getCompanyProducts } from "@/services/companies/getCompanyProducts";
import { getQueryClient } from "@/utils/queryCLient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale, getTranslations } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata({ searchParams }) {
  const t = await getTranslations("meta");
  const category = (await searchParams)?.category;
  const sub_category = (await searchParams)?.sub_category;

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (sub_category) params.set("sub_category", sub_category);
  const q = params.toString();
  const pathname = q ? `/companies?${q}` : "/companies";
  const alternates = generateHreflangAlternates(pathname);

  if (category && sub_category) {
    return {
      title: `${t(
        "companies.titleByCategorySub"
      )} ${category} - ${sub_category}`,
      description: `${t(
        "companies.descriptionByCategorySub"
      )} ${category}, ${sub_category}`,
      alternates,
    };
  }

  if (category) {
    return {
      title: `${t("companies.titleByCategory")} ${category}`,
      description: `${t("companies.descriptionByCategory")} ${category}`,
      alternates,
    };
  }

  return {
    title: t("companies.defaultTitle"),
    description: t("companies.defaultDescription"),
    alternates,
  };
}

export default async function Companies({ searchParams, params }) {
  const locale = await getLocale();
  const paramsObj = await searchParams;
  const { id, category, subcategory, sale } = await params;

  const categoryDecoded =
    category && category !== "undefined" ? decodeURIComponent(category) : null;
  const subCategoryDecoded =
    subcategory && subcategory !== "undefined"
      ? decodeURIComponent(subcategory)
      : null;

  // Create a QueryClient for server-side
  const queryClient = getQueryClient();
  const selectedCategory = categoryDecoded;
  const [country_slug, lang] = locale.split("-");

  // Extract all search parameters
  const type = paramsObj?.type || null;
  const sort = paramsObj?.sort || null;
  const city_id = paramsObj?.city || null;
  const search = paramsObj?.search || null;
  const category_slug = categoryDecoded || null;
  const sub_category_slug = subCategoryDecoded || null;

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "company-products",
      country_slug,
      type,
      sort,
      city_id,
      id,
      category_slug,
      sub_category_slug,
      search,
      lang,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getCompanyProducts({
        pageParam,
        lang,
        country_slug,
        type,
        sort,
        city_id,
        category_slug,
        sub_category_slug,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.links?.next;
      return nextUrl ? new URL(nextUrl).searchParams.get("page") : undefined;
    },
  });

  return (
    <div className="pt-4 pb-4">
      <FilterCompanySection selectedCategory={selectedCategory} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </div>
  );
}
