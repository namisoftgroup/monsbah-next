import Comments from "@/components/product/Comments";
import MyProductSlider from "@/components/product/MyProductSlider";
import ProductInfo from "@/components/product/ProductInfo";
import UserCard from "@/components/product/UserCard";
import { getProduct } from "@/services/products/getProduct";
import { cache } from "react";
import { generateHreflangAlternatesForProduct } from "@/utils/hreflang";

export const fetchProduct = cache(async (id) => {
  return await getProduct(id);
});

export async function generateMetadata({ params }) {
  const { productSlug } = await params;
  const decodedSlug = decodeURIComponent(productSlug);

  const product = await fetchProduct(decodedSlug);

  if (process?.env?.NODE_ENV !== "production") {
    const c = product?.country || {};
    console.log("[product-meta] country summary", {
      productSlug,
      country: {
        name: c?.name,
        english_name: c?.english_name,
        slug: c?.slug,
        code: c?.code,
        iso_code: c?.iso_code,
        iso: c?.iso,
        iso2: c?.iso2,
        country_code: c?.country_code,
      },
      product_country_slug: product?.country_slug,
      product_country_code: product?.country_code,
      keys: c ? Object.keys(c) : null,
    });
  }

  const pathname = `/product/${productSlug}`;
  const alternates = generateHreflangAlternatesForProduct(pathname, product);

  return {
    title: product.meta_title,
    description: product.meta_description,

    openGraph: {
      title: product.meta_title,
      description: product.meta_description,
      images: product.images,
      url: `https://www.monsbah.com/products/${productSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.meta_title,
      description: product.meta_description,
      images: product.images,
    },
    alternates,
    robots: {
      index: product.is_index,
      follow: product.is_follow,
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
