"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { logout as logoutAction } from "@/libs/actions/logoutAction";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

export default function LogoutComponent() {
  const t = useTranslations("profile");
  const [loading, setisLoading] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();

  const performLogout = async () => {
    setisLoading(true);
    try {
      const res = await logoutAction();
      if (res?.status === 200) {
        toast.success(res?.message);
        router.replace("/");
        logout();
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <button onClick={() => performLogout()} disabled={loading}>
      <i className={`fa-regular fa-arrow-right-from-bracket mr-2`} />
      {t("logout")}
    </button>
  );
}
