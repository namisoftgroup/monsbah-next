import { getCategories } from "@/libs/getCategories";
import SideBar from "@/components/categories/SideBar";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <section className="categories-page explore_ads">
      <div className="container">
        <div className="row">
          <SideBar categoryList={categories} />

          {/* <div className="col-lg-10 col-md-9 col-8 p-lg-2 p-1">
            <div className="categories_slider subcategories_slider">
              {subcategoriesLoading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div className=" col-xl-3 col-md-4 col-6 p-1" key={index}>
                      <SubCategoriesLoader />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {subCategories?.map((sub) => (
                    <div className=" col-xl-3 col-md-4 col-6 p-1" key={sub.id}>
                      <Link
                        aria-label="Category"
                        to={`/?category=${sub?.category_id}&sub_category=${sub?.id}`}
                        onClick={() => handleSetParams(sub.id, "sub_category")}
                        className={`category sub d-flex align-items-center flex-column gap-2 ${
                          sub?.id === Number(selectedSubCategory)
                            ? "active"
                            : ""
                        }`}
                      >
                        <div className="image-wrapper">
                          <img src={sub?.image} alt={sub?.name} />
                        </div>
                        <h6>{sub?.name}</h6>
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
