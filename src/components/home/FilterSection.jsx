"use client";

import CategoriesSlider from "./CategoriesSlider";
import SubCategoriesSlider from "./SubCategoriesSlider";
import AdvancedFilter from "./AdvancedFilter";

export default function FilterSection({
  categories,
  countries,
  subCategories,
  selectedCategory,
}) {
  return (
    <section className="explore_ads">
      <div className="container d-flex flex-column gap-2">
        <CategoriesSlider categories={categories} />
        {selectedCategory && (
          <SubCategoriesSlider subCategories={subCategories} />
        )}
        <AdvancedFilter countries={countries} />
      </div>
    </section>
  );
}
