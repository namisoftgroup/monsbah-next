import FavoritsList from "@/components/profile/myfavorites/FavoritsList";
import { getFavorites } from "@/services/favorites/getFavorites";
import React from "react";

export default async function Favorites() {
  const res = await getFavorites();

  return (
    <div className="tab-content">
      <div className="tab-content-pane ">
        <div className="Dashpoard_section w-100">
          <FavoritsList favorites={res} />
        </div>
      </div>
    </div>
  );
}
