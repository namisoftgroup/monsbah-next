"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SubCategoriesSlider({ subCategories }) {
  const t = useTranslations();

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSubCategory = searchParams.get("sub_category");

  const handleSelectSubCategory = useCallback(
    (newValue) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newValue === "") {
        params.delete("sub_category");
      } else {
        params.set("sub_category", newValue);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <Swiper slidesPerView="auto" className="categories_slider">
      <SwiperSlide className="p-1">
        <button
          aria-label="Subcategory"
          className={`category sub ${!selectedSubCategory ? "active" : ""}`}
          onClick={() => handleSelectSubCategory("")}
        >
          <h6>{t("all")}</h6>
        </button>
      </SwiperSlide>

      {subCategories?.map((sub) => (
        <SwiperSlide key={sub.id} className="p-1">
          <button
            className={`category sub ${
              selectedSubCategory === sub?.slug ? "active" : ""
            }`}
            onClick={() => handleSelectSubCategory(sub?.slug)}
          >
            <h6>{sub?.slug}</h6>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
