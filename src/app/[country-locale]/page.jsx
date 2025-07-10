import FilterSection from "@/components/home/FilterSection";
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";

export async function generateMetadata() {
  return {
    other: {
      "google-site-verification": "kOD-M71HEym30Cx4W8U0FqAJXpQy8f5TgdYkxqNXeAk",
    },
  };
}

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
