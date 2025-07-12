import AddEditAdForm from "@/components/profile/ads/AddEditAdForm";
import { getProduct } from "@/services/products/getProduct";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("meta");

  return {
    title: t("editAd.title"),
    description: t("editAd.description"),
  };
}

export default async function page({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return <AddEditAdForm product={product}  />;
}
