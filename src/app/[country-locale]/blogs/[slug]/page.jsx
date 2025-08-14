import ShareButton from "@/components/shared/ShareButton";
import { Link } from "@/i18n/navigation";
import { getBlogs } from "@/services/blogs/getBlogs";
import { getBlogsDetails } from "@/services/blogs/getBlogsDetails";
import { getTranslations } from "next-intl/server";
import { cache } from "react";

const fetchBlogDetails = cache(async (id) => {
  return await getBlogsDetails(id);
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = await getTranslations("meta");
  const blog = await fetchBlogDetails(slug);

  return {
    title: blog?.meta_title,
    description: blog?.meta_description,

    openGraph: {
      title: blog?.meta_title,
      description: blog?.meta_description,
      images: blog?.image
        ? [
            {
              url: blog.image,
              width: 800,
              height: 600,
              alt: blog?.meta_title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.meta_title,
      description: blog?.meta_description,
      images: blog?.image,
    },
    alternates: {
      canonical: blog?.canonical_url,
    },

    robots: {
      index: blog?.is_index,
      follow: blog?.is_follow,
    },
  };
}

export default async function page({ params }) {
  const { slug } = await params;
  const t = await getTranslations();
  const blog = await fetchBlogDetails(slug);
  const blogs = await getBlogs();

  return (
    <section className="blog_details">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-12 p-2">
            <div className="blog_header">
              <h1>{blog?.title}</h1>
              <div className="blog_header_actions">
                <span className="date">
                  <i className="fa-light fa-calendar-days"></i> {blog?.date}
                </span>
                <ShareButton className="color-white" />
              </div>
            </div>
            <div className="blog_content">
              <div className="img">
                <img src={blog?.image} alt="فساتين زفاف 2024" />
              </div>{" "}
              <div
                className="content-text"
                dangerouslySetInnerHTML={{ __html: blog?.description }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-12 p-2">
            <div className="recent_blogs">
              <h3>{t("recentArticles")}</h3>
              <ul>
                {blogs
                  ?.filter((blog) => blog?.id !== +slug)
                  ?.map((blog) => (
                    <li key={blog?.id}>
                      <Link href={`/blogs/${blog?.id}`}>
                        <h4>{blog?.title}</h4>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
