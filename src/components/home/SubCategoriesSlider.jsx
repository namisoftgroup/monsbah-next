"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SubCategoriesSlider() {
  const t = useTranslations();
  
  return (
    <Swiper slidesPerView="auto" className="categories_slider">
      <SwiperSlide className="p-1">
        <button aria-label="Subcategory" className="category sub active">
          <h6>{t("all")}</h6>
        </button>
      </SwiperSlide>

      {/* {subCategories?.map((sub) => (
        <SwiperSlide key={sub.id} className="p-1">
          <button className="category sub">
            <h6>{sub?.name}</h6>
          </button>
        </SwiperSlide>
      ))} */}
    </Swiper>
  );
}
