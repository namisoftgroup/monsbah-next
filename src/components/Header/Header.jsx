"use client";

import { Link } from "@/i18n/navigation";
import { useAuthModal } from "@/stores/useAuthModal";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import MoreActions from "./MoreActions";
import NavLinks from "./NavLinks";
import NotificationsDropDown from "./NotificationsDropDown";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const handleShowAuthModal = useAuthModal((state) => state.onOpen);
  const user = useAuthStore((state) => state.user);

  return (
    <header>
      <div className="container">
        <div className="mainLinks">
          <Link aria-label="Home" href="/" className="navbar-brand">
            <Image
              src="/branding/icon.svg"
              width={40}
              height={40}
              alt="Navbar icon"
            />
          </Link>

          {/* <Link
            aria-label="companies categories"
            href="/companies-categories"
            className="categories_button d-none"
          >
            <div className="img">
              <Image src="/branding/icon.svg" width={20} height={20} alt="" />
            </div>
            <span>{t("categories")}</span>
          </Link> */}

          <NavLinks />

          <div className="moreActions">
            <MoreActions />

            <LanguageSwitcher />

            <Link aria-label="Search" href="/search" className="link">
              <Image src="/icons/search.svg" width={16} height={16} alt="" />
            </Link>

            {/* {user ? <NotificationsDropDown /> : null} */}

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
    </header>
  );
}
