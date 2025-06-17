"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";

export default function useLoginForm(numberLimit) {
  const t = useTranslations("validations");

  const schema = z.object({
    phone: z
      .string()
      .nonempty(t("required"))
      .min(numberLimit, t("invalid_phone")),
    password: z.string().min(6, t("password_too_short")),
    country_code: z.string().nonempty(),
    fcm_token: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      phone: "",
      password: "",
      country_code: "",
      fcm_token: "",
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
    reset,
  };
}
