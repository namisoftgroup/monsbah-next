"use client";

import CategoriesSlider from "./CategoriesSlider";
import SubCategoriesSlider from "./SubCategoriesSlider";
import AdvancedFilter from "./AdvancedFilter";
import useGetCountries from "@/hooks/queries/settings/useGetCountries";

export default function FilterSection({
  categories,
  subCategories,
  selectedCategory,
}) {
  const { data: countries } = useGetCountries();
  
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
