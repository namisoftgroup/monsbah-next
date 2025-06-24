"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLayoutEffect } from "react";

export default function AuthProvider({ children }) {
  const loginInState = useAuthStore((state) => state.login);

  useLayoutEffect(() => {
    async function getUser() {
      const res = await fetch("/api/profile");
      const data = await res.json();

      if (data?.token && data?.user) {
        loginInState(data.token, data.user);
      }
    }
    getUser();
  }, [loginInState]);

  return children;
}
