import { fetcher } from "@/utils/fetchers";

export async function getCategories(endPoint = "/client/categories") {
  const res = await fetcher(endPoint);
  return res?.data || [];
}
