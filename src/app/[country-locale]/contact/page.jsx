import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("meta");

  return {
    title: t("contact.title"),
    description: t("contact.description"),
  };
}

export default function Contact() {
  return (
    <section className="contact_section">
      <div className="container">
        <div className="row">
          <ContactInfo />

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
