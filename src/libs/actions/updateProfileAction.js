"use server";

import { revalidatePath } from "next/cache";
import serverAxios from "../axios/severAxios";
import { z } from "zod";
import { cookies } from "next/headers";

export async function updateProfileAction(formData) {
  const requestbody = new FormData();

  const form = new FormData();

  form.append("name", formData.name);
  form.append("username", formData.username);
  form.append("phone", formData.phone);
  form.append("email", formData.email);
  form.append("city_id", formData.city_id);
  form.append("state_id", formData.state_id);
  form.append("about_ar", formData.description_ar);
  form.append("about_en", formData.description_en);
  form.append("country_id", formData.country_id);
  form.append("country_code", formData.country_code);
  form.append("fcm_token", formData.fcm_token);
  form.append("image", formData.image);
  form.append("cover", formData.cover);

  try {
    const res = await serverAxios.post(
      "/client/auth/profile/update",
      requestbody,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res?.status === 200) {
      revalidatePath("/profile");
      return res?.data;
    }
  } catch (error) {
    console.error("Server action error:", error);
    throw new Error(error?.response?.data?.message);
  }
}

// !-----------------------  Change password Action ------------------------------!

export async function changePasswordAction(formData) {
  const cookiesStore = await cookies();
  const userType = cookiesStore.get("user_type").value;

  const endpoint = `/${
    userType === "user" ? "client" : "company"
  }/auth/change-password `;
  try {
    const response = await serverAxios.post(endpoint, formData);

    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error", error);

    throw new Error(error?.response?.data?.message);
  }
}
