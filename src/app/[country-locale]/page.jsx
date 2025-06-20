import { getCategories } from "@/libs/getCategories";
import { getCountries } from "@/libs/getCountries";
import { getSubCategories } from "@/libs/getSubCategories";
import FilterSection from "@/components/home/FilterSection";
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";

export default async function Home({ searchParams }) {
  const paramsObj = await searchParams;
  const selectedCategory = paramsObj?.category;

  const categories = await getCategories();
  const countries = await getCountries();
  const subCategories = await getSubCategories({
    category_slug: selectedCategory,
  });

  return (
    <>
      <HeroSection />
      <FilterSection
        selectedCategory={selectedCategory}
        categories={categories}
        countries={countries}
        subCategories={subCategories}
      />
      <ProductsSection />
    </>
  );
}
