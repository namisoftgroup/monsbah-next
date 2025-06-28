import { getBlogs } from "@/services/getBlogs";
import BlogsList from "@/components/blogs/BlogsList";

export default async function Blogs() {
  return <BlogsList />;
}
