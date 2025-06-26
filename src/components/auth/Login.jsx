"use client";

import { useEffect, useState } from "react";
import { useAuthModal } from "@/stores/useAuthModal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PasswordField from "@/components/shared/forms/PasswordField";
import SubmitButton from "@/components/shared/forms/SubmitButton";
import PhoneInput from "@/components/shared/forms/PhoneInput";
import ChooseUserType from "./ChooseUserType";
import useLoginForm from "@/hooks/controllers/useLoginForm";
import useGetCurrentLocation from "@/hooks/queries/settings/useGetCurrentLocation";
import { getErrorMessage } from "@/utils/get-error-message";
import { useAuthStore } from "@/stores/useAuthStore";
import { Controller } from "react-hook-form";
import { handleLogin } from "@/services/auth/LoginService";

export default function Login() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { setFormType, onClose, userType, setUserType } = useAuthModal(
    (state) => state
  );
  const loginState = useAuthStore((state) => state.login);

  const { data: currentLocation } = useGetCurrentLocation();
  const { register, handleSubmit, errors, watch, control } = useLoginForm();

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

  const onSubmit = async () => {
    try {
      setLoading(true);

      const data = await handleLogin({
        userType,
        phone: watch("phone"),
        country_code: watch("country_code"),
        password: watch("password"),
        fcm_token: watch("fcm_token"),
      });

      loginState(data.token, data.client_data);
      setUserType(
        data.client_data?.user_type === "user" ? "client" : "company"
      );
      localStorage.setItem(
        "user_type",
        data.client_data?.user_type === "user" ? "client" : "company"
      );
      onClose(false);
      router.push("/");
    } catch (error) {
      toast.error(getErrorMessage(error) || t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="head">
          {t("loginTitle")} <img src="/icons/waving-hand.svg" alt="hand-wave" />
        </h2>
        <p className="sub-head">{t("loginSubtitle")}</p>
      </div>

      <ChooseUserType setUserType={setUserType} />

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="country_code"
          control={control}
          render={({ field }) => (
            <PhoneInput
              label={t("phone")}
              id="phone"
              placeholder={t("phone")}
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

        <SubmitButton text={t("login")} loading={loading} />

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
