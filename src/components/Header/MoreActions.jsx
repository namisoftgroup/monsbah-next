"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MoreActions = () => {
  const t = useTranslations("header");
  return (
    <>
      <button
        aria-label="Get App"
        className="customBtn"
        style={{ whiteSpace: "nowrap" }}
      >
        {t("getApp")}
      </button>
      <Link
        aria-label="add post"
        href="/profile/addAd"
        className="link text d-lg-flex d-none"
      >
        <Image src="/icons/plus.svg" width={16} height={16} alt="" />
        {t("addPost")}
      </Link>
    </>
  );
};

export default MoreActions;
