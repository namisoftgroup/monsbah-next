"use client";

import React from "react";

export default function ShareButton({ className, title }) {
  const handleShare = ({ name, id }) => {
    if (navigator.share) {
      navigator
        .share({
          title: name,
          url: window.location.href + "/" + id,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };
  return (
    <button className={`${className} share_btn`} onClick={handleShare}>
      <i className="fa-regular fa-share-nodes"></i>{" "}
      {title && <span>{title}</span>}
    </button>
  );
}
