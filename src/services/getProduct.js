import serverAxios from "@/libs/axios/severAxios";

export async function getProduct(id) {
  try {
    const res = await serverAxios.get(`/client/product-details`, {
      params: {
        product_id: id,
      },
    });

    if (res?.status === 200) {
      return res?.data?.data;
    }
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw error;
  }
}
