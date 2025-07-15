"use client";

import ProductLoader from "@/components/shared/loaders/ProductLoader";
import useGetCompanies from "@/hooks/queries/companies/useGetCompanies";
import useGetProducts from "@/hooks/queries/products/useGetProducts";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import CompanyCard from "../shared/cards/CompanyCard";
import ProductVertical from "../shared/cards/ProductVertical";
import CompanyLoader from "../shared/loaders/CompanyLoader";

export default function ProductsSection({ userType }) {
  const sectionRef = useRef(null);
  const searchParams = useSearchParams();

  const hasCategory = searchParams.get("category");
  const hasSubcategory = searchParams.get("sub_category");

  const shouldShowCompanies =
    !hasSubcategory &&
    hasCategory &&
    localStorage.getItem("user_type") === "company";

  const {
    data: productsData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetProducts(userType);

  const {
    data: companiesData,
    isLoading: isLoadingCompanies,
    fetchNextPage: fetchNextPageCompanies,
    hasNextPage: hasNextPageCompanies,
    isFetchingNextPage: isFetchingNextPageCompanies,
  } = useGetCompanies();

  const allCompanies =
    companiesData?.pages?.flatMap((page) => page?.data?.data) ?? [];

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const sectionBottom = section?.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (sectionBottom <= viewportHeight + 200) {
        if (shouldShowCompanies) {
          if (hasNextPageCompanies && !isFetchingNextPageCompanies) {
            fetchNextPageCompanies();
          }
        } else {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    shouldShowCompanies,
    hasNextPageCompanies,
    isFetchingNextPageCompanies,
    fetchNextPageCompanies,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <section className="products_section " ref={sectionRef}>
      <div className="container p-1">
        {shouldShowCompanies ? (
          <div className="row">
            {allCompanies?.map((company) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={company?.id}>
                <CompanyCard company={company} />
              </div>
            ))}
            {(isLoadingCompanies || isFetchingNextPageCompanies) && (
              <>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      className="col-lg-4 col-md-6 col-12 p-2"
                      key={`loader-${index}`}
                    >
                      <CompanyLoader />
                    </div>
                  ))}
              </>
            )}
          </div>
        ) : (
          <div className="row">
            {productsData?.map((product, index) => (
              <div
                className="col-lg-4 col-md-6 col-12 p-2"
                key={product?.id || index}
              >
                <ProductVertical product={product} isShowAction={false} />
              </div>
            ))}

            {(isLoading || isFetchingNextPage) &&
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12 p-2"
                    key={`loader-${index}`}
                  >
                    <ProductLoader />
                  </div>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
