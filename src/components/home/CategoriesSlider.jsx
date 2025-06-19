"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CategoriesSlider({ categories }) {
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
    <Swiper slidesPerView="auto" className="categories_slider">
      <SwiperSlide className="p-1">
        <button
          aria-label="Category"
          className={`category ${!selectedCategory ? "active" : ""}`}
          onClick={() => handleSelectCategory("")}
        >
          <div className="img">
            <img src="/icons/all.svg" alt="All Categories" />
          </div>
          <h6>{t("all")}</h6>
        </button>
      </SwiperSlide>

      {categories.map((category) => (
        <SwiperSlide key={category.id} className="p-1">
          <button
            className={`category ${
              selectedCategory == category.name ? "active" : ""
            }`}
            onClick={() => handleSelectCategory(category.name)}
            aria-label={`Category ${category.name}`}
          >
            <div className="img">
              <img src={category?.image} alt={category?.name} />
            </div>
            <h6>{category?.name}</h6>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
