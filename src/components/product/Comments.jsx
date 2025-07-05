import { getComments } from "@/services/comments/getComments";
import { getTranslations } from "next-intl/server";
import CommentCard from "./CommentCard";
import AddCommentForm from "./AddCommentForm";

export default async function Comments({ product }) {
  const t = await getTranslations();
  const comments = await getComments(product?.id);

  return (
    <div className="comments_container">
      <div className="header">
        <h5>
          {t("comments")} <span>( {product?.count_comments} )</span>
        </h5>
      </div>{" "}
      <div className="comments_wrapper">
        {/* {comments?.data?.length === 0 ? (
          <h6 className="noComments">{t("noComments")}</h6>
        ) : ( */}
        <>
          {/* {comments?.data?.map((comment) => ( */}
          <CommentCard
            // key={comment?.id}
            // comment={comment}
            className="fromComments"
            // setTargetComment={setTargetComment}
            // targetComment={targetComment}
          />
          <CommentCard
            // key={comment?.id}
            // comment={comment}
            className="fromComments"
            // setTargetComment={setTargetComment}
            // targetComment={targetComment}
          />
          <CommentCard
            // key={comment?.id}
            // comment={comment}
            className="fromComments"
            // setTargetComment={setTargetComment}
            // targetComment={targetComment}
          />
          {/* ))} */}
        </>
        {/* )}{" "} */}
      </div>
      <AddCommentForm
        product={product}
        // targetComment={targetComment}
        // setTargetComment={setTargetComment}
      />
    </div>
  );
}
