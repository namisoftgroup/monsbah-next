import { getCategories } from "@/libs/getCategories";
import { getSubCategories } from "@/libs/getSubCategories";
import SideBar from "@/components/categories/SideBar";
import SubCategoriesList from "@/components/categories/SubCategoriesList";

export default async function Categories({ searchParams }) {
  const paramsObj = await searchParams;
  const selectedCategory = paramsObj?.category;

  const categories = await getCategories();
  const subCategories = await getSubCategories({ category_id: 2 });

  return (
    <section className="categories-page explore_ads">
      <div className="container">
        <div className="row">
          <SideBar categoryList={categories} />
          <SubCategoriesList
            subCategories={subCategories}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </section>
  );
}
