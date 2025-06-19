import { fetcher } from "@/utils/fetchers";

export async function getSubCategories(params) {
  const res = await fetcher("/client/sub-categories", {
    params,
  });
  return res?.data || [];
}
