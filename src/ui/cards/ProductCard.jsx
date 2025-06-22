"use client";

import { Link } from "@/i18n/navigation";
import { isValidVideoExtension } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ImageLoad from "../loaders/ImageLoad";

function ProductCard({ product }) {
  const  t  = useTranslations();
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoaded(false);
  };

  return (
    <Link
      aria-label="Product"
      href={`/product/${product.id}`}
      className={`product_vertical`}
    >
      <Link aria-label="Product" href={`/product/${product.id}`} className="img">
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
          <img src={product.image} onLoad={handleImageLoad} alt="" />
        )}

        <ImageLoad isImageLoaded={isImageLoaded} />

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
          href={`/product/${product.id}`}
          className="title"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>{product.name}</h3>
         
        </Link>

        <h3 className="price">
          <span>{product?.price}</span> {product?.currency?.name}
        </h3>

        <ul>
          <li className="w-100">
            <i className="fa-light fa-location-dot"> </i>{" "}
            {product.country?.name}
            
          </li>

          <li style={{ flex: 1 }}>
            <Link
              aria-label="Profile"
              href="/profile"
            >
              <i className="fa-light fa-user"></i> {product.user?.username}
            </Link>
          </li>

          <li>
            <i className="fa-light fa-clock"></i> {product.date}
          </li>
        </ul>
      </div>
    </Link>
  );
}

export default ProductCard;
