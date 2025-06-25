import { API_URL } from "@/utils/constants";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export async function fetcher(endpoint, options = {}, skipAuth = true) {
  const cookiesStore = await cookies();
  let token = cookiesStore.get("token")?.value;

  const url = new URL(`${API_URL}${endpoint}`);
  let lang = "ar";

  if (options.params && typeof options.params === "object") {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const locale = await getLocale();
    lang = locale?.split("-")[1] || "en";
  } catch (err) {
    console.warn("⚠️ Failed to get locale:", err);
  }

  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    lang,
    ...options.headers,
  };

  if (!skipAuth) {
    const token = await getAuthToken();
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  const config = {
    method: options.method || "GET",
    headers,
    next: options.next || { cache: "force-cache" },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const res = await fetch(url.toString(), config);

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    console.error(`❌ Error fetching ${url}:`, errorText);
    throw new Error("Failed to fetch resource");
  }

  const json = await res.json();

  return json?.data;
}
