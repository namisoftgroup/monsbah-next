// "use client";
// import { Link } from "@/i18n/navigation";
// import { toggleFollowAction } from "@/libs/actions/followActions";
// import { useAuthModal } from "@/stores/useAuthModal";
// import { useAuthStore } from "@/stores/useAuthStore";
// import Image from "next/image";
// import { useTranslations } from "use-intl";

// export default function UserCard({ product }) {
//   const { user } = useAuthStore((state) => state);
//   const { userType } = useAuthModal((state) => state);
//   const t = useTranslations();
//   const {
//     user: { is_follow, id },
//   } = product;

//   const handleFollow = async () => {
//     try {
//       const res = await toggleFollowAction(is_follow, id);
//     } catch (error) {
//       console.log(error?.message);
//       toast.error(error?.message);
//     }
//   };
//   return (
//     <div className="mulen_user">
//       <div className="mulen_user_info">
//         <div className="user_wrapper">
//           <Link
//             aria-label="Profile"
//             to={`${
//               +product?.user?.id === +user?.id
//                 ? userType === "client"
//                   ? "/profile"
//                   : "/company-profile"
//                 : `/${userType === "client" ? "profile" : "companies"}/${
//                     product?.user?.id
//                   }`
//             }`}
//             className="image_wrapper"
//           >
//             <Image
//               width={90}
//               height={90}
//               src={product?.user?.image}
//               onError={(e) => (e.target.src = "/images/icons/user_default.png")}
//               loading="lazy"
//               alt="user"
//             />
//           </Link>
//           {product?.user?.id !== user?.id && (
//             <button
//               aria-label="Toggle following "
//               className="follow_btn"
//               onClick={handleFollow}
//             >
//               <i
//                 className={`fa-light fa-${
//                   product?.user?.is_follow ? "check" : "plus"
//                 }`}
//               ></i>
//             </button>
//           )}
//         </div>
//         <div className="content">
//           <Link
//             aria-label="Profile"
//             to={`${
//               +product?.user?.id === +user?.id
//                 ? userType === "client"
//                   ? "/profile"
//                   : "/company-profile"
//                 : `/${userType === "client" ? "profile" : "companies"}/${
//                     product?.user?.id
//                   }`
//             }`}
//           >
//             <h3 className="name"> {product?.user?.name}</h3>
//           </Link>
//           <ul>
//             <li>
//               <h6>
//                 {product?.user?.user_type === "user"
//                   ? product?.user?.["ads-count"]
//                   : product?.user?.products_count}
//               </h6>
//               <span>{t("posts")}</span>
//             </li>

//             <li>
//               <h6>
//                 {product?.user?.user_type === "user"
//                   ? product?.user?.["followers-count"]
//                   : product?.user?.followers}
//               </h6>
//               <span>{t("followers")}</span>
//             </li>

//             <li>
//               <h6>
//                 {product?.user?.user_type === "user"
//                   ? product?.user?.["following-count"]
//                   : product?.user?.following}
//               </h6>
//               <span>{t("following")}</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {product?.user?.id !== user?.id && (
//         <div className="contact">
//           {product?.active_call === "active" && (
//             <Link
//               aria-label="Call"
//               target="_blank"
//               to={`tel:${product?.phone}`}
//               className="call"
//             >
//               <span> {t("calling")} </span>
//             </Link>
//           )}

//           {product?.active_chat === "active" && (
//             <Link aria-label="Chat" to={`/chats?user_id=${product?.user?.id}`}>
//               <Image width={24} height={32} src="/icons/chat.svg" alt="chat" />
//               {product?.active_call === "inactive" && (
//                 <span> {t("chating")} </span>
//               )}
//             </Link>
//           )}

//           {product?.active_whatsapp === "active" && (
//             <Link
//               aria-label="Whatsapp"
//               target="_blank"
//               // to={`https://wa.me/${product?.user?.phone}?text=${encodedWhatsappMessage}`}
//             >
//               <Image
//                 width={32}
//                 height={32}
//                 src="/icons/whats.svg"
//                 alt="whatsapp"
//               />
//               {product?.active_call === "inactive" && (
//                 <span> {t("whatsapp")} </span>
//               )}
//             </Link>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { Link } from "@/i18n/navigation";
import { toggleFollowAction } from "@/libs/actions/followActions";
import { useAuthModal } from "@/stores/useAuthModal";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useTranslations } from "use-intl";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

export default function UserCard({ product }) {
  const { user } = useAuthStore((state) => state);
  const { userType } = useAuthModal((state) => state);
  const t = useTranslations();

  const initialUser = product.user;

  const [optimisticUser, setOptimisticUser] = useOptimistic(
    initialUser,
    (currentUser, action) => {
      if (action.type === "TOGGLE_FOLLOW") {
        const isFollowing = !currentUser.is_follow;
        const followerKey =
          currentUser.user_type === "user" ? "followers-count" : "followers";

        return {
          ...currentUser,
          is_follow: isFollowing,
          [followerKey]: isFollowing
            ? currentUser[followerKey] + 1
            : currentUser[followerKey] - 1,
        };
      }
      return currentUser;
    }
  );

  const handleFollow = async () => {
    // Optimistically update UI
    startTransition(() => {
      setOptimisticUser({ type: "TOGGLE_FOLLOW" });
    });

    try {
      await toggleFollowAction(optimisticUser.is_follow, optimisticUser.id);
    } catch (error) {
      console.error(error?.message);
      toast.error(error?.message || "Failed to update follow status");
    }
  };

  const profileLink =
    +optimisticUser?.id === +user?.id
      ? userType === "client"
        ? "/profile"
        : "/company-profile"
      : `/${userType === "client" ? "profile" : "companies"}/${
          optimisticUser?.id
        }`;

  const followerKey =
    optimisticUser.user_type === "user" ? "followers-count" : "followers";
  const postsKey =
    optimisticUser.user_type === "user" ? "ads-count" : "products_count";
  const followingKey =
    optimisticUser.user_type === "user" ? "following-count" : "following";

  return (
    <div className="mulen_user">
      <div className="mulen_user_info">
        <div className="user_wrapper">
          <Link aria-label="Profile" to={profileLink} className="image_wrapper">
            <Image
              width={90}
              height={90}
              src={optimisticUser?.image}
              onError={(e) => (e.target.src = "/images/icons/user_default.png")}
              loading="lazy"
              alt="user"
            />
          </Link>
          {optimisticUser?.id !== user?.id && (
            <button
              aria-label="Toggle following"
              className="follow_btn"
              onClick={handleFollow}
            >
              <i
                className={`fa-light fa-${
                  optimisticUser?.is_follow ? "check" : "plus"
                }`}
              ></i>
            </button>
          )}
        </div>
        <div className="content">
          <Link aria-label="Profile" to={profileLink}>
            <h3 className="name">{optimisticUser?.name}</h3>
          </Link>
          <ul>
            <li>
              <h6>{optimisticUser?.[postsKey]}</h6>
              <span>{t("posts")}</span>
            </li>
            <li>
              <h6>{optimisticUser?.[followerKey]}</h6>
              <span>{t("followers")}</span>
            </li>
            <li>
              <h6>{optimisticUser?.[followingKey]}</h6>
              <span>{t("following")}</span>
            </li>
          </ul>
        </div>
      </div>

      {optimisticUser?.id !== user?.id && (
        <div className="contact">
          {product?.active_call === "active" && (
            <Link
              aria-label="Call"
              target="_blank"
              to={`tel:${product?.phone}`}
              className="call"
            >
              <span>{t("calling")}</span>
            </Link>
          )}

          {product?.active_chat === "active" && (
            <Link aria-label="Chat" to={`/chats?user_id=${optimisticUser?.id}`}>
              <Image width={24} height={32} src="/icons/chat.svg" alt="chat" />
              {product?.active_call === "inactive" && (
                <span>{t("chating")}</span>
              )}
            </Link>
          )}

          {product?.active_whatsapp === "active" && (
            <Link aria-label="Whatsapp" target="_blank">
              <Image
                width={32}
                height={32}
                src="/icons/whats.svg"
                alt="whatsapp"
              />
              {product?.active_call === "inactive" && (
                <span>{t("whatsapp")}</span>
              )}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
