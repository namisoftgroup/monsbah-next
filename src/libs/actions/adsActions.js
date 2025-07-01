"use server";

import { revalidatePath } from "next/cache";
import serverAxios from "../axios/severAxios";

// // --------------- add ADs action ------------------------

// export async function storeProductAction(formData) {
//   const requestBody = buildFormData(formData);
//   try {
//     const response = await serverAxios.post(
//       "/client/store-product",
//       requestBody,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );

//     if (response?.data?.status === 200) {
//       console.log("-------------- added -----------------");
//       revalidatePath("/profile/ads");
//       return response?.data;
//     }
//   } catch (error) {
//     console.log(error?.response.data);
//     const message =
//       error?.response?.data?.message ||
//       "Something went wrong while adding the Ad";
//     log;
//     console.error("Error Adding the Ad:", message);
//     throw new Error(message);
//   }
// }

// // --------------- Edit ADs action ------------------------

// export async function updateProductAction(data, productId) {
//   console.log(productId);

//   const requestBody = buildFormData(data, productId);
//   try {
//     const response = await serverAxios.post(
//       "/client/update-product",
//       requestBody,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );

//     if (response?.data?.status === 200) {
//       console.log("-------------- added -----------------");
//       revalidatePath("/profile/ads");
//       return response?.data;
//     }
//   } catch (error) {
//     console.log(error?.response.data);
//     const message =
//       error?.response?.data?.message ||
//       "Something went wrong while Editing the Ad";

//     console.error("Error Editing the Ad:", message);
//     throw new Error(message);
//   }
// }

// function buildFormData(data, id) {
//   const formData = new FormData();

//   formData.append("name_ar", data.name_ar);
//   formData.append("name_en", data.name_en);
//   formData.append("price", data.price ?? "");
//   formData.append("category_id", data.category_id);
//   formData.append("sub_category_id", data.sub_category_id);
//   formData.append("city_id", data.city_id);
//   formData.append("state_id", data.state_id);
//   formData.append("description_ar", data.description_ar);
//   formData.append("description_en", data.description_en);
//   formData.append("type", data.type);
//   formData.append("active_chat", data.active_chat);
//   formData.append("active_whatsapp", data.active_whatsapp);
//   formData.append("active_call", data.active_call);
//   formData.append("phone", data.phone);
//   formData.append("country_code", data.country_code);
//   formData.append("currency_id", data.currency_id ?? "");
//   formData.append("country_id", data.country_id);

//   // Images
//   if (data.images?.length > 0) {
//     formData.append("image", data.images[0]);
//   }
//   if (id) {
//     formData.append("id", id.toString());
//   }
//   // Delete images

//   return formData;
// }

export async function submitProduct(formData, user, id) {
  try {
    const isUpdate = Boolean(id);

    const form = new FormData();

    form.append("name_ar", formData.name_ar);
    form.append("name_en", formData.name_en);
    form.append("price", formData.price);
    form.append("category_id", formData.category_id);
    form.append("sub_category_id", formData.sub_category_id);
    form.append("city_id", formData.city_id);
    form.append("state_id", formData.state_id);
    form.append("description_ar", formData.description_ar);
    form.append("description_en", formData.description_en);
    form.append("type", formData.type);
    form.append("active_chat", formData.active_chat);
    form.append("active_whatsapp", formData.active_whatsapp);
    form.append("active_call", formData.active_call);
    form.append("country_id", formData.country_id);
    form.append("country_code", formData.country_code);
    form.append("phone", formData.phone);
    form.append("currency_id", formData.currency_id);

    if (isUpdate) {
      form.append("id", id);
    }
    if (user?.id) {
      form.append("country_id", user?.country?.id);
      form.append("currency_id", user?.country?.currency?.id);
    }

    // Delete images
    if (formData.delete_images?.length) {
      formData.delete_images.forEach((imgId) => {
        form.append("delete_images[]", imgId);
      });
    }
    // Main image
    if (formData?.images[0]?.type?.startsWith("image/")) {
      const image = formData.images[0];
      form.append("image", image);
    }

    // Additional images
    if (formData.images?.length) {
      formData.images.slice(1).forEach((imgFile) => {
        if (imgFile instanceof File) {
          form.append("images[]", imgFile);
        }
      });
    }

    const endpoint = `/client/${isUpdate ? "update-product" : "store-product"}`;

    const response = await serverAxios.post(endpoint, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);

    if (response.status === 200) {
      revalidatePath("/");
      return response.data;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to submit product";
    console.error("Submit product error:", message);
    throw new Error(error);
  }
}

// --------------------------  delete ADs action ----------------------

export async function deleteAdAction(id) {
  try {
    const res = await serverAxios.post("/client/delete-product", {
      product_id: id,
    });

    if (res?.data?.status === 200) {
      revalidatePath("/profile/myAds");
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
