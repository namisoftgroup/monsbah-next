import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import AuthModal from "@/components/auth/AuthModal";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ResponsiveNav from "@/components/Header/ResponsiveNav";
import Providers from "@/providers/Providers";
import { META_DATA_CONTENT } from "@/utils/constants";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/assets/styles/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/styles/main.css";
import BackToTop from "@/components/shared/BackToTop";
import DownloadApp from "@/components/shared/DownloadApp";

export async function generateMetadata({ params }) {
  const locale = await params;

  const lang = locale["country-locale"].split("-")[1];
  const content = META_DATA_CONTENT[lang];

  return {
    metadataBase: new URL("https://monsbah.com"),
    title: {
      template: `%s - ${content.title}`,
      default: content.title,
    },
    description: content.description,
    keywords: content.keywords,
    authors: [{ name: "Monsbah" }],
    robots: "index, follow",
    openGraph: {
      title:
        lang === "ar" ? "مناسبة - سوق المرأة" : "Monsbah - Women's Marketplace",
      description: content.description,
      url: "https://www.monsbah.com",
      type: "website",
      images: [
        {
          url: "/branding/storeicon.svg",
          width: 800,
          height: 600,
          alt: "Monsbah Icon",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: ["/branding/storeicon.svg"],
    },
    icons: {
      icon: "/branding/icon.svg",
      apple: "/branding/icon.svg",
    },
  };
}
export const viewport = {
  themeColor: "#000000",
};

export default async function RootLayout(props) {
  const params = await props.params;
  const fullLocale = params["country-locale"];

  if (!hasLocale(routing.locales, fullLocale)) {
    notFound();
  }

  setRequestLocale(fullLocale);
  const lang = fullLocale.split("-")[1];
  const messages = await getMessages(lang);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        <script id="gtm" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M2Z82BND');
          `}
        </script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Providers locale={fullLocale} messages={messages}>
          <Toaster expand={false} richColors position="bottom-right" />
          <Header />
          <main>{props.children}</main>
          <Footer />
          <ResponsiveNav />
          <AuthModal />
          <BackToTop />
          <DownloadApp />
        </Providers>
      </body>
    </html>
  );
}
