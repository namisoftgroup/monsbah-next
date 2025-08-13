// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useSearchParams } from "next/navigation";

// import ProductLoader from "@/components/shared/loaders/ProductLoader";
// import CompanyLoader from "@/components/shared/loaders/CompanyLoader";
// import CompanyCard from "../shared/cards/CompanyCard";
// import ProductVertical from "../shared/cards/ProductVertical";
// import ProductVerticalCompany from "../shared/cards/ProductVerticalCompany";

// import useGetCompanies from "@/hooks/queries/companies/useGetCompanies";
// import useGetProducts from "@/hooks/queries/products/useGetProducts";

// export default function ProductsSection({ userType }) {
//   const sectionRef = useRef(null);
//   const searchParams = useSearchParams();

//   // state for localStorage value
//   const [userTypeFromLocalStorage, setUserTypeFromLocalStorage] =
//     useState(null);

//   useEffect(() => {
//     // only runs on client
//     const type = localStorage.getItem("user_type");
//     setUserTypeFromLocalStorage(type);
//   }, []);

//   const hasCategory = searchParams.get("category");
//   const hasSubcategory = searchParams.get("sub_category");

//   const shouldShowCompanies =
//     !hasSubcategory && hasCategory && userTypeFromLocalStorage === "company";

//   // Products query
//   const {
//     data: productsData,
//     isLoading,
//     isFetchingNextPage,
//     fetchNextPage,
//     hasNextPage,
//   } = useGetProducts(userType);

//   const allProducts =
//     productsData?.pages?.flatMap((page) => page?.data?.data) ?? [];

//   // Companies query
//   const {
//     data: companiesData,
//     isLoading: isLoadingCompanies,
//     fetchNextPage: fetchNextPageCompanies,
//     hasNextPage: hasNextPageCompanies,
//     isFetchingNextPage: isFetchingNextPageCompanies,
//   } = useGetCompanies();

//   const allCompanies =
//     companiesData?.pages?.flatMap((page) => page?.data?.data) ?? [];

//   // Infinite scroll listener
//   useEffect(() => {
//     const handleScroll = () => {
//       const section = sectionRef.current;
//       if (!section) return;

//       const sectionBottom = section.getBoundingClientRect().bottom;
//       const viewportHeight = window.innerHeight;

//       if (sectionBottom <= viewportHeight + 200) {
//         if (shouldShowCompanies) {
//           if (hasNextPageCompanies && !isFetchingNextPageCompanies) {
//             fetchNextPageCompanies();
//           }
//         } else {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [
//     shouldShowCompanies,
//     hasNextPageCompanies,
//     isFetchingNextPageCompanies,
//     fetchNextPageCompanies,
//     hasNextPage,
//     isFetchingNextPage,
//     fetchNextPage,
//   ]);

//   return (
//     <section className="products_section" ref={sectionRef}>
//       <div className="container p-1">
//         {shouldShowCompanies ? (
//           <div className="row">
//             {allCompanies.map((company) => (
//               <div className="col-lg-4 col-md-6 col-12 p-2" key={company?.id}>
//                 <CompanyCard company={company} />
//               </div>
//             ))}
//             {(isLoadingCompanies || isFetchingNextPageCompanies) &&
//               Array(3)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div
//                     className="col-lg-4 col-md-6 col-12 p-2"
//                     key={`loader-${index}`}
//                   >
//                     <CompanyLoader />
//                   </div>
//                 ))}
//           </div>
//         ) : (
//           <div className="row">
//             {allProducts.map((product, index) => (
//               <div
//                 className="col-lg-4 col-md-6 col-12 p-2"
//                 key={product?.id || index}
//               >
//                 {userTypeFromLocalStorage === "company" ? (
//                   <ProductVerticalCompany
//                     product={product}
//                     isShowAction={false}
//                   />
//                 ) : (
//                   <ProductVertical product={product} isShowAction={false} />
//                 )}
//               </div>
//             ))}
//             {(isLoading || isFetchingNextPage) &&
//               Array(3)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div
//                     className="col-lg-4 col-md-6 col-12 p-2"
//                     key={`loader-${index}`}
//                   >
//                     <ProductLoader />
//                   </div>
//                 ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
"use client";

import { useRef, useEffect } from "react";
import ProductLoader from "@/components/shared/loaders/ProductLoader";
import ProductVertical from "../shared/cards/ProductVertical";
import ProductVerticalCompany from "../shared/cards/ProductVerticalCompany";
import useGetProducts from "@/hooks/queries/products/useGetProducts";

export default function ProductsSection({ userType }) {
  const sectionRef = useRef(null);

  const {
    data: productsData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetProducts(userType);

  const allProducts =
    productsData?.pages?.flatMap((page) => page?.data?.data) ?? [];

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionBottom = section.getBoundingClientRect().bottom;
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
    <section className="products_section" ref={sectionRef}>
      <div className="container p-1">
        <div className="row">
          {allProducts.map((product, index) => (
            <div
              className="col-lg-4 col-md-6 col-12 p-2"
              key={product?.id || index}
            >
              {userType === "company" ? (
                <ProductVerticalCompany
                  product={product}
                  isShowAction={false}
                />
              ) : (
                <ProductVertical product={product} isShowAction={false} />
              )}
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
      </div>
    </section>
  );
}
