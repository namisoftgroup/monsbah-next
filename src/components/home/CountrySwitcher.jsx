"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import Select from "react-select";

export default function CountrySwitcher({ countries }) {
  const t = useTranslations();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function handleCountryChange(country) {
    router.replace(pathname, {
      locale: country + "-" + locale.split("-")[1],
    });
  }

  return (
    <Select
      aria-label="Country"
      className="basic-single"
      classNamePrefix="select"
      isSearchable={false}
      placeholder={t("selectCountry")}
      
      //   isRtl={lang === "ar"}
      //   value={
      //     country
      //       ? {
      //           value: country,
      //           label: countries?.find((c) => c?.id === Number(country))?.name,
      //         }
      //       : null
      //   }

      onChange={(e) => {
        handleCountryChange(e?.value);
      }}

      options={countries?.map(({ name }) => ({
        value: name,
        label: name,
      }))}
    />
  );
}
