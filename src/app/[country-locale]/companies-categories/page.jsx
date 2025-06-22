import { getCategories } from "@/libs/getCategories";
import CategoriesSection from "@/components/companies/CategoriesSection";

export default async function CompanyCategories() {
  const categories = await getCategories("/company/categories");

  console.log("Company Categories:", categories);
  return <CategoriesSection categories={categories} />;
}
