"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export default function SideBar({ categoryList }) {
  const t = useTranslations();

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const handleSelectCategory = useCallback(
    (newValue) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newValue === "") {
        params.delete("category");
      } else {
        params.set("category", newValue);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="col-lg-2 col-md-3 col-4 p-lg-2 p-1">
      <div className="categories_sidebar">
        <button
          aria-label="Category"
          className={`category ${selectedCategory === null ? "active" : ""}`}
          onClick={() => {
            handleSelectCategory("");
          }}
        >
          <div className="img">
            <img src="/icons/all.svg" alt="" />
          </div>
          <h6>{t("all")}</h6>
        </button>

        {categoryList?.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              handleSelectCategory(category?.slug);
            }}
            className={`category ${
              category?.name === selectedCategory ? "active" : ""
            }`}
          >
            <div className="img">
              <img src={category?.image} alt="" />
            </div>
            <h6>{category?.name}</h6>
          </button>
        ))}
      </div>
    </div>
  );
}
