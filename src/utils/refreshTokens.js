import { cookies } from "next/headers";
import { API_URL } from "./constants";

export async function refreshToken() {
  const cookiesStore = await cookies();

  const res = await fetch(API_URL + "/client/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: cookiesStore.get("refreshToken")?.value }),
  });

  const data = await res.json();
  console.log("------------data", data);

  const newToken = data.data?.token;
  const newExpires = data.data?.token_expires_at;

  if (newToken) {
    return { token: newToken, expires: newExpires };
  } else {
    return null;
  }
}
