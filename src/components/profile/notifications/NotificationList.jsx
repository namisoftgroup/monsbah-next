"use client";

import EmptyData from "@/components/shared/EmptyData";
import useGetNotifications from "@/hooks/queries/notifications/useGetNotifications";
import NotificationCard from "./NotificationCard";
import { useEffect, useRef } from "react";
import NotificationLoader from "@/components/shared/loaders/NotificationLoader";

export default function NotificationList() {
  const sectionRef = useRef();
  const {
    data: notifications,
    isLoading,
    error,
    fetchNextPage,
    total,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotifications(true);
  const allNotifications =
    notifications?.pages?.flatMap((page) => page?.data?.data) ?? [];
  console.log(allNotifications, total);

  useEffect(() => {
    const handleScroll = () => {
      //   if (!sectionRef.current) return;

      const section = sectionRef.current;
      //   console.log(section);
      const sectionBottom = section.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;
      console.log(
        sectionBottom,
        viewportHeight,
        hasNextPage,
        isFetchingNextPage,
        isLoading
      );

      if (
        sectionBottom <= viewportHeight + 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        console.log("fetchNextPage");

        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log("onscroll added");

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="notifications_section" ref={sectionRef}>
      <div className="row justify-content-center">
        <div className="col-12 d-flex flex-column gap-3 p-2">
          {allNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              item={notification}
              bgColor="bg-white"
            />
          ))}
          {(isLoading || isFetchingNextPage) && (
            <>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <NotificationLoader key={index} />
                ))}
            </>
          )}
        </div>
      </div>

      {!isLoading &&
        !isFetchingNextPage &&
        allNotifications?.length === 0 &&
        !hasNextPage && (
          <EmptyData minHeight="200px">
            <p>{t("profile.noNotificationsYet")}</p>
          </EmptyData>
        )}
    </div>
  );
}
