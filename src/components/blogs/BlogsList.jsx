"use client";

import BlogCard from "@/components/shared/cards/BlogCard";
import { useTranslations } from "next-intl";

export default function BlogsList({ blogs }) {
  const t = useTranslations("blogs");

  return (
    <section className="blogs_section">
      <div className="container">
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>

        <div className="row">
          {blogs?.map((blog) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={blog?.id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
