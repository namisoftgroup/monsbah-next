import { getCategories } from "@/services/categories/getCategories";
import { getCountries } from "@/services/getCountries";
import { getSubCategories } from "@/services/categories/getSubCategories";
import AdvancedFilter from "./AdvancedFilter";
import SubCategoriesSlider from "./SubCategoriesSlider";
import CategoriesSlider from "./CategoriesSlider";
import { getUserType } from "@/services/auth/getUserType";

export default async function FilterSection({ selectedCategory }) {
  const countries = await getCountries();
  const user = await getUserType();
  const categories = await getCategories(`/${user}/categories`);

  const subCategories = selectedCategory
    ? await getSubCategories(
        {
          category_slug: selectedCategory,
        },
        `/${user}/sub-categories`
      )
    : [];

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
