import { fetcher } from "@/utils/fetchers";

export async function getBlogs() {
  const res = await fetcher("/client/blogs");
  return res?.data || [];
}
