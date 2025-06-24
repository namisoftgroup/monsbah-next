import { getCategories } from "@/libs/getCategories";
import { getSubCategories } from "@/libs/getSubCategories";
import FilterSection from "@/components/home/FilterSection";
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";

export default async function Home({ searchParams }) {
  const paramsObj = await searchParams;
  const selectedCategory = paramsObj?.category;

  return (
    <>
      <HeroSection />
      <FilterSection selectedCategory={selectedCategory} />
      <ProductsSection />
    </>
  );
}
