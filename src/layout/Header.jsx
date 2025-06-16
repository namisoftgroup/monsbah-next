"use client";

import { useAuthModal } from "@/stores/useAuthModal";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import GetApp from "@/ui/modals/GetApp";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [show, setShow] = useState(false);
  const t = useTranslations("header");
  const handleShowAuthModal = useAuthModal((state) => state.onOpen);

  return (
    <header>
      <div className="container">
        <div className="mainLinks">
          <Link aria-label="Home" href="/" className="navbar-brand">
            <Image src="/branding/icon.svg" width={40} height={40} alt="" />
          </Link>

          <Link
            aria-label="companies categories"
            href="/companies-categories"
            className="categories_button d-none"
          >
            <div className="img">
              <Image src="/branding/icon.svg" width={20} height={20} alt="" />
            </div>
            <span>{t("categories")}</span>
          </Link>

          <nav className="navbar navbar-expand-lg d-lg-flex d-none ">
            <div className="navbar-nav">
              <Link aria-label="Home" className="logo" href="/">
                <Image
                  src="/branding/logo.svg"
                  width={120}
                  height={40}
                  alt=""
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

          <div className="moreActions">
            <Link
              aria-label="Get App"
              href="/companies-categories"
              className="customBtn"
            >
              {t("categories")}
            </Link>

            <Link
              aria-label="add post"
              href="/profile?tab=addAd"
              className="link text d-lg-flex d-none"
            >
              <Image src="/icons/plus.svg" width={16} height={16} alt="" />
              {t("addPost")}
            </Link>

            <LanguageSwitcher />

            <Link aria-label="Search" href="/search" className="link">
              <Image src="/icons/search.svg" width={16} height={16} alt="" />
            </Link>

            <button
              aria-label="Login"
              className="link"
              onClick={handleShowAuthModal}
            >
              <img src="/icons/user.svg" alt="user" />
            </button>
          </div>
        </div>
      </div>

      <GetApp show={show} setShow={setShow} />
    </header>
  );
}
