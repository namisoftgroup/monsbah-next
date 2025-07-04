import SideBar from "@/components/categories/SideBar";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import { getCategories } from "@/services/getCategories";
import { getSubCategories } from "@/services/getSubCategories";
export default async function Categories({ searchParams }) {
  const selectedCategory = searchParams.category ?? null;
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
