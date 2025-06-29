"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { logout as logoutAction } from "@/libs/actions/logoutAction";
import { useAuthStore } from "@/stores/useAuthStore";
import { PROFILE_TABS } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const ProfileTabs = () => {
  const t = useTranslations("profile");
  const pathname = usePathname().split("/");
  const activeTab = pathname[pathname.length - 1];
  const router = useRouter();
  const { logout } = useAuthStore();

  const performLogout = async () => {
    try {
      const res = await logoutAction();
      if (res?.status === 200) {
        toast.success(res?.message);
        router.replace("/");
        logout();
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="tabs-section">
      <ul className="profileNavCol nav nav-tabs">
        {PROFILE_TABS.map((tab) => (
          <li className="nav-item" key={tab.key}>
            <Link
              href={`/profile/${tab.key}`}
              className={activeTab === tab?.key ? "active" : ""}
            >
              <i className={`fa-regular ${tab.icon} mr-2`} />
              {t(`${tab.key}`)}
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <button onClick={() => performLogout()}>
            <i className={`fa-regular fa-arrow-right-from-bracket mr-2`} />
            {t("logout")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileTabs;
