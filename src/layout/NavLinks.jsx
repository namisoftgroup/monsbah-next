"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const NavLinks = () => {
  const t = useTranslations("header");

  return (
    <nav className="navbar navbar-expand-lg d-lg-flex d-none ">
      <div className="navbar-nav">
        <Link aria-label="Home" className="logo" href="/">
          <Image
            src="/branding/logo.svg"
            width={120}
            height={40}
            alt="logo image"
          />
        </Link>

        <Link className="navLink" href="/">
          {t("home")}
        </Link>
        <Link className="navLink" href="/categories">
          {t("categories")}
        </Link>
        <Link className="navLink" href="/companies">
          {t("companies")}
        </Link>
        <Link className="navLink" href="/about">
          {t("aboutUs")}
        </Link>
        <Link className="navLink" href="/blogs">
          {t("blogs")}
        </Link>
        <Link className="navLink" href="/chats">
          {t("chats")}
        </Link>
        <Link className="navLink" href="/contact">
          {t("contact")}
        </Link>
      </div>
    </nav>
  );
};

export default NavLinks;
