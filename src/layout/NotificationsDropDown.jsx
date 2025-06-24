"use client";

import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import NotificationCard from "./NotificationCard";
import { Link } from "@/i18n/navigation";
import useGetNotifications from "@/hooks/queries/notifications/useGetNotifications";

const NotificationsDropDown = () => {
  const [unreadNotificationsLength, setUnreadNotificationsLength] = useState(0);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const userType = localStorage.getItem("userType");
  const notifications = useGetNotifications();

  return (
    <Dropdown
      show={showNotificationDropdown}
      onToggle={() => {
        setShowNotificationDropdown(!showNotificationDropdown);
        setUnreadNotificationsLength(0);
      }}
    >
      <Dropdown.Toggle
        aria-label="Notifications"
        id="dropdown-basic"
        className="link"
      >
        <img src="/images/icons/bell.svg" alt="" />
        {unreadNotificationsLength ? (
          <span className="count">
            {unreadNotificationsLength < 100
              ? unreadNotificationsLength
              : "99+"}{" "}
          </span>
        ) : null}
      </Dropdown.Toggle>
      <Dropdown.Menu className="drop_Message_Menu">
        <div className="scroll_menu">
          {notifications?.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              onClick={() => setShowNotificationDropdown(false)}
            />
          ))}
        </div>
        <Link
          aria-label="Show All"
          className="showall"
          to={
            userType === "client"
              ? "/profile?tab=notifications"
              : "/company-notification"
          }
          style={{ textDecoration: "none" }}
          onClick={() => setShowNotificationDropdown(false)}
        >
          {t("viewAllNotifications")}
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationsDropDown;
