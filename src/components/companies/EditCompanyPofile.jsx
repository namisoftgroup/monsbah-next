"use client";
import useEditCompanyForm from "@/hooks/controllers/useEditCompanyForm";
import useGetCities from "@/hooks/queries/settings/useGetCities";
import useGetCountries from "@/hooks/queries/settings/useGetCountries";
import useGetCurrentLocation from "@/hooks/queries/settings/useGetCurrentLocation";
import useGetStates from "@/hooks/queries/settings/useGetStates";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslations } from "use-intl";
import ImageUpload from "../shared/forms/ImageUpload";
import { extractPhoneFromCode } from "@/utils/helpers";
import InputField from "../shared/forms/InputField";
import SelectField from "../shared/forms/SelectField";
import PhoneInput from "../shared/forms/PhoneInput";
import useGetCompanyCategories from "@/hooks/queries/settings/useGetCompanyCategories";
import { DevTool } from "@hookform/devtools";

export default function EditCompanyPofile({ user }) {
  console.log("Edit company user", user);

  const [showPasswordModal, setShowPasswordModal] = useState();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
    setValue,
  } = useEditCompanyForm();

  const city_id = watch("city_id");
  const country_id = watch("country_id");
  const { data: categories } = useGetCompanyCategories();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const { data: countries } = useGetCountries();
  const { data: cities, isLoading: citiesLoading } = useGetCities(
    country_id,
    country_id ? true : false
  );
  useEffect(() => {
    reset({
      image: user?.image || "",
      cover: user?.cover || "",
      name: user?.name?.toString() || "",
      name_ar: user?.name_ar.toString() || "",
      username: user?.username.toString() || "",
      country_code: user?.country?.country_code?.toString() || "965",
      phone:
        extractPhoneFromCode(
          user?.phone,
          user?.country?.country_code
        ).toString() || "",
      email: user?.email || "",
      country_id: user?.country?.id.toString() || "",
      city_id: user?.city?.id.toString() || "",
      category_id: user?.category?.id?.toString() || "",
      state_id: user?.state?.id.toString() || "",
      about_ar: user?.about_ar || "",
      about_en: user?.about_en || "",
      fcm_token: user?.fcm_token || "",
    });
  }, [user]);

  const { data: currentLocation } = useGetCurrentLocation();
  const { data: states, isLoading: areasLoading } = useGetStates(
    city_id,
    city_id ? true : false
  );

  useEffect(() => {
    if (currentLocation) {
      setSelectedCountry(currentLocation);
    }
  }, [currentLocation]);
  useEffect(() => {
    if (selectedCountry) {
      register("country_code", {
        required: true,
        value: selectedCountry.country_code,
      });
    }
  }, [selectedCountry]);
  return (
    <>
      <form
        className="form col-12 p-1 w-100 p-md-3 reverse-form"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageUpload
              name="image"
              value={field.value}
              onChange={(file) => field.onChange(file)}
              coverValue={watch("cover")}
              onCoverChange={(file) => setValue("cover", file)}
              error={errors?.image}
              setValue={setValue}
            />
          )}
        />
        {(errors?.image || errors.cover) && (
          <p className="  fs-6 text-danger ">
            {errors?.image?.message}
            {errors?.image && errors.cover && "-"} {errors?.cover?.message}{" "}
          </p>
        )}
        <div className="form_group">
          <InputField
            label={t("auth.companyName")}
            placeholder={t("auth.userNamePlaceHolder")}
            id="username"
            {...register("name_ar")}
            error={errors?.name_ar?.message}
          />
        </div>{" "}
        <div className="form_group">
          <InputField
            label={t("auth.fullName")}
            placeholder={t("auth.fullName")}
            id="name"
            {...register("username")}
            error={errors?.username?.message}
          />{" "}
          <SelectField
            label={t("auth.category")}
            id="country_id"
            {...register("category_id")}
            options={categories?.map((c) => ({
              name: c?.name,
              value: c?.id,
            }))}
            error={errors?.category_id?.message}
          />
        </div>{" "}
        <div className="form_group">
          <SelectField
            label={t("auth.country")}
            loadingText={t("isLoading")}
            id="country_id"
            {...register("country_id")}
            options={countries?.map((country) => ({
              name: country?.name,
              value: country?.id,
            }))}
            error={errors?.country_id?.message}
          />
          <SelectField
            loading={citiesLoading}
            loadingText={t("isLoading")}
            label={t("auth.city")}
            {...register("city_id")}
            id="city_id"
            options={cities?.map((city) => ({
              name: city?.name,
              value: city?.id,
            }))}
            error={errors?.city_id?.message}
          />

          <SelectField
            loading={areasLoading}
            loadingText={t("isLoading")}
            label={t("auth.area")}
            id="state_id"
            {...register("state_id")}
            options={states?.map((state) => ({
              name: state?.name,
              value: state?.id,
            }))}
            error={errors?.state_id?.message}
          />
        </div>
        <div className="form_group">
          <Controller
            name="country_code"
            control={control}
            render={({ field }) => (
              <PhoneInput
                label={t("auth.phone")}
                id="phone"
                placeholder={t("auth.phone")}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                limit={selectedCountry?.number_limit}
                {...register("phone")}
                onCountryChange={(country) =>
                  field.onChange(country?.country_code)
                }
                error={errors?.phone?.message}
              />
            )}
          />
          <Controller
            name="country_code"
            control={control}
            render={({ field }) => (
              <PhoneInput
                label={t("auth.whatsapp")}
                id="phone"
                placeholder={t("auth.phone")}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                limit={selectedCountry?.number_limit}
                {...register("whats_number")}
                onCountryChange={(country) =>
                  field.onChange(country?.country_code)
                }
                error={errors?.phone?.message}
              />
            )}
          />
          <InputField
            label={t("auth.email")}
            placeholder={t("auth.email")}
            id="email"
            {...register("email")}
            error={errors?.email?.message}
          />
        </div>
        <DevTool control={control} />
      </form>
    </>
  );
}
