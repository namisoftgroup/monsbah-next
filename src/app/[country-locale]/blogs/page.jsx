import BlogsList from "@/components/blogs/BlogsList";
import { getTranslations } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata() {
  const t = await getTranslations("meta");
  const alternates = generateHreflangAlternates("/blogs");

  return {
    title: t("blogs.title"),
    description: t("blogs.description"),
    openGraph: {
      title: t("blogs.title"),
      description: t("blogs.description"),
    },
    alternates,
  };
}

export default async function Blogs() {
  return <BlogsList />;
}
