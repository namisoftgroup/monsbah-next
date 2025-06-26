import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  console.log(requested);

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  console.log(locale);

  const lang = locale.split("-")[1];
  console.log(lang);

  return {
    locale,
    messages: (await import(`../../messages/${lang}.json`)).default,
  };
});
