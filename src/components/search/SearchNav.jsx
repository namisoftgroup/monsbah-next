"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuthModal } from "@/stores/useAuthModal";
import { useTranslations } from "next-intl";

export default function SearchNav({ search }) {
  const { userType } = useAuthModal((state) => state);
  const pathanmes = usePathname().split("/");
  const pathname = pathanmes[pathanmes?.length - 1];
  console.log(pathname);

  const t = useTranslations();

  return (
    <nav className="search_nav">
      {userType !== "company" && (
        <Link
          href={{ pathname: "/search", query: { search: search?.q || "" } }}
          className={pathname === "search" ? "active" : ""}
        >
          {" "}
          {t("advertisements")}
        </Link>
      )}

      {userType !== "company" && (
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

      {/* <Link href={search ? `companies-ads?search=${search}` : "companies-ads"}>
        {t("companiesAds")}
      </Link> */}
    </nav>
  );
}
