import SideBar from "@/components/categories/SideBar";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import { getSubCategories } from "@/services/categories/getSubCategories";
import { getTranslations } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata({ searchParams }) {
  const t = await getTranslations("meta");
  const categorySlug = (await searchParams)?.category ?? null;
  const subCategories = await getSubCategories({
    category_slug: categorySlug,
  });

  const pathname = categorySlug ? `/categories?category=${categorySlug}` : "/categories";
  const alternates = generateHreflangAlternates(pathname);

  return {
    title: categorySlug
      ? `${t("categories.titlePrefix")} ${categorySlug}`
      : t("categories.defaultTitle"),
    description: categorySlug
      ? `${t("categories.descriptionPrefix")} ${categorySlug}`
      : t("categories.defaultDescription"),
    alternates,
  };
}

export default async function Categories({ searchParams }) {
  const selectedCategory = (await searchParams).category ?? null;

  return (
    <section className="categories-page explore_ads">
      <div className="container">
        <div className="row">
          <SideBar selectedCategory={selectedCategory} />
          <SubCategoriesList selectedCategory={selectedCategory} />
        </div>
      </div>
    </section>
  );
}
