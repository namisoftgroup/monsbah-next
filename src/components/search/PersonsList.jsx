"use client";

import React, { useRef } from "react";
import ProductLoader from "../shared/loaders/ProductLoader";
import useGetPersons from "@/hooks/queries/search/useGetPersons";

export default function PersonsList() {
  const sectionRef = useRef();
  const {
    data: ads,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPersons();
  return (
    <div className="row" ref={sectionRef}>
      PersonsList
      {(isLoading || isFetchingNextPage) && (
        <>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                <ProductLoader />
              </div>
            ))}
        </>
      )}
    </div>
  );
}
