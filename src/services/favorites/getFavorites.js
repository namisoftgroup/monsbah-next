import serverAxios from "@/libs/axios/severAxios";
import { cookies } from "next/headers";

export async function getFavorites(pageParam = 1) {
  const cookiesStore = await cookies();
  const userType = cookiesStore.get("user_type").value;
  const endPoint = `/${userType === "user" ? "client" : "company"}/favorites`;
  const res = await serverAxios.get(endPoint, {
    params: {
      page: pageParam,
    },
  });
  if (res.status === 200) {
    return {
      data: res.data?.data?.data,
      total: res.data?.data?.meta?.total,
      per_page: res.data?.data?.meta?.per_page,
    };
  } else {
    throw new Error("Failed to fetch products");
  }
}
