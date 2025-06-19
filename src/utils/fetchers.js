import { API_URL } from "@/utils/constants";
import { getLocale } from "next-intl/server";

export async function fetcher(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  let lang = "ar";

  try {
    const locale = await getLocale();
    lang = locale?.split("-")[1] || "en";
  } catch (err) {
    console.warn("⚠️ Failed to get locale:", err);
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    lang,
    ...options.headers,
  };

  const config = {
    method: options.method || "GET",
    headers,
    next: options.next || { cache: "force-cache" },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, config);

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    console.error(`❌ Error fetching ${url}:`, errorText);
    throw new Error("Failed to fetch resource");
  }

  const json = await res.json();

  return json?.data;
}
