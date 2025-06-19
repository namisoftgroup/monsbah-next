import { fetcher } from "@/utils/fetchers";

export async function getCategories() {
  const res = await fetcher("/client/categories");
  return res?.data || [];
}
