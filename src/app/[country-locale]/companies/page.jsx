import CompaniesSection from "@/components/companies/CompaniesSection";
import FilterSection from "@/components/home/FilterSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ searchParams }) {
  const t = await getTranslations("meta");
  const category = (await searchParams)?.category;
  const sub_category = (await searchParams)?.sub_category;

  if (category && sub_category) {
    return {
      title: `${t(
        "companies.titleByCategorySub"
      )} ${category} - ${sub_category}`,
      description: `${t(
        "companies.descriptionByCategorySub"
      )} ${category}, ${sub_category}`,
    };
  }

  if (category) {
    return {
      title: `${t("companies.titleByCategory")} ${category}`,
      description: `${t("companies.descriptionByCategory")} ${category}`,
    };
  }

  return {
    title: t("companies.defaultTitle"),
    description: t("companies.defaultDescription"),
  };
}

export default async function Companies({ searchParams }) {
  const paramsObj = await searchParams;
  const selectedCategory = paramsObj?.category;

  return (
    <div className="pt-4 pb-4">
      <FilterSection selectedCategory={selectedCategory} />
      <CompaniesSection />
    </div>
  );
}
