"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import InputField from "@/ui/forms/InputField";
import PhoneInput from "@/ui/forms/PhoneInput";
import SubmitButton from "@/ui/forms/SubmitButton";
import useContactForm from "@/hooks/controllers/useContactForm";
import useGetCurrentLocation from "@/hooks/queries/settings/useGetCurrentLocation";

export default function ContactForm() {
  const t = useTranslations("contact");
  const { register, error, handleSubmit, isPending } = useContactForm();
  const { data: currentLocation } = useGetCurrentLocation();

  const [selectedCountry, setSelectedCountry] = useState(null);

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
    <div className="col-lg-6 p-2">
      <div className="contact_form">
        <h3>{t("sendMessage")}</h3>
        <p>{t("sendSubtitle")}</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <InputField
                required
                type="text"
                name="name"
                placeholder={t("name")}
                {...register("name")}
                error={error?.name?.message}
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <PhoneInput
                type="number"
                id="phone"
                name="phone"
                placeholder={t("phone")}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                limit={selectedCountry?.number_limit}
                {...register("phone")}
                error={error?.phone?.message}
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <InputField
                required
                placeholder={t("email")}
                id="email"
                name="email"
                type="email"
                {...register("email")}
                error={error?.email?.message}
              />
            </div>
            <div className="col-12 p-2">
              <InputField
                required
                placeholder={t("message")}
                name="message"
                id="message"
                as="textarea"
                {...register("message")}
                error={error?.message?.message}
              />
            </div>
            <div className="col-12 p-2 d-flex justify-content-center">
              <SubmitButton
                text={t("send")}
                className={"contact_btn mt-3"}
                loading={isPending}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
