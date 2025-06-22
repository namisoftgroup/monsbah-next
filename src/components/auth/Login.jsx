"use client";

import { useEffect, useState } from "react";
import { useAuthModal } from "@/stores/useAuthModal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PasswordField from "@/ui/forms/PasswordField";
import SubmitButton from "@/ui/forms/SubmitButton";
import PhoneInput from "@/ui/forms/PhoneInput";
import ChooseUserType from "./ChooseUserType";
import useLoginForm from "@/hooks/controllers/useLoginForm";
import useGetCurrentLocation from "@/hooks/queries/settings/useGetCurrentLocation";

export default function Login() {
  const t = useTranslations("auth");
  const setFormType = useAuthModal((state) => state.setFormType);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [, setErrors] = useState({});

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [userType, setUserType] = useState("client");
  const [isLoading, setIsLoading] = useState(false);

  const { data: currentLocation } = useGetCurrentLocation();
  const { register, handleSubmit, errors, watch } = useLoginForm();

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

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    const endPoint =
      userType === "company" ? "/company/auth/login" : "/client/auth/login";

    formData.append("phone", selectedCountry.country_code + watch("phone"));
    formData.append("password", watch("password"));
    formData.append("country_code", selectedCountry.country_code || "");
    formData.append("fcm_token", watch("fcm_token") || "");
    formData.append("endPoint", endPoint);

    setErrors({});
    setLoading(true);

    await fetch("/api/login", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.error(data);
          if (data?.data) {
            setErrors(data.data);
          }
          throw new Error(data?.message);
        }
        return data;
      })
      .then((data) => {
        loginState(data?.data?.token, data?.data?.user);
        router.push("/");
      })
      .catch((error) => {
        const message = getErrorMessage(error);
        if (message) {
          toast.error(message);
        } else {
          toast.error(t("errors.somethingWentWrong"));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="head">
          {t("loginTitle")} <img src="/icons/waving-hand.svg" alt="hand-wave" />
        </h2>
        <p className="sub-head">{t("loginSubtitle")}</p>
      </div>

      <ChooseUserType setUserType={setUserType} />

      <form className="form" onSubmit={onSubmit}>
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
