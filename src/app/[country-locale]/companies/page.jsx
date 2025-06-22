import CompaniesSection from "@/components/companies/CompaniesSection";
import FilterSection from "@/components/home/FilterSection";
import { getCategories } from "@/libs/getCategories";
import { getSubCategories } from "@/libs/getSubCategories";

export default async function Companies({ searchParams }) {
  const paramsObj = await searchParams;
  const selectedCategory = paramsObj?.category;

  const categories = await getCategories("/company/categories");
  const subCategories = await getSubCategories("/company/sub-categories", {
    category_slug: selectedCategory,
  });

  return (
    <div className="pt-4 pb-4">
      <FilterSection
        selectedCategory={selectedCategory}
        categories={categories}
        subCategories={subCategories}
      />
      <CompaniesSection/>
    </div>
  );
}
