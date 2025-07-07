import serverAxios from "@/libs/axios/severAxios";

export async function getCompanies(
  search,
  country_id,
  city_id,
  category_id,
  pageParam = 1
) {
  try {
    const res = await serverAxios.get("/client/companies", {
      params: {
        page: pageParam,
        search,
        country_id,
        city_id,
        category_id,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch companies");
  }
}
