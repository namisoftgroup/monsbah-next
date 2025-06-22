import { fetcher } from "@/utils/fetchers";

export async function getSubCategories(
  params,
  endPoint = "/client/sub-categories"
) {
  const res = await fetcher(endPoint, {
    params,
  });
  return res?.data || [];
}
