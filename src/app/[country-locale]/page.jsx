import FilterSection from "@/components/home/FilterSection";
import HeroSection from "@/components/home/HeroSection";
import MemoizedProductsSection from "@/components/home/ProductsSection";
import { getUserType } from "@/services/auth/getUserType";

export async function generateMetadata() {
  return {
    other: {
      "google-site-verification": "kOD-M71HEym30Cx4W8U0FqAJXpQy8f5TgdYkxqNXeAk",
    },
  };
}

export default async function Home({ searchParams }) {
  const paramsObj = await searchParams;
  const user = await getUserType();
  const selectedCategory = paramsObj?.category;

  return (
    <>
      <HeroSection />
      <FilterSection selectedCategory={selectedCategory} />
      <MemoizedProductsSection userType={user} />
    </>
  );
}
