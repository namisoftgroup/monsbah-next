"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

export default function useLoginForm() {
  const t = useTranslations("validations");

  const schema = z.object({
    phone: z.string().nonempty(t("required")),
    password: z.string().min(6, t("password_too_short")),
    country_code: z.string().nonempty(),
    fcm_token: z.string().optional(),
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
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
    watch,
    handleSubmit,
    errors,
  };
}
