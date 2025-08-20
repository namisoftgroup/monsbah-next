import { Link } from "@/i18n/navigation";
import { getSubCategories } from "@/services/categories/getSubCategories";
import Image from "next/image";

export default async function SubCategoriesList({ selectedCategory }) {
  // const isValidSlug =
  //   typeof selectedCategory === "string" && /^[a-z0-9-]+$/i.test(selectedCategory);
  // const safeCategory = isValidSlug ? selectedCategory : null;

  const subCategories = await getSubCategories({
    category_slug: selectedCategory,
  });

  return (
    <div className="col-lg-10 col-md-9 col-8 p-lg-2 p-1">
      <div className="categories_slider subcategories_slider">
        {subCategories?.map((sub) => (
          <div className=" col-xl-3 col-md-4 col-6 p-1" key={sub.id}>
            <Link
              aria-label="subcategory"
              href={
                selectedCategory === null
                  ? `/?sub_category=${sub?.slug}`
                  : `/?category=${selectedCategory}&sub_category=${sub?.slug}`
              }
              className="category sub d-flex align-items-center flex-column gap-2"
            >
              <div className="image-wrapper" style={{ height: "200px" }}>
                <Image fill={true} src={sub?.image} alt={sub?.slug} />
              </div>
              <h6>{sub?.name}</h6>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
