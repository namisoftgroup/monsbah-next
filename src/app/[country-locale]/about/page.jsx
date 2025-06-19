import { getCountries } from "@/libs/getCountries";
import AboutSection from "@/components/about/AboutSection";
import Countries from "@/components/about/Countries";
import HowItWorks from "@/components/about/HowItWorks";

export default async function About() {
  const countries = await getCountries();

  return (
    <section className="aboutus_section">
      <div className="container">
        <AboutSection />
        <HowItWorks />
        <Countries countries={countries} />
      </div>
    </section>
  );
}
