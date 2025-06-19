import { getBlogs } from "@/libs/getBlogs";
import BlogsList from "@/components/blogs/BlogsList";

export default async function Blogs() {
  const blogs = await getBlogs();
  
  return <BlogsList blogs={blogs} />;
}
