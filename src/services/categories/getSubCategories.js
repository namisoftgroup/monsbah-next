import serverAxios from "@/libs/axios/severAxios";

export async function getSubCategories(
  params,
  endPoint = "/client/sub-categories"
) {
  try {
    const res = await serverAxios.get(endPoint, {
      params: params,
    });

    console.log(res.config);

    const data = res?.data?.data?.data;
    console.log(data);

    return data;
  } catch (error) {
    console.log("Error Fetching subcategories ", error);
    throw error;
  }
}
