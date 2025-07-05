import SideBar from "@/components/categories/SideBar";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import { getCategories } from "@/services/categories/getCategories";
import { getSubCategories } from "@/services/categories/getSubCategories";
export default async function Categories({ searchParams }) {
  const selectedCategory = (await searchParams.category) ?? null;
  const categories = await getCategories();
  const subCategories = await getSubCategories({
    category_slug: selectedCategory,
  });
  return (
    <section className="categories-page explore_ads">
      <div className="container">
        <div className="row">
          <SideBar filter={selectedCategory} categoryList={categories} />
          <SubCategoriesList
            selectedCategory={selectedCategory}
            subCategories={subCategories}
          />
        </div>
      </div>
    </section>
  );
}
