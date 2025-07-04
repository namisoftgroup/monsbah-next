import serverAxios from "@/libs/axios/severAxios";
import { cookies } from "next/headers";

export async function getAuthedUser() {
  const cookieStore = await cookies();
  let userType = cookieStore.get("user_type")?.value;

  try {
    const response = await serverAxios.get(
      `/${userType === "user" ? "client" : "company"}/auth/profile`
    );

    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}
