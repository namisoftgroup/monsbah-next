"use client";
import { Link } from "@/i18n/navigation";
import React from "react";
import StarsRate from "../shared/StarsRate";
import { useTranslations } from "use-intl";

export default function CommentCard({ comment, className, type }) {
  const t = useTranslations();
  return (
    <div className="CommentWrapper">
      <div className="CommentCard">
        {" "}
        <Link
          aria-label="Profile"
          //   to={`${
          //     +comment?.user_id === +authedUser?.id
          //       ? "/profile"
          //       : `/profile/${comment?.user_id}`
          //   }`}
          className="img"
        >
          <img
            src={"/icons/user_default.png"}
            // alt={comment?.user_name}
            // onError={(e) => (e.target.src = "/icons/user_default.png")}
          />
        </Link>{" "}
        <div className="content">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="mb-0">name</h6>
            {comment?.rate && <StarsRate rate={5} />}
          </div>
          <div className="comment">
            <p>aaaaaaaaaaaaaaaaaaaasdassssssssssssssss</p>
          </div>
          <div className="actions">
            <span>12-7-2025</span>

            <button
              aria-label="Reply"
              //   onClick={() => setTargetComment(comment)}
            >
              {t("reply")}
            </button>

            {/* {comment?.user_id === authedUser?.id && ( */}
            <button
              aria-label="Delete"
              // onClick={() => {
              //   deleteComment();
              // }}
            >
              {t("delete")}
            </button>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
