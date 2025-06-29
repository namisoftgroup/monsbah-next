"use server";

import { cookies } from "next/headers";
import serverAxios from "../axios/severAxios";

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("there is no token");
    return;
  }

  try {
    const res = await serverAxios.get("/client/auth/logout", {
      token,
    });

    if (res?.data?.status === "200") {
      cookieStore.delete("token");
      cookieStore.delete("userType");
      delete serverAxios.defaults.headers.common["Authorization"];
    }
    return res?.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error(error.message);
  }
}
