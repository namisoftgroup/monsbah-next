"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuthModal } from "@/stores/useAuthModal";
import { useTranslations } from "next-intl";

export default function SearchNav({ search }) {
  const { userType } = useAuthModal((state) => state);
  console.log(userType);

  const pathanmes = usePathname().split("/");
  const pathname = pathanmes[pathanmes?.length - 1];

  const t = useTranslations();

  return (
    <nav className="search_nav">
      {localStorage.getItem("user_type") !== "company" && (
        <Link
          href={{ pathname: "/search", query: { search: search?.q || "" } }}
          className={pathname === "search" ? "active" : ""}
        >
          {" "}
          {t("advertisements")}
        </Link>
      )}

      {localStorage.getItem("user_type") !== "company" && (
        <Link
          href={{
            pathname: "/search/persons",
            query: { search: search?.q || "" },
          }}
          className={pathname === "persons" ? "active" : ""}
        >
          {t("persons")}
        </Link>
      )}

      <Link
        href={{
          pathname: "/search/companies",
          query: { search: search?.q || "" },
        }}
        className={pathname === "companies" ? "active" : ""}
      >
        {t("companies")}
      </Link>

      <Link
        href={{
          pathname: "/search/companies-ads",
          query: { search: search?.q || "" },
        }}
        className={pathname === "companies-ads" ? "active" : ""}
      >
        {t("companiesAds")}
      </Link>
    </nav>
  );
}
