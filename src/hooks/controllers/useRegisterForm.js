import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";

const DEFAULT_VALUES = {
  name: "",
  username: "",
  country_code: "",
  phone: "",
  email: "",
  password: "",
  password_confirmation: "",
  country_id: "",
  city_id: "",
  state_id: "",
  fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
  gender: "female",
};

const getSchema = (t) => {
  return z
    .object({
      name: z.string().min(1, t("nameRequired")),
      username: z
        .string()
        .min(3, t("usernameTooShort"))
        .regex(/^[a-zA-Z0-9_]+$/, t("usernameEnglishOnly")),
      country_code: z.string().min(1, t("countryCodeRequired")),
      phone: z.string().min(1, t("phoneRequired")),
      email: z.string().email(t("invalidEmail")),
      password: z.string().min(6, t("passwordTooShort")),
      password_confirmation: z.string().min(6, t("passwordTooShort")),
      country_id: z.string().min(1, t("countryRequired")),
      city_id: z.string().min(1, t("cityRequired")),
      state_id: z.string().min(1, t("stateRequired")),
      fcm_token: z.string().optional(),
      gender: z.string().min(1, t("genderRequired")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("passwordsDoNotMatch"),
      path: ["password_confirmation"],
    });
};

export const useRegisterForm = () => {
  const t = useTranslations("validations");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(getSchema(t)),
    defaultValues: DEFAULT_VALUES,
  });

  return { register, handleSubmit, errors, watch };
};
