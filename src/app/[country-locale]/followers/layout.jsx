import FollowersNav from "@/components/followers/FollowersNav";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function Layout({ children }) {
  const t = await getTranslations();
  return (
    <section className="search_section">
      <div className="container">
        {/* <nav className="search_nav">
          <Link href="/followers">{t("profile.followers")}</Link>
          <Link href="/followers/followings">{t("profile.followings")}</Link>
        </nav> */}
        <FollowersNav />
        <div className="row">{children}</div>
      </div>
    </section>
  );
}
