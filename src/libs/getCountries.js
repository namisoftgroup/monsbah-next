import { fetcher } from "@/utils/fetchers";

export async function getCountries() {
  const res = await fetcher("/client/countries");
  return res || [];
}
