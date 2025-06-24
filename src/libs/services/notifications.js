import clientAxios from "@/utils/axios/clientAxios";

export async function getNotifications(page = 1) {
  const endPoint = `/${localStorage.getItem("userType")}/notifications`;
  try {
    const res = await clientAxios.get(`/${endPoint}/notifications`, {
      params: {
        page,
      },
    });
    return {
      data: res.data?.data?.data,
      total: res.data?.data?.meta?.total,
      per_page: res.data?.data?.meta?.per_page,
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}
