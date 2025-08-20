import AboutSection from "@/components/about/AboutSection";
import Countries from "@/components/about/Countries";
import HowItWorks from "@/components/about/HowItWorks";
import { getCountries } from "@/services/getCountries";
import { BASE_URL, LOCALES } from "@/utils/constants";
import { getTranslations } from "next-intl/server";
import { generateHreflangAlternates } from "@/utils/hreflang";

export async function generateMetadata({ params }) {
  const { "country-locale": countryLocale } = await params;
  const [country, locale] = countryLocale.split("-");
  const t = await getTranslations("meta");

  const alternates = generateHreflangAlternates("/about");
  return {
    title: { absolute: t("about.title") },
    description: t("about.description"),
    openGraph: {
      title: t("about.title"),
      description: t("about.description"),
    },
    alternates,
  };
}

export default async function About() {
  return (
    <section className="aboutus_section">
      <div className="container">
        <AboutSection />
        <HowItWorks />
        <Countries />
      </div>
    </section>
  );
}
