import AddEditAdForm from "@/components/profile/ads/AddEditAdForm";
import { getTranslations } from "next-intl/server";
export async function generateMetadata() {
  const t = await getTranslations("meta");

  return {
    title: t("addAd.title"),
    description: t("addAd.description"),
  };
}
export default function page() {
  return <AddEditAdForm />;
}
