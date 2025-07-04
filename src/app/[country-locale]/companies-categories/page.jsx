import { getCategories } from "@/services/getCategories";
import CategoriesSection from "@/components/companies/CategoriesSection";

export default async function CompanyCategories() {
  const categories = await getCategories("/company/categories");

  return <CategoriesSection categories={categories} />;
}
