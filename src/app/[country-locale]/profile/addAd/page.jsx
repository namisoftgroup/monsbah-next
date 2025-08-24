import AddEditAdForm from "@/components/profile/ads/AddEditAdForm";
import { getTranslations } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata() {
  const t = await getTranslations("meta");

  const alternates = await generateHreflangAlternates("/profile/addAd");

  return {
    title: t("addAd.title"),
    description: t("addAd.description"),
    alternates,
  };
}
export default function page() {
  return <AddEditAdForm />;
}
