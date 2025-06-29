import { CATEGORY_TYPES } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DEFAULT_VALUES = {
  name_ar: "",
  name_en: "",
  price: "",
  category_id: "",
  sub_category_id: "",
  city_id: "",
  state_id: "",
  country_id: "",
  phone: "",
  country_code: "",
  currency_id: "",
  description_ar: "",
  description_en: "",
  type: CATEGORY_TYPES.SALE,
  active_chat: "inactive",
  active_whatsapp: "inactive",
  active_call: "inactive",
  image: null,
  images: [],
  delete_images: [],
};

export const getSchema = (t) =>
  z.object({
    name_ar: z
      .string()
      .nonempty(t("name_ar_required"))
      .refine(
        (val) => val.trim().split(/\s+/).length <= 5,
        t("name_word_limit")
      ),

    name_en: z
      .string()
      .nonempty(t("name_en_required"))
      .refine(
        (val) => val.trim().split(/\s+/).length <= 5,
        t("name_word_limit")
      ),

    price: z.union([z.string(), z.number()]).optional(),

    category_id: z.union([z.string(), z.number()], {
      required_error: t("category_required"),
    }),
    sub_category_id: z.union([z.string(), z.number()], {
      required_error: t("subcategory_required"),
    }),
    city_id: z.union([z.string(), z.number()], {
      required_error: t("city_required"),
    }),
    state_id: z.union([z.string(), z.number()], {
      required_error: t("state_required"),
    }),
    country_id: z.union([z.string(), z.number()], {
      required_error: t("country_required"),
    }),

    phone: z.string().min(5, t("phone_required")),
    country_code: z.string().min(1, t("country_code_required")),
    currency_id: z.union([z.string(), z.number()]).optional(),

    description_ar: z.string().min(1, t("description_ar_required")),
    description_en: z.string().min(1, t("description_en_required")),

    type: z.enum(["sale", "rent"], {
      required_error: t("type_required"),
    }),

    active_chat: z.enum(["active", "inactive"], {
      required_error: t("chat_status_required"),
    }),
    active_whatsapp: z.enum(["active", "inactive"], {
      required_error: t("whatsapp_status_required"),
    }),
    active_call: z.enum(["active", "inactive"], {
      required_error: t("call_status_required"),
    }),

    image: z.any().optional(),
    images: z.array(z.any()).optional(),
    delete_images: z.array(z.any()).optional(),
  });

export default function useAddAdForm() {
  const t = useTranslations("validations");

  const methods = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(getSchema(t)),
    mode: "onBlur",
  });

  return methods;
}
