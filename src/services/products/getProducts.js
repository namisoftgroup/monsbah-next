import serverAxios from "@/libs/axios/severAxios";

export default async function getProducts({
  pageParam = 1,
  lang,
  country_slug,
  type,
  sort,
  city_id,
  category_slug,
  sub_category_slug,
  userType,
}) {
  const res = await serverAxios.get(`/${userType}/products`, {
    params: {
      page: pageParam,
      country_slug,
      type,
      sort,
      city_id,
      category_slug,
      sub_category_slug,
    },
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Failed to fetch products");
  }
}
