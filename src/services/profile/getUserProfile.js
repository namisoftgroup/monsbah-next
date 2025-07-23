import serverAxios from "@/libs/axios/severAxios";
import { getUserType } from "../auth/getUserType";

export async function getUserProfile(profile_id) {
  const userType = await getUserType();
  try {
    const res = await serverAxios.get(`/${userType}/UserProfile`, {
      params: {
        profile_id,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error.response.data);
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}
