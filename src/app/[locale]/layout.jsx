import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import Providers from "@/providers/Providers";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/styles/all.min.css";
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

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
