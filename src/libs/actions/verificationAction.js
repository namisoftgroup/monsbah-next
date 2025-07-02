"use server";

import serverAxios from "../axios/severAxios";

export async function verificationAction(requestBody) {
  try {
    const response = await serverAxios.post(
      "/client/store-verification",
      requestBody
    );

    if (response.status === 200) {
      revalidatePath("/");
      return response.data;
    }

    return req.data.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to submit product";
    console.error("Submit product error:", message);
    throw new Error(error);
  }
}
