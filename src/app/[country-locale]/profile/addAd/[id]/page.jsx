import AddEditAdForm from "@/components/profile/ads/AddEditAdForm";
import { getProduct } from "@/services/products/getProduct";
import { getTranslations } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata({ params }) {
  const t = await getTranslations("meta");
  const { id } = await params;

  const alternates = await generateHreflangAlternates(
    `/profile/addAd/${encodeURIComponent(id)}`
  );

  return {
    title: t("editAd.title"),
    description: t("editAd.description"),
    alternates,
  };
}

export default async function page({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return <AddEditAdForm product={product} />;
}
