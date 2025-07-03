import serverAxios from "@/libs/axios/severAxios";
import { cookies } from "next/headers";

export default async function getNotifications(pageParam = 1) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token").value;
  const user_type = cookiesStore.get("user_type").value;
  const endPoint = `/${
    user_type === "user" ? "client" : "company"
  }/notifications`;
  try {
    const res = await serverAxios.get(endPoint, {
      params: {
        page: pageParam,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch notifications");
  }
}
