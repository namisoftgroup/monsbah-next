"use client";

import { Link } from "@/i18n/navigation";
import { isValidVideoExtension } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageLoad from "../loaders/ImageLoad";

function ProductCard({ product }) {
  const t = useTranslations();
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  console.log(product);

  const handleImageLoad = () => setIsImageLoaded(false);

  const handleCardClick = () => {
    router.push(`/product/${product?.id}`);
  };

  return (
    <div
      role="link"
      aria-label={`View product: ${product.name}`}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      className="product_vertical cursor-pointer outline-none   "
    >
      <div className="img">
        {isValidVideoExtension(product?.image) ? (
          <video
            src={product.image}
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={handleImageLoad}
          />
        ) : (
          <img
            src={product.image}
            onLoad={handleImageLoad}
            alt={product.name}
          />
        )}

        <ImageLoad isImageLoaded={isImageLoaded} />

        <div className="thums_pro">
          <span className="type">{t(`${product?.type}`)}</span>
          {product?.is_popular && (
            <span className="popular">
              <img src="/icons/crown.svg" alt="" /> {t("popular")}
            </span>
          )}
        </div>
      </div>

      <div className="content">
        <div className="title">
          <h3>{product.name}</h3>
        </div>

        <h3 className="price">
          <span>{product?.price}</span> {product?.currency?.name}
        </h3>

        <ul>
          <li className="w-100">
            <i className="fa-light fa-location-dot" aria-hidden="true" />{" "}
            {product.country?.name}
          </li>

          <li style={{ flex: 1 }}>
            <Link
              href="/profile"
              aria-label={`Go to ${product.user?.username}'s profile`}
              onClick={(e) => e.stopPropagation()} // Prevent card navigation
            >
              <i className="fa-light fa-user" aria-hidden="true" />{" "}
              {product.user?.username}
            </Link>
          </li>

          <li>
            <i className="fa-light fa-clock" aria-hidden="true" />{" "}
            {product.date}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductCard;
