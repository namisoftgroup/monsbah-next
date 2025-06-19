import { Link } from "@/i18n/navigation";
import React from "react";

export default function SubCategoriesList({ subCategories, selectedCategory }) {
  return (
    <div className="col-lg-10 col-md-9 col-8 p-lg-2 p-1">
      <div className="categories_slider subcategories_slider">
        {subCategories?.map((sub) => (
          <div className=" col-xl-3 col-md-4 col-6 p-1" key={sub.id}>
            <Link
              aria-label="subcategory"
              href={`/?category=${selectedCategory}&sub_category=${sub?.name}`}
              className="category sub d-flex align-items-center flex-column gap-2"
            >
              <div className="image-wrapper">
                <img src={sub?.image} alt={sub?.name} />
              </div>
              <h6>{sub?.name}</h6>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
