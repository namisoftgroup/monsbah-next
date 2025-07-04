"use client";

import React from "react";
import { useTranslations } from "use-intl";

export default function MobileHeaderComponent() {
  const t = useTranslations();
  return (
    <div className="header-back">
      <h3>name</h3>
      <button className="arrow_icon" onClick={() => console.log("tab")}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
}
