import { fetcher } from "@/utils/fetchers";

export async function getSubCategories(
  endPoint = "/client/sub-categories",
  params
) {
  const res = await fetcher(endPoint, {
    params,
  });
  return res?.data || [];
}
