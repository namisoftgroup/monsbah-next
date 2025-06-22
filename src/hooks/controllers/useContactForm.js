import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

export default function useContactForm(numberLimit = 10) {
  const t = useTranslations("validations");

  const schema = z.object({
    name: z.string().nonempty(t("required")).min(2, t("name_too_short")),
    email: z.string().email(t("invalid_email")),
    phone: z
      .string()
      .nonempty(t("required"))
      .min(numberLimit, t("invalid_phone")),
    message: z.string().nonempty(t("required")).min(10, t("message_too_short")),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { mutate: submitContact, isPending } = useMutation({
    mutationFn: async (data) => {
      await axiosInstance.post("/client/store-contact", data);
    },
    onSuccess: () => {
      reset();
      toast.success(t("messageSentSuccessfully"));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("someThingWentWrong"));
    },
  });

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      submitContact(data);
    }
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    isPending,
  };
}
