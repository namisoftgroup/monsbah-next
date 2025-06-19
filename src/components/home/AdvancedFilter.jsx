"use client";

import { useTranslations } from "next-intl";
import CountrySwitcher from "./CountrySwitcher";

export default function AdvancedFilter({ countries }) {
  const t = useTranslations();

  return (
    <div className="filter">
      <div className="selects">
        <CountrySwitcher countries={countries} />
        
        {/* {selectedCategory === "1" && (
          <Select
            aria-label="Product Type"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={false}
            isRtl={lang === "ar"}
            placeholder={t("productType")}
            onChange={(e) => handleSetParams(e?.value, "type")}
            value={productType}
            options={[
              { value: "", label: t("all") },
              { value: "sale", label: t("sale") },
              { value: "rent", label: t("rent") },
            ]}
          />
        )} */}
      </div>

      {/* <div className="grid_view">
        <Dropdown>
          <Dropdown.Toggle aria-label="Filter">
            <i className="fa-regular fa-arrow-up-wide-short"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSetParams("near", "sort")}>
              <i className="fa-regular fa-calendar"></i>
              <span>{t("latest")}</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSetParams("new", "sort")}>
              <i className="fa-regular fa-location-dot"></i>
              <span>{t("fromNearest")}</span>
            </Dropdown.Item>

            <Dropdown.Item
              onClick={() => handleSetParams("highest_rated", "sort")}
            >
              <i className="fa-regular fa-star"></i>
              <span>{t("highestRate")}</span>
            </Dropdown.Item>

            <Dropdown.Item
              onClick={() => handleSetParams("high_price", "sort")}
            >
              <i className="fa-regular fa-arrow-up-wide-short"></i>
              <span>{t("high_price")}</span>
            </Dropdown.Item>

            <Dropdown.Item onClick={() => handleSetParams("low_price", "sort")}>
              <i className="fa-regular fa-arrow-down-wide-short"></i>
              <span>{t("low_price")}</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle aria-label="Filter Country">
            <i className="fa-sharp fa-light fa-filter"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                searchParams.delete("city");
                setSearchParams(searchParams);
              }}
            >
              {t("all")}
            </Dropdown.Item>
            {cities?.map(({ id, name }) => (
              <Dropdown.Item
                key={id}
                onClick={() => handleSetParams(id, "city")}
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div> */}
    </div>
  );
}
