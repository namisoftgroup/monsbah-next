"use client";

import { useRef, useEffect } from "react";
import ProductCard from "@/components/shared/cards/ProductCard";
import ProductLoader from "@/components/shared/loaders/ProductLoader";
import useGetProducts from "@/hooks/queries/products/useGetProducts";

export default function ProductsSection() {
  const sectionRef = useRef(null);

  const {
    data: productsData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetProducts();

  

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const sectionBottom = section?.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (sectionBottom <= viewportHeight + 200) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="products_section mb-3" ref={sectionRef}>
      <div className="container p-1">
        <div className="row gy-4">
          {productsData?.map((product, index) => (
            <div
              className="col-lg-4 col-md-6 col-12"
              key={product?.id || index}
            >
              <ProductCard product={product} isShowAction={false} />
            </div>
          ))}

          {(isLoading || isFetchingNextPage) &&
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  className="col-lg-4 col-md-6 col-12"
                  key={`loader-${index}`}
                >
                  <ProductLoader />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
