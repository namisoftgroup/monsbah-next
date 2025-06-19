import { defineRouting } from "next-intl/routing";

export const LOCALES = ["egypt-ar", "egypt-en", "ksa-ar", "ksa-en", "uae-ar"];
export const DEFAULT_LOCALE = "egypt-ar";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});
