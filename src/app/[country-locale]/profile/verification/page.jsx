import VerificationTab from "@/components/profile/verification/VerificationTab";
import { getCategories } from "@/services/categories/getCategories";
import { getCountries } from "@/services/getCountries";
import { getTranslations } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata() {
  const t = await getTranslations("meta");

  const alternates = generateHreflangAlternates("/profile/verification");

  return {
    title: t("verification.title"),
    description: t("verification.description"),
    alternates,
  };
}

export default async function page() {
  const [countries, categories] = await Promise.all([
    getCountries(),
    getCategories(),
  ]);

  return (
    <div className="tab-content">
      <div className="tab-content-pane ">
        <div className="Dashpoard_section w-100">
          <VerificationTab categories={categories} countries={countries} />
        </div>
      </div>
    </div>
  );
}
