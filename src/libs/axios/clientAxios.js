import { useAuthStore } from "@/stores/useAuthStore";
import { API_URL } from "@/utils/constants";
import axios from "axios";

const token = useAuthStore.getState().token;
console.log(token);

const clientAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

clientAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="));
      const lang = cookies ? cookies.split("=")[1].split("-")[1] : "ar";
      config.headers["Accept-Language"] = lang;
      config.headers["lang"] = lang;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientAxios;
