import AddEditAdForm from "@/components/profile/ads/AddEditAdForm";
import { getProduct } from "@/services/getProduct";

export default async function page({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return <AddEditAdForm product={product} />;
}
