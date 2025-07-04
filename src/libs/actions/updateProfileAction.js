"use server";

import { getUserType } from "@/services/auth/getUserType";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import serverAxios from "../axios/severAxios";

export async function updateProfileAction(formData) {
  const form = new FormData();

  form.append("name", formData.name);
  form.append("username", formData.username);
  form.append("phone", formData.phone);
  form.append("email", formData.email);
  form.append("city_id", formData.city_id);
  form.append("state_id", formData.state_id);
  form.append("about_ar", formData.about_ar);
  form.append("about_en", formData.about_en);
  form.append("country_id", formData.country_id);
  form.append("country_code", formData.country_code);
  form.append("fcm_token", formData.fcm_token);
  // Only append new image if it's a File
  if (formData.image instanceof File) {
    form.append("image", formData.image);
  }

  if (formData.cover instanceof File) {
    form.append("cover", formData.cover);
  }

  try {
    const res = await serverAxios.post("/client/auth/profile/update", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res?.status === 200) {
      revalidatePath("/profile/settings");
      return res?.data;
    }
  } catch (error) {
    console.error("Server action error:", error);
    throw new Error(error?.response?.data?.message);
  }
}

// !-----------------------  Change password Action ------------------------------!

export async function changePasswordAction(formData) {
  const userType = await getUserType();
  const endPoint = `/${userType}/auth/change-password `;
  try {
    const response = await serverAxios.post(endPoint, formData);

    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error", error);

    throw new Error(error?.response?.data?.message);
  }
}
