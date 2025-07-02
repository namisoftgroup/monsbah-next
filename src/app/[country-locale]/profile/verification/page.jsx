import VerificationTab from "@/components/profile/verification/VerificationTab";
import { getCategories } from "@/services/getCategories";
import { getCountries } from "@/services/getCountries";
import React from "react";

export default async function page() {
  const countries = await getCountries();
  const categories = await getCategories();
  console.log(countries, categories);

  return (
    <div className="tab-content">
      <div className="tab-content-pane ">
        <div className="Dashpoard_section w-100">
          <VerificationTab categories={categories} countries={countries} />
        </div>
      </div>
    </div>
  );
}
