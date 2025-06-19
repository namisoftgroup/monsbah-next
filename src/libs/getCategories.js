import { API_URL } from "@/utils/constants";

export async function getCategories(lang) {
  const res = await fetch(`${API_URL}/client/categories`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      lang,
    },

    next: { cache: "force-cache" },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const json = await res.json();
  return json?.data?.data || [];
}
