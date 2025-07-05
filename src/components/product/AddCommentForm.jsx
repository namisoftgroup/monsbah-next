"use client";

import { AddCommentsAction } from "@/libs/actions/commentsActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../shared/forms/InputField";
import SubmitButton from "../shared/forms/SubmitButton";
import { toast } from "sonner";

const getSchema = (t) =>
  z.object({
    comment: z.string().min(1, t("validations.required")),
  });
export default function AddCommentForm({ product }) {
  const [isLoading, setIsLoading] = useState();
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getSchema(t)),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    const payload = {
      produict_id: product?.id,
      ...data,
    };

    try {
      const res = await AddCommentsAction(payload);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="form addCommentForm" onSubmit={handleSubmit(onSubmit)}>
        <InputField placeholder={t("addComment")} {...register("comment")} />
        <SubmitButton loading={isLoading} text={t("send")} />
      </form>
    </div>
  );
}
