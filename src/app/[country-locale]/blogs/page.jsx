import BlogsList from "@/components/blogs/BlogsList";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("meta");

  return {
    title: t("blogs.title"),
    description: t("blogs.description"),
    openGraph: {
      title: t("blogs.title"),
      description: t("blogs.description"),
    },
  };
}

export default async function Blogs() {
  return <BlogsList />;
}
