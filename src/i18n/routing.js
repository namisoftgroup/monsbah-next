import { defineRouting } from "next-intl/routing";

export const LOCALES = [
  "saudia-ar",
  "saudia-en",
  "kuwait-ar",
  "kuwait-en",
  "emirates-ar",
  "emirates-en",
  "bahrain-ar",
  "bahrain-en",
  "oman-ar",
  "oman-en",
  "qatar-ar",
  "qatar-en",
];
export const DEFAULT_LOCALE = "saudia-ar";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});
