"use client";

import CompanyLoader from "@/components/shared/loaders/CompanyLoader";
import ProductLoader from "@/components/shared/loaders/ProductLoader";
import useGetCompanies from "@/hooks/queries/companies/useGetCompanies";
import useGetCompanyProducts from "@/hooks/queries/products/useGetCompanyProducts";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import CompanyCard from "../shared/cards/CompanyCard";
import ProductVerticalCompany from "../shared/cards/ProductVerticalCompany";

export default function CompaniesSection() {
  const sectionRef = useRef(null);

  const searchParams = useSearchParams();
  const hasCategory = searchParams.get("category");
  const hasSubcategory = searchParams.get("sub_category");

  const shouldShowCompanies = Boolean(!hasSubcategory && hasCategory);

  const {
    data: products,
    isLoading: isLoadingProducts,
    fetchNextPage: fetchNextPageProducts,
    hasNextPage: hasNextPageProducts,
    isFetchingNextPage: isFetchingNextPageProducts,
  } = useGetCompanyProducts();

  const allProducts =
    products?.pages?.flatMap((page) => page?.data?.data) ?? [];

  const {
    data: companies,
    isLoading: isLoadingCompanies,
    fetchNextPage: fetchNextPageCompanies,
    hasNextPage: hasNextPageCompanies,
    isFetchingNextPage: isFetchingNextPageCompanies,
  } = useGetCompanies();

  const allCompanies =
    companies?.pages?.flatMap((page) => page?.data?.data) ?? [];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (sectionBottom <= viewportHeight + 200) {
        if (shouldShowCompanies) {
          if (hasNextPageCompanies && !isFetchingNextPageCompanies) {
            fetchNextPageCompanies();
          }
        } else {
          if (hasNextPageProducts && !isFetchingNextPageProducts) {
            fetchNextPageProducts();
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
    hasNextPageProducts,
    isFetchingNextPageProducts,
    fetchNextPageProducts,
  ]);

  return (
    <section className="companies_section" ref={sectionRef}>
      <div className="container p-1">
        {!shouldShowCompanies ? (
          <div className="row">
            {allProducts?.map((product, index) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                <ProductVerticalCompany
                  product={product}
                  isShowAction={false}
                />
              </div>
            ))}

            {(isLoadingProducts || isFetchingNextPageProducts) && (
              <>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      className="col-lg-4 col-md-6 col-12 p-2"
                      key={`loader-${index}`}
                    >
                      <ProductLoader />
                    </div>
                  ))}
              </>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
