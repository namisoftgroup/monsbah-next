import ProductVertical from "@/components/shared/cards/ProductVertical";
import EmptyData from "@/components/shared/EmptyData";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function FavoritsList({ favorites }) {
  const t = await getTranslations();
  return (
    <>
      <div className="row">
        {favorites?.data?.map((product) => (
          <div className="col-lg-6 col-12 p-2" key={product?.id}>
            <ProductVertical
              product={product}
              removeItem={true}
              className="my-ad"
            />
          </div>
        ))}

        {/* {(isLoading || isFetchingNextPage) && (
        <>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-6 col-12 p-2" key={`loader-${index}`}>
              <ProductLoader className="my-ad" />
              </div>
              ))}
              </>
      )} */}
      </div>

      {favorites?.data?.length === 0 && (
        <EmptyData minHeight="200px">
          <p>{t("profile.noFavoritesYet")}</p>
        </EmptyData>
      )}
    </>
  );
}
