import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const tabs = {
  main: dynamic(() => import("@/components/profile/main/MainInfoTab")),
  ads: dynamic(() => import("@/components/profile/ads/MyAds")),
  addAd: dynamic(() => import("@/components/profile/ads/AddAd")),
  favorites: dynamic(() => import("@/components/profile/FavoritesTab")),
  settings: dynamic(() => import("@/components/profile/SettingsTab")),
  verification: dynamic(() => import("@/components/profile/VerificationTab")),
  notifications: dynamic(() => import("@/components/profile/Notifications")),
};

export default async function Page({ params }) {
  const { tab } = await params;
  const TabComponent = tabs[tab];

  if (!TabComponent) {
    notFound();
  }

  return <TabComponent />;
}
