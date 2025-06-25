import { fetcher } from "@/utils/fetchers";

export async function getSliders() {
  const res = await fetcher("/client/sliders");
  return res?.data || [];
}
