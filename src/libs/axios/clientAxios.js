// lib/axios/clientAxios.ts
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
      console.log("Language from cookies:", lang);
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
