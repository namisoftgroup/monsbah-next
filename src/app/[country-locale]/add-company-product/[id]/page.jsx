import AddCompanyAdForm from "@/components/companies/AddCompanyAdForm";
import { getAuthedUser } from "@/services/auth/getAuthedUser";
import { getProduct } from "@/services/products/getProduct";
import React from "react";

export default async function Page({ params }) {
  const user = await getAuthedUser();
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <AddCompanyAdForm user={user?.client} product={product} />
      </div>
    </div>
  );
}
