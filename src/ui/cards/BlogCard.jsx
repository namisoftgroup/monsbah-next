"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function BlogCard({ blog }) {
  const t = useTranslations();

  return (
    <Link href={`/blogs/${blog?.title}`} className="blog_card">
      <div className="blog_image">
        <img src={blog?.image} alt="فساتين زفاف" />
      </div>

      <div className="blog_content">
        <span className="date">
          <i className="fa-light fa-calendar-days"></i> {blog?.date}
        </span>

        <h3>{blog?.title}</h3>

        <span className="read_more">
          {t("readMore")} <i className="fa-regular fa-arrow-up-left"></i>
        </span>
      </div>
    </Link>
  );
}
