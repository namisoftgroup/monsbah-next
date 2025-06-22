import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

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
