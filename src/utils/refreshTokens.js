import { cookies } from "next/headers";
import { API_URL } from "./constants";
import serverAxios from "@/libs/axios/severAxios";

export async function refreshToken() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  try {
    const res = await serverAxios.post("/client/auth/refresh-token", {
      token,
    });
    const data = res?.data;
    const newToken = data?.data?.token;

    return newToken;
  } catch (e) {
    console.log("error Refresh Token", e);
    console.log(e);
  }
}
