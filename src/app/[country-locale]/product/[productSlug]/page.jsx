import Comments from "@/components/product/Comments";
import MyProductSlider from "@/components/product/MyProductSlider";
import ProductInfo from "@/components/product/ProductInfo";
import UserCard from "@/components/product/UserCard";
import { getProduct } from "@/services/products/getProduct";
import { cache } from "react";

export const fetchProduct = cache(async (id) => {
  return await getProduct(id);
});

export async function generateMetadata({ params }) {
  const { productSlug } = await params;
  const decodedSlug = decodeURIComponent(productSlug);

  const product = await fetchProduct(decodedSlug);

  return {
    title: product.name,
    description: product.description,

    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      url: `https://www.monsbah.com/products/${productSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images,
    },
    alternates: {
      canonical: `https://yourstore.com/products/${productSlug}`,
    },
  };
}

export default async function page({ params }) {
  const { productSlug } = await params;

  const decodedSlug = decodeURIComponent(productSlug);

  const product = await fetchProduct(decodedSlug);

  return (
    <section className="product_details">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-lg-7 col-12 p-lg-3 p-2">
            <MyProductSlider product={product} />
            <ProductInfo product={product} />
          </div>
          <div className="col-lg-5 col-12 p-lg-3 p-2 ">
            <div className="d-flex flex-column gap-4">
              <UserCard product={product} />
              <Comments product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
