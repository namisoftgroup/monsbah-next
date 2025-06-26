// "use client";

// import { useSearchParams } from "next/navigation";
// import React, { useState } from "react";
// import { Tab, Tabs } from "react-bootstrap";
// import { useTranslations } from "use-intl";

// const ProfileTabs = () => {
//   const t = useTranslations();
//   const [activeTab, setActiveTab] = useState("main");
//   const searchParams = useSearchParams();
//   const tabPram = searchParams.get("tab");
//   const activeTab = tabPram || "main";

//   const handleChangeTab = (tab) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("category", newValue);
//     router.push(`?${params.toString()}`);
//   };
//   return (
//     <Tabs
//       className="profileNavCol col-md-4 col-xl-3 p-2"
//       activeKey={activeTab}
//       onSelect={(tab) => handleTabChange(tab)}
//       id="uncontrolled-tab-example"
//     >
//       {/* main info */}
//       <Tab
//         eventKey="main"
//         title={
//           <>
//             <i className="fa-regular fa-user" />
//             {t("profile.mainInfo")}
//           </>
//         }
//         className="tab_item"
//       ></Tab>

//       {/* ads */}
//       <Tab
//         eventKey="ads"
//         title={
//           <>
//             <i className="fa-regular fa-bullhorn"></i>
//             {t("profile.myAds")}
//           </>
//         }
//         className="tab_item"
//       ></Tab>

//       {/* addAd */}
//       <Tab
//         eventKey="addAd"
//         title={
//           <>
//             <i className="fa-regular fa-plus"></i>
//             {t("profile.addAd")}
//           </>
//         }
//         className="tab_item"
//       ></Tab>

//       {/* notifications */}
//       <Tab
//         eventKey="notifications"
//         title={
//           <>
//             <i className="fa-regular fa-bell"></i>
//             {t("notifications")}
//           </>
//         }
//         className="tab_item"
//       ></Tab>

//       {/* favorites */}
//       <Tab
//         eventKey="favorites"
//         title={
//           <>
//             <i className="fa-regular fa-heart" />
//             {t("profile.favorites")}
//           </>
//         }
//         className="tab_item"
//       ></Tab>

//       {/* settings */}
//       <Tab
//         eventKey="settings"
//         title={
//           <>
//             <i className="fa-regular fa-gear" />
//             {t("profile.settings")}
//           </>
//         }
//         className="tab_item"
//       ></Tab>

//       {/* verification */}
//       <Tab
//         eventKey="verification"
//         title={
//           <>
//             <i className="fa-regular fa-badge-check" />
//             {t("profile.verification")}
//           </>
//         }
//         className="tab_item"
//       ></Tab>

//       {/* logout */}
//       <Tab
//         eventKey="logout"
//         title={
//           <>
//             <i className="fa-regular fa-arrow-right-from-bracket"></i>
//             {t("profile.logout")}
//           </>
//         }
//         className="tab_item"
//       ></Tab>
//     </Tabs>
//   );
// };

// export default ProfileTabs;
"use client";

import { PROFILE_TABS } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";

const ProfileTabs = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab = searchParams.get("tab") || "main";

  const handleChangeTab = (tab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  //   const performLogout = async () => {
  //     setLogoutLoading(true);
  //     try {
  //       const res = await axiosInstance.get('/client/auth/logout');
  //       if (res.data.status === 200) {
  //         nookies.destroy(null, 'token');
  //         nookies.destroy(null, 'id');
  //         delete axiosInstance.defaults.headers.common['Authorization'];
  //         dispatch(setClientData({}));
  //         queryClient.clear();
  //         localStorage.setItem('userType', 'client');
  //         toast.success(res.data.message);
  //         router.replace('/');
  //         setShowLogoutModal(false);
  //       }
  //     } catch (error: any) {
  //       console.error('Logout error:', error);
  //       toast.error(error.message);
  //     } finally {
  //       setLogoutLoading(false);
  //     }
  //   };

  useEffect(() => {
    if (activeTab === "logout") {
      //   setShowLogoutModal(true);
      handleChangeTab("main");
    }
  }, [activeTab]);

  return (
    <>
      {/* Mobile header with back arrow */}
      {typeof window !== "undefined" &&
        window.innerWidth < 768 &&
        searchParams.get("tab") && (
          <div className="header-back">
            <div className="arrow_icon" onClick={() => router.back()}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
            <span>{t(`tabs.${activeTab}`)}</span>
          </div>
        )}

      <div className="tabs-section">
        {/* Responsive mobile nav */}
        {typeof window !== "undefined" && !searchParams.get("tab") && (
          <div className="profileResponsiveNav">
            {PROFILE_TABS.map(({ key, icon }) => (
              <div
                key={key}
                className="nav-item"
                onClick={() => handleChangeTab(key)}
              >
                <button aria-label={t(`profile.${key}`)}>
                  <i className={`fa-regular fa-${icon}`} />{" "}
                  {t(`profile.${key}`)}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Desktop or selected tab view */}
        {(typeof window === "undefined" ||
          window.innerWidth > 768 ||
          searchParams.get("tab")) && (
          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => tab && handleChangeTab(tab)}
            className="profileNavCol col-md-4 col-xl-3 p-2"
            id="profile-tabs"
          >
            <Tab
              eventKey="main"
              title={
                <>
                  <i className="fa-regular fa-user" />
                  {t("profile.mainInfo")}
                </>
              }
            >
              {/* <MainInfoTab user={user} lang={lang} handleChangeTab={handleChangeTab} /> */}
            </Tab>
            <Tab
              eventKey="ads"
              title={
                <>
                  <i className="fa-regular fa-bullhorn" />
                  {t("profile.myAds")}
                </>
              }
            >
              {/* <MyAds user={user} lang={lang} isActive={activeTab === 'ads'} handleChangeTab={handleChangeTab} /> */}
            </Tab>
            <Tab
              eventKey="addAd"
              title={
                <>
                  <i className="fa-regular fa-plus" />
                  {t("profile.addAd")}
                </>
              }
            >
              {/* <AddAd user={user} lang={lang} isActive={activeTab === 'addAd'} /> */}
            </Tab>
            <Tab
              eventKey="notifications"
              title={
                <>
                  <i className="fa-regular fa-bell" />
                  {t("notifications")}
                </>
              }
            >
              {/* <Notifcations bgColor="bg-white" /> */}
            </Tab>
            <Tab
              eventKey="favorites"
              title={
                <>
                  <i className="fa-regular fa-heart" />
                  {t("profile.favorites")}
                </>
              }
            >
              {/* <FavoritesTab user={user} lang={lang} isActive={activeTab === 'favorites'} /> */}
            </Tab>
            <Tab
              eventKey="settings"
              title={
                <>
                  <i className="fa-regular fa-gear" />
                  {t("profile.settings")}
                </>
              }
            >
              {/* <SettingsTab user={user} lang={lang} isActive={activeTab === 'settings'} /> */}
            </Tab>
            <Tab
              eventKey="verification"
              title={
                <>
                  <i className="fa-regular fa-badge-check" />
                  {t("profile.verification")}
                </>
              }
            >
              {/* <VerificationTab user={user} lang={lang} isActive={activeTab === 'verification'} /> */}
            </Tab>
            <Tab
              eventKey="logout"
              title={
                <>
                  <i className="fa-regular fa-arrow-right-from-bracket" />
                  {t("profile.logout")}
                </>
              }
            ></Tab>
          </Tabs>
        )}

        {/* Logout Confirmation Modal */}
        {/* <ConfirmationModal
          showModal={showLogoutModal}
          setShowModal={setShowLogoutModal}
          type="logout"
          eventFun={performLogout}
          loading={logoutLoading}
          buttonText={t('profile.logout')}
          text={t('auth.areYouSureYouWantToLogout')}
        /> */}
      </div>
    </>
  );
};

export default ProfileTabs;
