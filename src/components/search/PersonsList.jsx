"use client";

import React, { useEffect, useRef } from "react";
import ProductLoader from "../shared/loaders/ProductLoader";
import useGetPersons from "@/hooks/queries/search/useGetPersons";
import PersonCard from "../shared/cards/PersonCard";

export default function PersonsList() {
  const sectionRef = useRef();
  const {
    data: persons,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPersons();

  const allPersons = persons?.pages?.flatMap((page) => page?.data?.data) ?? [];
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (
        sectionBottom <= viewportHeight + 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="row" ref={sectionRef}>
      {allPersons?.map((person) => (
        <div className="col-lg-4 col-md-6 col-12 p-2" key={person.id}>
          <PersonCard person={person} />
        </div>
      ))}
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
