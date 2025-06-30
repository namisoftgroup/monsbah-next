"use client";

import { Link } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { isValidVideoExtension } from "@/utils/helpers";
import { useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import ConfirmationModal from "../modals/ConfirmationModal";
import { deleteAdAction } from "@/libs/actions/adsActions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function ProductVertical({
  product,
  className,
  isShowAction = true,
  removeItem = false,
}) {
  const t = useTranslations();
  const locale = useLocale();
  const lang = locale.split("-")[1];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { user } = useAuthStore((state) => state);
  const queryClient = useQueryClient();

  const handleOpenDeleteModal = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const performDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await deleteAdAction(product?.id);

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({ queryKey: ["user-products"] });

      toast.success("res?.data.message");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(
        error.message || "Something went wrong while deleting the Ad"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Link
        aria-label="Product"
        href={`/product/${product.id}`}
        className={`product_vertical ${className} `}
      >
        <Link
          aria-label="Product"
          href={`/product/${product.id}`}
          className="img"
        >
          {isValidVideoExtension(product?.image) ? (
            <video
              src={product?.image}
              autoPlay
              loop
              muted
              playsInline
              // onLoadedMetadata={handleImageLoad}
            />
          ) : (
            <img src={product?.image} alt="" />
          )}
          {/* <ImageLoad isImageLoaded={isImageLoaded} /> */}
          <div className="thums_pro">
            <span className="type">{t(`${product?.type}`)}</span>
            {product?.is_popular ? (
              <span className="popular">
                <img src="/icons/crown.svg" alt="" /> {t("popular")}
              </span>
            ) : null}
          </div>
        </Link>

        <div className="content">
          <Link
            aria-label="Product"
            to={`/product/${product?.id}`}
            className="title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{product?.name}</h3>
            {user &&
              (user?.id !== product?.user?.id && removeItem ? (
                <button
                  disabled={loading}
                  // onClick={handleFavorite}
                  className={"favourite_btn  active"}
                >
                  <i className="fa-light fa-heart"></i>
                </button>
              ) : isShowAction ? (
                <div className="d-flex align-items-center gap-2">
                  <Link
                    aria-label="Profile"
                    href={`/profile/addAd/${product?.id}`}
                    className={`favourite_btn dark`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fa-light fa-pen-to-square"></i>
                  </Link>
                  <button
                    onClick={handleOpenDeleteModal}
                    className={`favourite_btn dark delete`}
                  >
                    <i className="fa-light fa-trash"></i>
                  </button>
                </div>
              ) : null)}
          </Link>

          <h3 className="price">
            <span>{product?.price}</span> {product?.currency?.name}
          </h3>

          <ul>
            <li className="w-100">
              <i className="fa-light fa-location-dot"> </i>{" "}
              {product?.country?.name}
              {lang === "ar" ? "،" : ","} {product.city?.name}
            </li>

            <li style={{ flex: 1 }}>
              <Link
                aria-label="Profile"
                to={`${
                  +product?.user?.id === +user?.id
                    ? "/profile/main"
                    : `/profile/addAdd/${product?.user?.id}`
                }`}
              >
                <i className="fa-light fa-user"></i> {product?.user?.username}
              </Link>
            </li>
            <li>
              <i className="fa-light fa-clock"></i> {product?.date}
            </li>
          </ul>
        </div>
      </Link>

      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        type="delete"
        eventFun={performDelete}
        loading={deleteLoading}
        buttonText={t("confirm")}
        text={t("ads.areYouSureYouWantToDelete")}
      />
    </>
  );
}

export default ProductVertical;
