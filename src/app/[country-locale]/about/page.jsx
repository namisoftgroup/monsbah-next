import AboutSection from "@/components/about/AboutSection";
import Countries from "@/components/about/Countries";
import HowItWorks from "@/components/about/HowItWorks";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("meta");

  return {
    title: { absolute: t("about.title") },
    description: t("about.description"),
    openGraph: {
      title: t("about.title"),
      description: t("about.description"),
    },
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
