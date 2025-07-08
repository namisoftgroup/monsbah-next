"use client";

import { toggleFollowAction } from "@/libs/actions/followActions";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import React, { startTransition, useOptimistic } from "react";

export default function CompanyImageProfile({ client }) {
  const { user } = useAuthStore((state) => state);
  const initialUser = client;

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

  return (
    <div className="img">
      <Image
        width={122}
        height={122}
        src={optimisticUser?.image}
        alt="company"
      />
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
  );
}
