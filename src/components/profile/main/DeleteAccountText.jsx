import { getTranslations } from "next-intl/server";

export default async function DeleteAccountText() {
  const t = await getTranslations();

  return (
    <div className="col-12 d-flex mt-4 align-items-center justify-content-end">
      <span className="delete-account">{t("profile.deleteAccount")}</span>
    </div>
  );
}
