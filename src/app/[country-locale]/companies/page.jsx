import CompaniesSection from "@/components/companies/CompaniesSection";
import FilterSection from "@/components/home/FilterSection";
import { getCategories } from "@/services/categories/getCategories";
import { getSubCategories } from "@/services/categories/getSubCategories";

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
