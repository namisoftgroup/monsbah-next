"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ContactInfo() {
  const t = useTranslations("contact");

  return (
    <div className="col-lg-6 p-2">
      <div className="contact_info">
        <span className="title_hint">{t("titleHint")}</span>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
        <ul>
          <li>
            <div className="icon">
              <img src="/icons/support.svg" alt="" />
            </div>
            <div className="content">
              <h6>{t("support")}</h6>
              <Link aria-label="Call" href="tel:+919999999999">
                919999999999
              </Link>
            </div>
          </li>

          <li>
            <div className="icon">
              <img src="/icons/email-support.svg" alt="" />
            </div>
            <div className="content">
              <h6>{t("email")}</h6>
              <Link aria-label="Mail" href="mailto:info@Monsbah.com">
                info@Monsbah.com
              </Link>
            </div>
          </li>

          <li>
            <div className="icon">
              <img src="/icons/office.svg" alt="" />
            </div>
            <div className="content">
              <h6>{t("officeLocation")}</h6>
              <p>{t("officeAddress")}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
