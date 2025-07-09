import CompanyImageProfile from "@/components/companies/CompanyImageProfile";
import CompanyProfileContent from "@/components/companies/CompanyProfileContent";
import UserImageProfile from "@/components/profile/user-profile/UserImageProfile";
import UserProfileContent from "@/components/profile/user-profile/UserProfileContent";
import ProductVertical from "@/components/shared/cards/ProductVertical";
import { getAllProducts } from "@/services/products/getAllProducts";
import { getUserProfile } from "@/services/profile/getUserProfile";
import Image from "next/image";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;

  const profile = await getUserProfile(Number(id));
  const products = await getAllProducts();

  return (
    <section className="company_profile_section">
      {" "}
      <div className="banner position-relative">
        <Image fill={true} src="/banner.png" alt="banner" />
      </div>
      <div className="container mt-4 p-0">
        <div className="row">
          <div className="company_header">
            <UserImageProfile client={profile?.data} />
            <UserProfileContent client={profile?.data} />
          </div>
        </div>
        <div className="row mb-5">
          {products?.data?.data?.map((product, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
              <ProductVertical product={product} isShowAction={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
