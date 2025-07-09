import CompanyCategoriesSlider from "@/components/companies/CompanyCategoriesSlider";
import CompanyImageProfile from "@/components/companies/CompanyImageProfile";
import CompanyProfileContent from "@/components/companies/CompanyProfileContent";
import ProductVertical from "@/components/shared/cards/ProductVertical";
import { getAuthedUser } from "@/services/auth/getAuthedUser";
import { getCompanyProducts } from "@/services/companies/getCompanyProducts";
import Image from "next/image";

export default async function page() {
  const profile = await getAuthedUser();

  return (
    <section className="company_profile_section">
      <div className="banner position-relative">
        <Image fill={true} src="/banner.png" alt="banner" />
      </div>{" "}
      <div className="container mt-4 p-0">
        <div className="row">
          <div className="company_header">
            <CompanyImageProfile client={profile?.client} />
            <CompanyProfileContent
              client={profile?.client}
              isMyProfile={true}
            />
          </div>
          <div className="col-12 p-2">
            <div className="about_company">
              <p>{profile?.client?.about}</p>
            </div>
          </div>
          <CompanyCategoriesSlider categories={profile?.client?.categories} />
        </div>
        <div className="row mb-5">
          {profile?.products?.data?.map((product, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
              <ProductVertical product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
