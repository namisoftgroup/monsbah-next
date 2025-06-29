"use client";
import InputField from "@/components/shared/forms/InputField";
import SelectField from "@/components/shared/forms/SelectField";
import useAddAdForm from "@/hooks/controllers/useAddAdForm";
import useGetCategories from "@/hooks/queries/settings/useGetCategories";
import useGetSubCategories from "@/hooks/queries/settings/useGetSubCategories";
import { useTranslations } from "next-intl";
import React from "react";
import AdTypeSelector from "./AdTypeSelector";

export default function AddAd() {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useAddAdForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const category_id = watch("category_id");

  const { data: categories } = useGetCategories();

  const { data: subcategories, isLoading: subcategoriesLoading } =
    useGetSubCategories(category_id || 1, Boolean(category_id));

  return (
    <div className="tab-content">
      <div className="tab-content-pane ">
        <form
          className="form col-12 p-2 p-md-3 reverse-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-12 p-2">
              {/* <ProductImageGallery
            productImages={productImages}
            handleImagesChange={handleImagesChange}
            handleRemoveImage={handleRemoveImage}
            disabled={productLoading}
            /> */}
            </div>
            <div className="col-12  p-2">
              <InputField
                label={t("ads.name")}
                placeholder={t("ads.nameNote")}
                id="name_ar"
                {...register("name_ar")}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={`${t("ads.mainCategory")} *`}
                id="category_id"
                {...register("category_id")}
                options={categories?.map((category) => ({
                  name: category?.name,
                  value: category?.id,
                }))}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={`${t("ads.subCategory")} *`}
                loadingText={t("isLoading")}
                loading={subcategoriesLoading}
                id="sub_category_id"
                {...register("sub_category_id")}
                options={subcategories?.map((subcategory) => ({
                  name: subcategory?.name,
                  value: subcategory?.id,
                }))}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("ads.price")}
                placeholder={t("ads.priceNote")}
                id="price"
                {...register("price")}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <AdTypeSelector
                register={register}
                control={control}
                // disabled={productLoading}
                // handleChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
