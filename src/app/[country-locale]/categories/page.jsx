import SideBar from "@/components/categories/SideBar";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import ProductLoader from "@/components/shared/loaders/ProductLoader";
import SubCategoriesLoader from "@/components/shared/loaders/SubCategoriesLoader";
import { getCategories } from "@/services/getCategories";
import { Suspense } from "react";
export default async function Categories({ searchParams }) {
  const paramsObj = await searchParams;
  const selectedCategory = paramsObj?.category;
  const categories = await getCategories();

  return (
    <section className="categories-page explore_ads">
      <div className="container">
        <div className="row">
          <SideBar filter={selectedCategory} categoryList={categories} />
          <Suspense
            fallback={
              <div className="col-lg-10 col-md-9 col-8 p-lg-2 p-1">
                <div className="categories_slider subcategories_slider">
                  {[...Array(3)].map((_, index) => (
                    <div className=" col-xl-3 col-md-4 col-6 p-1" key={index}>
                      <SubCategoriesLoader />
                    </div>
                  ))}
                </div>
              </div>
            }
            key={selectedCategory}
          >
            <SubCategoriesList selectedCategory={selectedCategory} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
