import { getCategories } from "@/libs/getCategories";
import { getCountries } from "@/libs/getCountries";
import { getSubCategories } from "@/libs/getSubCategories";
import AdvancedFilter from "./AdvancedFilter";
import CategoriesSlider from "./CategoriesSlider";
import SubCategoriesSlider from "./SubCategoriesSlider";

export default async function FilterSection({ selectedCategory }) {
  const countries = await getCountries();
  const categories = await getCategories("/company/categories");
  const subCategories = await getSubCategories(
    {
      category_slug: selectedCategory,
    },
    "/company/sub-categories"
  );

  return (
    <section className="explore_ads">
      <div className="container d-flex flex-column gap-2">
        {/* <CategoriesSlider categories={categories} /> */}
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
