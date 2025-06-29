"use client";

import EmptyData from "@/components/shared/EmptyData";
import ProductLoader from "@/components/shared/loaders/ProductLoader";
import useGetUserProducts from "@/hooks/queries/products/useGetUserProducts";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

export default function AdsList() {
  const t = useTranslations();
  const {
    data: products,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserProducts(true);

  console.log(products);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (!sectionRef.current) return;

  //       const section = sectionRef.current;
  //       const sectionBottom = section.getBoundingClientRect().bottom;
  //       const viewportHeight = window.innerHeight;

  //       if (
  //         sectionBottom <= viewportHeight + 200 &&
  //         hasNextPage &&
  //         !isFetchingNextPage
  //       ) {
  //         fetchNextPage();
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {products?.map((product, index) => (
        <div className="col-lg-6 col-12 p-2" key={index}>
          {/* <ProductVertical product={product} className="my-ad" /> */}
        </div>
      ))}

      {(isLoading || isFetchingNextPage) && (
        <>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-6 col-12 p-2" key={`loader-${index}`}>
                <ProductLoader className="my-ad" />
              </div>
            ))}
        </>
      )}
      {!isLoading &&
        !isFetchingNextPage &&
        products.length === 0 &&
        !hasNextPage && (
          <EmptyData minHeight="100%">
            <p>{t("ads.noAdsForMe")}</p>
          </EmptyData>
        )}
    </>
  );
}
