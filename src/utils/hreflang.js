import { LOCALES } from "@/i18n/routing";

/**
 * Generates hreflang URLs for all supported locales
 * @param {string} pathname - The current pathname (without locale)
 * @param {string} baseUrl - The base URL of the website
 * @returns {Object} Object with alternates for hreflang
 */
export function generateHreflangAlternates(pathname, baseUrl = "https://monsbah.com") {
    const alternates = {
        canonical: `${baseUrl}/${LOCALES[0]}${pathname}`,
        languages: {}
    };

    // Add alternates for all locales
    LOCALES.forEach(locale => {
        const [country, lang] = locale.split('-');
        const langCode = lang; // "ar" or "en"
        const countryCode = country.toUpperCase(); // "SA", "KW", etc.

        // Use full locale as key for more specific targeting
        alternates.languages[locale] = `${baseUrl}/${locale}${pathname}`;
        
        // Also add just language for broader targeting
        if (!alternates.languages[langCode]) {
            alternates.languages[langCode] = `${baseUrl}/${locale}${pathname}`;
        }
    });

    // Add x-default to the default locale
    alternates.languages['x-default'] = `${baseUrl}/${LOCALES[0]}${pathname}`;

    return alternates;
}

/**
 * Generates hreflang URLs for product pages based on product's country
 * @param {string} pathname - The current pathname (without locale)
 * @param {Object} product - The product object containing country information
 * @param {string} baseUrl - The base URL of the website
 * @returns {Object} Object with alternates for hreflang
 */
export function generateHreflangAlternatesForProduct(pathname, product, baseUrl = "https://monsbah.com") {
    const alternates = {
        canonical: `${baseUrl}/${LOCALES[0]}${pathname}`,
        languages: {}
    };

    // Get product's country code (assuming it's available in product.country)
    let productCountryCode = null;
    
    if (product?.country?.slug) {
        productCountryCode = product.country.slug.toLowerCase();
    } else if (product?.country_slug) {
        productCountryCode = product.country_slug.toLowerCase();
    } else if (product?.country?.code) {
        productCountryCode = product.country.code.toLowerCase();
    }

    if (!productCountryCode) {
        // Fallback to all locales if country is not available
        return generateHreflangAlternates(pathname, baseUrl);
    }

    // Filter locales to only those matching the product's country
    const relevantLocales = LOCALES.filter(locale => {
        const [country] = locale.split('-');
        return country.toLowerCase() === productCountryCode;
    });

    if (relevantLocales.length === 0) {
        // Fallback to all locales if no matching country found
        return generateHreflangAlternates(pathname, baseUrl);
    }

    // Add alternates only for the product's country locales
    relevantLocales.forEach(locale => {
        const [country, lang] = locale.split('-');
        
        // Use full locale as key for more specific targeting
        alternates.languages[locale] = `${baseUrl}/${locale}${pathname}`;
        
        // Also add just language for broader targeting
        if (!alternates.languages[lang]) {
            alternates.languages[lang] = `${baseUrl}/${locale}${pathname}`;
        }
    });

    // Use the first relevant locale for x-default
    alternates.languages['x-default'] = `${baseUrl}/${relevantLocales[0]}${pathname}`;

    return alternates;
}

/**
 * Creates hreflang link elements for head
 * @param {string} pathname - The current pathname
 * @param {string} baseUrl - The base URL
 * @returns {Array} Array of link objects for hreflang
 */
export function generateHreflangLinks(pathname, baseUrl = "https://monsbah.com") {
    const links = [];

    LOCALES.forEach(locale => {
        const [country, lang] = locale.split('-');
        const url = `${baseUrl}/${locale}${pathname}`;
        
        // Add specific locale hreflang
        links.push({
            rel: "alternate",
            hrefLang: locale,
            href: url
        });

        // Add general language hreflang for the first occurrence
        const existingLang = links.find(link => link.hrefLang === lang);
        if (!existingLang) {
            links.push({
                rel: "alternate", 
                hrefLang: lang,
                href: url
            });
        }
    });

    // Add x-default
    links.push({
        rel: "alternate",
        hrefLang: "x-default", 
        href: `${baseUrl}/${LOCALES[0]}${pathname}`
    });

    return links;
}

/**
 * Get country mapping for locale
 */
export const COUNTRY_MAPPING = {
    'sa': { name: 'Saudi Arabia', iso: 'SA' },
    'kw': { name: 'Kuwait', iso: 'KW' },
    'ae': { name: 'UAE', iso: 'AE' },
    'bh': { name: 'Bahrain', iso: 'BH' },
    'om': { name: 'Oman', iso: 'OM' },
    'qa': { name: 'Qatar', iso: 'QA' }
};

/**
 * Get current locale info
 * @param {string} locale - Current locale (e.g., "sa-ar")
 * @returns {Object} Locale information
 */
export function getLocaleInfo(locale) {
    const [country, lang] = locale.split('-');
    return {
        country,
        language: lang,
        countryInfo: COUNTRY_MAPPING[country],
        isRTL: lang === 'ar'
    };
}