import ProfileTabs from "@/components/profile/ProfileTabs";

export async function generateMetadata({ params }) {
  const locale = await params;

  const lang = locale["country-locale"].split("-")[1];

  return {
    title: lang === "ar" ? "الملف الشخصي" : "Profile",
  };
}

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="container ">
        <div className="row m-0">
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
}
