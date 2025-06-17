"use client";

import { useEffect, useState } from "react";
import { useAuthModal } from "@/stores/useAuthModal";
import { useTranslations } from "next-intl";
import PasswordField from "@/ui/forms/PasswordField";
import SubmitButton from "@/ui/forms/SubmitButton";
import PhoneInput from "@/ui/forms/PhoneInput";
import ChooseUserType from "./ChooseUserType";
import useLoginForm from "@/hooks/controllers/useLoginForm";
import useGetCurrentLocation from "@/hooks/queries/settings/useGetCurrentLocation";

export default function Login() {
  const t = useTranslations("auth");
  const setFormType = useAuthModal((state) => state.setFormType);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { data: currentLocation } = useGetCurrentLocation();
  const { errors, register } = useLoginForm();

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
      <div className="mb-4">
        <h2 className="head">
          {t("loginTitle")} <img src="/icons/waving-hand.svg" alt="hand-wave" />
        </h2>
        <p className="sub-head">{t("loginSubtitle")}</p>
      </div>

      <ChooseUserType />

      <form className="form">
        <PhoneInput
          label={t("phone")}
          placeholder={t("phone")}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          error={errors.phone?.message}
          limit={selectedCountry?.number_limit}
          {...register("phone")}
        />

        <PasswordField
          label={t("password")}
          placeholder={t("password")}
          error={errors.password?.message}
          {...register("password")}
        />

        <span
          className="forgetpass"
          style={{ cursor: "pointer" }}
          onClick={() => setFormType("forget")}
        >
          {t("forgetPassword")}
        </span>

        <SubmitButton text={t("login")} />

        <span className="noAccount text-center">
          {t("noAccount")}{" "}
          <button
            className="btn-register mt-2"
            type="button"
            onClick={() => setFormType("register-type")}
          >
            {t("register")}
          </button>
        </span>
      </form>
    </>
  );
}
