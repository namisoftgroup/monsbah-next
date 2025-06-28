import ProfileTabs from "@/components/profile/ProfileTabs";
import React from "react";

const ProfileLayout = ({ children }) => {
  return (
    <div className="profile-page">
      <div className="container ">
        <div className="row m-0">
          <div className="col-3 p-2">
            <ProfileTabs />
          </div>
          <div className="col-9 p-2">
            <div className="tab-content">
              <div className="tab-content-pane ">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
