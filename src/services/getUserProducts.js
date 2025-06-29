import clientAxios from "@/libs/axios/clientAxios";

export const getUserProducts = async ({ pageParam = 1 }) => {
  try {
    const res = await clientAxios.get("/client/user-products", {
      params: { page: pageParam },
    });
    console.log(res);

    if (res.status === 200) {
      return {
        data: res.data?.data?.data,
        total: res.data?.data?.meta?.total,
        per_page: res.data?.data?.meta?.per_page,
      };
    }
  } catch (erros) {
    throw new Error("Failed to fetch products");
  }
};
