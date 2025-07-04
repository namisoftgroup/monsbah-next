import MobileHeaderComponent from "@/components/profile/MobileHeaderComponent";
import ProfileTabs from "@/components/profile/ProfileTabs";
import React from "react";

const ProfileLayout = ({ children }) => {
  return (
    <div className="profile-page">
      <div className="container ">
        <div className="row m-0">
          <div className="d-md-none ">
            <MobileHeaderComponent />
          </div>
          <div className="col-12  col-md-4 col-lg-3  p-2">
            <ProfileTabs />
          </div>
          <div className="col-12 col-md-8 col-lg-9 p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
