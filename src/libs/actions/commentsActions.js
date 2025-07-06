"use server";

import { getUserType } from "@/services/auth/getUserType";
import serverAxios from "../axios/severAxios";
import { revalidatePath } from "next/cache";

export async function AddCommentsAction(data) {
  const userType = await getUserType();

  try {
    const res = await serverAxios.post(`/${userType}/store-comment`, data);
    if (res?.status === 200) {
      revalidatePath("/product");
      return res?.data;
    }
  } catch (error) {
    console.log(error?.response?.data?.message);

    throw new Error(error?.response?.data?.message);
  }
}

export async function deleteCommentAction(data, type) {
  const userType = await getUserType();
  console.log(data);

  try {
    const res = await serverAxios.post(
      `/${userType}/${
        type === "question" ? "delete-question-comment" : "dlete-comment"
      }`,
      data
    );
    if (res?.status === 200) {
      revalidatePath("/product");
      return res?.data;
    }
  } catch (error) {
    console.log(error?.response?.data?.message);

    throw new Error(error?.response?.data?.message);
  }
}
