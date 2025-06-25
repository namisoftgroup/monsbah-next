import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import AuthModal from "@/components/auth/AuthModal";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Providers from "@/providers/Providers";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/assets/styles/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/styles/main.css";

export const metadata = {
  metadataBase: new URL("https://monsbah.com"),
  title: "Monsbah",
  description:
    "مجتمع نسائي يتم فيه إعادة تدوير وبيع كل ماهو موجود داخل المنزل من ملابس وفساتين وازياء وموضة وساعات واحذية والإكسسوارات المستعملة والجديدة وتوفير كل ما يلبي حاجتك لتجهيز اي مناسبة.",
  keywords: [
    "ملابس",
    "فساتين",
    "ازياء",
    "موضة",
    "ساعات",
    "أحذية",
    "إكسسوارات",
    "مستعملة",
    "جديدة",
    "نسائي",
    "إعادة تدوير",
    "مناسبات",
  ],
  authors: [{ name: "Monsbah" }],
  robots: "index, follow",
  openGraph: {
    title: "Monsbah - Women's Marketplace",
    description:
      "مجتمع نسائي يتم فيه إعادة تدوير وبيع كل ماهو موجود داخل المنزل من ملابس وفساتين وازياء وموضة وساعات واحذية والإكسسوارات المستعملة والجديدة وتوفير كل ما يلبي حاجتك لتجهيز اي مناسبة.",
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
    title: "Monsbah",
    description:
      "مجتمع نسائي يتم فيه إعادة تدوير وبيع كل ماهو موجود داخل المنزل من ملابس وفساتين وازياء وموضة وساعات واحذية والإكسسوارات المستعملة والجديدة وتوفير كل ما يلبي حاجتك لتجهيز اي مناسبة.",
    images: ["/branding/storeicon.svg"],
  },
  icons: {
    icon: "/branding/icon.svg",
    apple: "/branding/icon.svg",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default async function RootLayout(props) {
  const params = await props.params;
  const fullLocale = params["country-locale"];

  if (!hasLocale(routing.locales, fullLocale)) {
    notFound();
  }

  const lang = fullLocale.split("-")[1];
  const messages = await getMessages(lang);

  setRequestLocale(fullLocale);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers locale={fullLocale} messages={messages}>
          <Toaster expand={false} richColors position="bottom-right" />
          <Header />
          <main>{props.children}</main>
          <Footer />
          <AuthModal />
        </Providers>
      </body>
    </html>
  );
}
