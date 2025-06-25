import { getCategories } from "@/services/getCategories";
import { getSubCategories } from "@/services/getSubCategories";
import SideBar from "@/components/categories/SideBar";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import { Suspense } from "react";
import DataLoader from "@/components/shared/loaders/DataLoader";
import ProductLoader from "@/components/shared/loaders/ProductLoader";
export default async function Categories({ searchParams }) {
  const paramsObj = await searchParams;
  const selectedCategory = paramsObj?.category;
  console.log("category", selectedCategory);

  const categories = await getCategories();

  return (
    <section className="categories-page explore_ads">
      <div className="container">
        <div className="row">
          <SideBar filter={selectedCategory} categoryList={categories} />
          <Suspense
            fallback={Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  className="col-lg-4 col-md-6 col-12"
                  key={`loader-${index}`}
                >
                  <ProductLoader />
                </div>
              ))}
            key={selectedCategory}
          >
            <SubCategoriesList selectedCategory={selectedCategory} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
