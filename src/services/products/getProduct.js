import serverAxios from "@/libs/axios/severAxios";

export async function getProduct(slug) {
  try {
    const res = await serverAxios.get(`/client/product-details/${slug}`);

    if (res?.status === 200) {
      return res?.data?.data;
    }
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw error;
  }
}
