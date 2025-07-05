"use client";
import { useAuthModal } from "@/stores/useAuthModal";
import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslations } from "use-intl";
import ShareButton from "../shared/ShareButton";

export default function ProductInfo({ product }) {
  const { user } = useAuthStore((state) => state);
  const { userType } = useAuthModal((state) => state);
  const t = useTranslations();
  return (
    <>
      <div className="priceInfo mt-3">
        {" "}
        <h4 className="price">
          <span>{product?.price}</span> {product?.currency?.name}
        </h4>
        {user?.id !== product?.user?.id ? (
          <button
            aria-label="Toggle Favorite"
            // onClick={handleFavorite}
            className={`favorite ${product?.is_favorite ? "active" : ""}`}
          >
            <i className="fa-light fa-heart"></i>
          </button>
        ) : (
          <Dropdown
            onClick={(e) => e.stopPropagation()}
            className="favorite dropdown-icon"
          >
            <Dropdown.Toggle
              aria-label="Product Actions"
              id="dropdown-basic"
              className="upload-btn"
            >
              <i className="fa-regular fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={
                  userType
                    ? `/profile?tab=addAd&product_id=${product?.id}`
                    : `/edit-product/${product?.id}`
                }
              >
                <i className="fa-regular fa-pen-to-square"></i>
                {t("edit")}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleOpenDeleteModal}>
                <i className="fa-regular fa-trash"></i>
                {t("delete")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <div className="actions">
          <ShareButton className={"action-btn report"} title={t("share")} />
          {user?.id !== product?.user?.id && (
            <button
              className="action-btn report"
              // onClick={() => {
              //   isAuthed ? setShowReportModal(true) : setShowAuthModal(true);
              // }}
            >
              <i className="fa-regular fa-flag"></i> {t("report")}
            </button>
          )}
        </div>
      </div>
      <div className="itemInfo mt-3">
        <h3 className="title">{product?.name}</h3>

        <div className="itemBottom">
          <div className="location">
            <i className="fa-light fa-location-dot"></i>
            <span>
              {product?.country?.name}, {product?.city?.name}
            </span>
          </div>
          <div className="time">
            <i className="fa-light fa-clock"></i> {product?.create_at}
          </div>
        </div>
        <p className="description">{product?.description}</p>
      </div>
    </>
  );
}
