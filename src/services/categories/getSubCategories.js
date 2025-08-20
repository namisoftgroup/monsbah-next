import serverAxios from "@/libs/axios/severAxios";

export async function getSubCategories(
  params,
  endPoint = "/client/sub-categories"
) {
  try {
    // sanitize params to avoid invalid slugs (e.g., "@vite")
    const safeParams = params && typeof params === "object" ? { ...params } : {};
    if (
      typeof safeParams.category_slug !== "undefined" &&
      !(
        typeof safeParams.category_slug === "string" &&
        /^[a-z0-9-]+$/i.test(safeParams.category_slug)
      )
    ) {
      delete safeParams.category_slug;
    }

    const res = await serverAxios.get(endPoint, {
      params: safeParams,
    });

    const data = res?.data?.data?.data;

    return data;
  } catch (error) {
    console.log("Error Fetching subcategories ", error.config);
    throw error;
  }
}
