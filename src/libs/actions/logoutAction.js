"use server";

import { cookies } from "next/headers";
import serverAxios from "../axios/severAxios";
import { getUserType } from "@/services/auth/getUserType";

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userType = await getUserType();
  console.log(userType);

  if (!token) {
    console.log("there is no token");
    return;
  }

  try {
    const res = await serverAxios.get(`/${userType}/auth/logout`, {
      token,
    });

    if (res?.status === 200) {
      cookieStore.delete("token");
      cookieStore.delete("user_type");
      delete serverAxios.defaults.headers.common["Authorization"];
    }
    return res?.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Error during logout:";
    throw new Error(message);
  }
}
