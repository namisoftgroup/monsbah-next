"use server";

import { getUserType } from "@/services/auth/getUserType";
import serverAxios from "../axios/severAxios";
import { revalidatePath } from "next/cache";

export async function toggleFollowAction(is_follow, id) {
  const userType = await getUserType();

  try {
    const res = await serverAxios.post(
      `/${userType}/${is_follow ? "delete" : "store"}-follower`,
      {
        profile_id: id,
      }
    );

    if (res?.status === 200) {
      revalidatePath(`/product/${id}`);
      return { success: true, data: res.data };
    }
  } catch (error) {
    const message = error?.response?.data?.message;
    return {
      success: false,
      message: message || "Something went wrong",
    };
  }
}
