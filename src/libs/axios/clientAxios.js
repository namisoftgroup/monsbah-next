// lib/axios/clientAxios.ts
import { useAuthStore } from "@/stores/useAuthStore";
import { API_URL } from "@/utils/constants";
import axios from "axios";

const clientAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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

      // ✅ Auth token from Zustand
      const { token } = useAuthStore((state) => state);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientAxios;
