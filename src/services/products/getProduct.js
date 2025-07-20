import serverAxios from "@/libs/axios/severAxios";

export async function getProduct(slug) {
  console.log(" ---- slug ------- ", slug);

  try {
    const res = await serverAxios.get(`/client/product-details`, {
      params: {
        product_slug: slug,
      },
    });

    if (res?.status === 200) {
      return res?.data?.data;
    }
  } catch (error) {
    // console.log(error?.response?.data);
    console.log(error?.response?.data?.message);

    console.error("Error fetching product:", error.message);
    throw error;
  }
}
