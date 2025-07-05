import SettingsTab from "@/components/profile/SettingsTab";
import { getAuthedUser } from "@/services/auth/getAuthedUser";

export default async function page() {
  const user = await getAuthedUser();

  return (
    <div className="tab-content">
      <div className="tab-content-pane ">
        <div className="Dashpoard_section w-100">
          <SettingsTab user={user} />
        </div>
      </div>
    </div>
  );
}
