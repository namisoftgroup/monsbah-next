"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer>
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-4 col-12 p-2">
            <div className="about_company">
              <div className="logo">
                <Link href="/" aria-label="Home">
                  <img loading="lazy" alt="logo" src="/branding/icon.svg" />
                </Link>
              </div>
              <div className="text">
                <p>{t("aboutApp")}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-6 p-2">
            <div className="col">
              <h3>{t("importantLinks")}</h3>
              <ul>
                <li>
                  <Link href="/about-us" aria-label="About">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right" />
                    </span>
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" aria-label="Blogs">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right" />
                    </span>
                    {t("header.blogs")}
                  </Link>
                </li>
                <li>
                  <Link href="/asks" aria-label="Asks">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right" />
                    </span>
                    {t("header.asks")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" aria-label="Contact Us">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right" />
                    </span>
                    {t("contactUs")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" aria-label="Terms">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right" />
                    </span>
                    {t("tearmsAndConditions")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-6 p-2">
            <div className="col">
              <h3>{t("popularCategories")}</h3>
              <ul>
                {/* {categories?.map((category) => (
                  <li key={category.id}>
                    <Link href={`/?category=${category.id}`} aria-label="Category">
                      <span><i className="fa-sharp fa-light fa-arrow-right" /></span>
                      {category.name}
                    </Link>
                  </li>
                ))} */}
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-12 p-2">
            <div className="col">
              <h3>{t("downloadApp")}</h3>
              <div className="btns">
                <a
                  href="https://apps.apple.com/kw/app/%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9/id1589937521?l=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apple App"
                >
                  <img src="/icons/appStore.svg" alt="App Store" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.app.monasba&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Android App"
                >
                  <img src="/icons/playStore.svg" alt="Google Play" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 p-2">
            <div className="copy_rights">
              <p>
                {t("copyRights")} &copy;
                {new Date().getFullYear()}. {t("allRights")}{" "}
                <Link aria-label="Home" to="/">
                  {t("appName")}
                </Link>
              </p>

              <div className="social_media">
                <ul>
                  <li>
                    <a
                      href="https://youtube.com/@monsbah?si=GoCRIgXYQgJqiGRl"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                    >
                      <i className="fa-brands fa-youtube" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/monsbah/profilecard/?igsh=eGhycjkydHBlcmky"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@monsbah?_t=8qmq24madhi&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                    >
                      <i className="fa-brands fa-tiktok" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/monsbah?s=11"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <i className="fa-brands fa-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
