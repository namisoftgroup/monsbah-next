"use client";

import { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

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

      params.delete("sub_category");
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
              selectedCategory == category.slug ? "active" : ""
            }`}
            onClick={() => handleSelectCategory(category.slug)}
            aria-label={`Category ${category.slug}`}
          >
            <div className="img">
              <img src={category?.image} alt={category?.slug} />
            </div>
            <h6>{category?.slug}</h6>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
