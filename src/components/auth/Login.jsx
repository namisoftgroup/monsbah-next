"use client";

import { useAuthModal } from "@/stores/useAuthModal";
import { useTranslations } from "next-intl";
import PasswordField from "@/ui/forms/PasswordField";
import SubmitButton from "@/ui/forms/SubmitButton";

export default function Login() {
  const t = useTranslations("auth");
  const userState = useAuthModal((state) => state.userType);
  const setUserState = useAuthModal((state) => state.setUserType);
  const setFormType = useAuthModal((state) => state.setFormType);

  return (
    <>
      <div className="mb-4">
        <h2 className="head">
          {t("loginTitle")} <img src="/icons/waving-hand.svg" alt="hand-wave" />
        </h2>
        <p className="sub-head">{t("loginSubtitle")}</p>
      </div>

      <div className="input-field mb-4">
        <div className="radios">
          <label htmlFor="client">
            <input
              type="radio"
              name="userState"
              id="client"
              value="client"
              checked={userState === "client"}
              onChange={(e) => setUserState(e.target.value)}
            />
            <span>{t("client")}</span>
          </label>

          <label htmlFor="company">
            <input
              type="radio"
              name="userState"
              id="company"
              value="company"
              checked={userState === "company"}
              onChange={(e) => setUserState(e.target.value)}
            />
            <span>{t("company")}</span>
          </label>
        </div>
      </div>

      <form className="form">
        {/* <PhoneInput
          label={t("phone")}
          required
          type="number"
          id="phone"
          name="phone"
          placeholder={t("phone")}
          value={formData.mobile_number}
          countryCode={formData.country_code}
          onChange={(e) => handleChange(e, setFormData)}
          onSelect={(code, setShow) => {
            setFormData((prev) => ({ ...prev, country_code: code }));
            setShow(false);
          }}
        /> */}

        <PasswordField label={t("password")} placeholder={t("password")} />

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
