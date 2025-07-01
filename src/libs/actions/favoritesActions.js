"use server";

import { revalidatePath } from "next/cache";
import serverAxios from "../axios/severAxios";

export async function toggleFavorite(productId, userType) {
  console.log("iam in fav action");

  try {
    const res = await serverAxios.post(`/${userType}/store-favorite`, {
      product_id: productId,
    });
    if (res.status === 200) {
      console.log(res?.data);
      revalidatePath("/profile/favorites")

      return res.data;
    }
  } catch (error) {
    console.error("Server Action error:", error?.response?.data?.message);
    throw new Error(error);
  }
}
