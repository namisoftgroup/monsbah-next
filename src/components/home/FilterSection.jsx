import { getCategories } from "@/libs/getCategories";
import { getCountries } from "@/libs/getCountries";
import CategoriesSlider from "./CategoriesSlider";
import SubCategoriesSlider from "./SubCategoriesSlider";
import AdvancedFilter from "./AdvancedFilter";

export default async function FilterSection() {
  const categories = await getCategories();
  const countries = await getCountries();

  return (
    <section className="explore_ads">
      <div className="container d-flex flex-column gap-2">
        <CategoriesSlider categories={categories} />
        <SubCategoriesSlider />
        <AdvancedFilter countries={countries} />
      </div>
    </section>
  );
}
