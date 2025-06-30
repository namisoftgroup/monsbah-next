"use server";

import { revalidatePath } from "next/cache";
import serverAxios from "../axios/severAxios";

// --------------- add ADs action ------------------------

export async function storeProductAction(formData) {
  const requestBody = buildFormData(formData);
  try {
    const response = await serverAxios.post(
      "/client/store-product",
      requestBody,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response?.data?.status === 200) {
      console.log("-------------- added -----------------");
      await revalidatePath("/profile/ads");
      return response?.data;
    }
  } catch (error) {
    console.log(error?.response.data);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while adding the Ad";

    console.error("Error Adding the Ad:", message);
    throw new Error(message);
  }
}

// --------------- Edit ADs action ------------------------

export async function updateProductAction(productId, data) {
  const requestBody = buildFormData(data);
  requestBody.id = productId;

  const response = await serverAxios.post(
    "/client/update-product",
    requestBody,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
}

function buildFormData(data) {
  const formData = new FormData();

  formData.append("name_ar", data.name_ar);
  formData.append("name_en", data.name_en);
  formData.append("price", data.price ?? "");
  formData.append("category_id", data.category_id);
  formData.append("sub_category_id", data.sub_category_id);
  formData.append("city_id", data.city_id);
  formData.append("state_id", data.state_id);
  formData.append("description_ar", data.description_ar);
  formData.append("description_en", data.description_en);
  formData.append("type", data.type);
  formData.append("active_chat", data.active_chat);
  formData.append("active_whatsapp", data.active_whatsapp);
  formData.append("active_call", data.active_call);
  formData.append("phone", data.phone);
  formData.append("country_code", data.country_code);
  formData.append("currency_id", data.currency_id ?? "");
  formData.append("country_id", data.country_id);

  // Images
  if (data.images?.length > 0) {
    formData.append("image", data.images[0]);
  }

  // Delete images

  return formData;
}

// --------------------------  delete ADs action ----------------------

export async function deleteAdAction(id) {
  try {
    const res = await serverAxios.post("/client/delete-product", {
      product_id: id,
    });

    if (res?.data?.status === 200) {
      await revalidatePath("/profile/myAds");
      return res?.data;
    }
  } catch (error) {
    console.log(error?.response.data);
    // Extract backend message
    const message =
      error?.response?.data?.message ||
      "Something went wrong while deleting the Ad";

    console.error("Error deleting the Ad:", message);
    // ✅ Throw a plain error message
    throw new Error(message);
  }
}
