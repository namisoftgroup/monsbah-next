import serverAxios from "@/libs/axios/severAxios";

export async function getCategories(endPoint = "/client/categories") {
  try {
    const res = await serverAxios.get("/client/categories");
    const data = res?.data;

    return res?.data?.data?.data;
  } catch (error) {
    console.log("Error fetching categories", error);

    throw error;
  }
}
