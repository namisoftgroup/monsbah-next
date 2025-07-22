import serverAxios from "@/libs/axios/severAxios";

export async function getSubCategories(
  params,
  endPoint = "/client/sub-categories"
) {
  try {
    const res = await serverAxios.get(endPoint, {
      params: params,
    });

    const data = res?.data?.data?.data;

    return data;
  } catch (error) {
    console.log("Error Fetching subcategories ", error);
    throw error;
  }
}
