import { getCategories } from "@/services/categories/getCategories";
import { getSubCategories } from "@/services/categories/getSubCategories";
import { getCountries } from "@/services/getCountries";
import AdvancedFilter from "./AdvancedFilter";
import CategoriesSlider from "./CategoriesSlider";
import SubCategoriesSlider from "./SubCategoriesSlider";

export default async function FilterCompanySection({ selectedCategory }) {
  const [countries, categories] = await Promise.all([
    getCountries(),
    getCategories(`/company/categories`),
  ]);

  const subCategories = await getSubCategories(
    {
      category_slug: selectedCategory,
    },
    `/company/sub-categories`
  );

  console.log(subCategories);

  return (
    <section className="explore_ads">
      <div className="container d-flex flex-column gap-2">
        <CategoriesSlider categories={categories} />
        {selectedCategory && (
          <SubCategoriesSlider subCategories={subCategories} />
        )}
        <AdvancedFilter
          countries={countries}
          selectedCategory={selectedCategory}
        />
      </div>
    </section>
  );
}
