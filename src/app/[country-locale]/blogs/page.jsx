import { getBlogs } from "@/services/blogs/getBlogs";
import BlogsList from "@/components/blogs/BlogsList";

export default async function Blogs() {
  return <BlogsList />;
}
