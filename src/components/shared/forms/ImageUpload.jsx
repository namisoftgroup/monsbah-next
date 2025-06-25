import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";

const ImageUpload = ({
  name,
  value,
  onChange,
  error,
  cover = null,
  onCoverChange,
  coverValue,
  uploadOnly = false,
}) => {
  const t = useTranslations();
  const imgView = useRef(null);
  const coverView = useRef(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);

  // Log on initial render
  useEffect(() => {
    console.log("🧩 ImageUpload Props");
    console.log(" - name:", name);
    console.log(" - value:", value);
    console.log(" - coverValue:", coverValue);
    console.log(
      " - typeof value:",
      typeof value,
      value instanceof File ? "(File)" : ""
    );
    console.log(
      " - typeof coverValue:",
      typeof coverValue,
      coverValue instanceof File ? "(File)" : ""
    );
  }, []);

  useEffect(() => {
    console.log("🔄 useEffect: value or coverValue changed");
    console.log(" - value:", value);
    console.log(" - coverValue:", coverValue);

    if (value instanceof File) {
      const src = URL.createObjectURL(value);
      console.log("👉 Setting avatar src from File:", src);
      imgView.current.src = src;
    } else if (typeof value === "string") {
      console.log("👉 Setting avatar src from string:", value);
      imgView.current.src = value;
    } else {
      console.log("👉 Setting default avatar image");
      imgView.current.src = "/icons/gallery.svg";
    }

    if (coverValue instanceof File) {
      const src = URL.createObjectURL(coverValue);
      console.log("👉 Setting cover src from File:", src);
      coverView.current.src = src;
    } else if (typeof coverValue === "string") {
      console.log("👉 Setting cover src from string:", coverValue);
      coverView.current.src = coverValue;
    } else {
      console.log("👉 Setting default cover image");
      coverView.current.src = "/icons/gallery.svg";
    }
  }, [value, coverValue]);

  return (
    <div className="w-100 p-2 image-change-wrapper d-flex justify-content-end align-items-start">
      {/* Avatar Upload */}
      <div
        className="img-wrap"
        onClick={(e) => {
          e.stopPropagation();
          console.log("🖱 Click on avatar image box");
          inputRef.current.click();
        }}
      >
        <div className="img-box">
          <img className={!value ? "icon" : ""} ref={imgView} alt="avatar" />
        </div>

        {!uploadOnly && (
          <Dropdown onClick={(e) => e.stopPropagation()}>
            <Dropdown.Toggle className="upload-btn" id="dropdown-basic">
              <i className="fa-regular fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => inputRef.current.click()}>
                <i className="fa-regular fa-cloud-arrow-up"></i>
                {t("change_avatar")}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  console.log("🗑 Avatar removed");
                  imgView.current.src = "";
                  onChange(null);
                }}
              >
                <i className="fa-regular fa-trash"></i>
                {t("remove_avatar")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      {/* Cover Upload */}
      <div
        className="cover-wrap"
        onClick={(e) => {
          e.stopPropagation();
          console.log("🖱 Click on cover image box");
          coverRef.current.click();
        }}
      >
        <img
          className={!coverValue ? "icon" : ""}
          ref={coverView}
          alt="cover"
        />
        {!uploadOnly && (
          <Dropdown onClick={(e) => e.stopPropagation()}>
            <Dropdown.Toggle className="upload-btn" id="dropdown-basic">
              <i className="fa-regular fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => coverRef.current.click()}>
                <i className="fa-regular fa-cloud-arrow-up"></i>
                {t("change_cover")}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  console.log("🗑 Cover removed");
                  coverView.current.src = "";
                  onCoverChange?.(null);
                }}
              >
                <i className="fa-regular fa-trash"></i>
                {t("remove_cover")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      {/* Hidden Inputs */}
      <input
        type="file"
        name={name}
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          console.log("📤 Avatar file selected:", file);

          if (file?.type?.startsWith("image")) {
            onChange(file);
          } else {
            console.warn("❌ Not a valid image file:", file?.type);
          }
        }}
      />

      <input
        type="file"
        name="cover"
        accept="image/*"
        ref={coverRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          console.log("📤 Cover file selected:", file);

          if (file?.type?.startsWith("image")) {
            onCoverChange?.(file);
          } else {
            console.warn("❌ Not a valid image file:", file?.type);
          }
        }}
      />
    </div>
  );
};

export default ImageUpload;
