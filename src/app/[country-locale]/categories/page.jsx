import SideBar from "@/components/categories/SideBar";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import { getSubCategories } from "@/services/categories/getSubCategories";
import { getTranslations } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata({ searchParams }) {
  const t = await getTranslations("meta");
  const categorySlug = (await searchParams)?.category ?? null;
  const isValidSlug =
    typeof categorySlug === "string" && /^[a-z0-9-]+$/i.test(categorySlug);
  const safeSlug = isValidSlug ? categorySlug : null;

  const subCategories = await getSubCategories({
    category_slug: safeSlug,
  });

  const pathname = safeSlug
    ? `/categories?category=${safeSlug}`
    : "/categories";
  const alternates = await generateHreflangAlternates(pathname);

  return {
    title: safeSlug
      ? `${t("categories.titlePrefix")} ${safeSlug}`
      : t("categories.defaultTitle"),
    description: safeSlug
      ? `${t("categories.descriptionPrefix")} ${safeSlug}`
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
