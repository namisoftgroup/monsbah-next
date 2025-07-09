"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { logout as logoutAction } from "@/libs/actions/logoutAction";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

export default function LogoutComponent({ withIcon = true }) {
  const t = useTranslations("profile");
  const [loading, setisLoading] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();

  const performLogout = async () => {
    setisLoading(true);

    const res = await logoutAction();
    if (!res?.success) {
      toast.error(error?.message);
    } else {
      toast.success(res?.data?.message);
      router.replace("/");
      logout();
    }
    setisLoading(false);
  };
  return (
    <button onClick={() => performLogout()} disabled={loading}>
      {withIcon && (
        <i className={`fa-regular fa-arrow-right-from-bracket mr-2`} />
      )}
      {t("logout")}
    </button>
  );
}
