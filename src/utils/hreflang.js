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
    // Helper mappers for various country representations
    const PHONE_TO_ISO = {
        '966': 'sa', // Saudi Arabia
        '965': 'kw', // Kuwait
        '971': 'ae', // UAE
        '973': 'bh', // Bahrain
        '968': 'om', // Oman
        '974': 'qa'  // Qatar
    };

    const SLUG_TO_ISO = {
        'sa': 'sa', 'ksa': 'sa', 'saudi': 'sa', 'saudi-arabia': 'sa', 'saudiarabia': 'sa',
        'kw': 'kw', 'kuwait': 'kw',
        'ae': 'ae', 'uae': 'ae', 'united-arab-emirates': 'ae', 'unitedarabemirates': 'ae',
        'bh': 'bh', 'bahrain': 'bh',
        'om': 'om', 'oman': 'om',
        'qa': 'qa', 'qatar': 'qa'
    };

    const NAME_TO_ISO = {
        // English
        'saudi arabia': 'sa', 'kingdom of saudi arabia': 'sa', 'ksa': 'sa', 'saudi': 'sa',
        'kuwait': 'kw',
        'united arab emirates': 'ae', 'uae': 'ae',
        'bahrain': 'bh',
        'oman': 'om',
        'qatar': 'qa',
        // Arabic common variants
        'المملكة العربية السعودية': 'sa', 'السعودية': 'sa', 'السعوديه': 'sa',
        'الكويت': 'kw',
        'الإمارات العربية المتحدة': 'ae', 'الإمارات': 'ae', 'الامارات': 'ae',
        'البحرين': 'bh',
        'عمان': 'om', 'عُمان': 'om', 'سلطنة عمان': 'om',
        'قطر': 'qa'
    };

    const normalizeCountry = (val) => {
        if (val === null || val === undefined) return null;
        if (typeof val === 'number') val = String(val);
        const s = String(val).trim();
        if (!s) return null;

        // Accept 2-letter ISO
        if (/^[A-Za-z]{2}$/.test(s)) return s.toLowerCase();

        // Accept numeric phone codes
        if (/^[0-9]{2,4}$/.test(s)) {
            const iso = PHONE_TO_ISO[s];
            if (iso) return iso;
        }

        const lower = s.toLowerCase();

        // Slug-like strings
        if (SLUG_TO_ISO[lower]) return SLUG_TO_ISO[lower];

        // Names (ar/en)
        const normalizedName = lower.replace(/\s+/g, ' ').trim();
        if (NAME_TO_ISO[normalizedName]) return NAME_TO_ISO[normalizedName];

        return null;
    };

    const alternates = {
        canonical: `${baseUrl}/${LOCALES[0]}${pathname}`,
        languages: {}
    };

    const country = product?.country || {};
    const rawCandidates = [
        country?.slug,
        product?.country_slug,
        country?.code,
        country?.iso_code,
        country?.iso,
        country?.isoCode,
        country?.iso2,
        product?.country_code,
        country?.country_code, // often phone code
        country?.name,
        country?.english_name,
        product?.country_name
    ];

    const normalizedCandidates = rawCandidates.map(normalizeCountry).filter(Boolean);
    const productCountryCode = normalizedCandidates[0] || null;

    if (!productCountryCode) {
        if (process?.env?.NODE_ENV !== 'production') {
            console.log('[hreflang][product] country missing, fallback to all locales', {
                pathname,
                rawCandidates,
                countryObjKeys: country ? Object.keys(country) : null
            });
        }
        return generateHreflangAlternates(pathname, baseUrl);
    }

    const relevantLocales = LOCALES.filter(locale => {
        const [countryPart] = locale.split('-');
        return countryPart.toLowerCase() === productCountryCode;
    });

    if (relevantLocales.length === 0) {
        if (process?.env?.NODE_ENV !== 'production') {
            console.log('[hreflang][product] no matching locales for country, fallback to all', {
                pathname,
                productCountryCode,
                rawCandidates
            });
        }
        return generateHreflangAlternates(pathname, baseUrl);
    }

    relevantLocales.forEach(locale => {
        const [_, lang] = locale.split('-');
        alternates.languages[locale] = `${baseUrl}/${locale}${pathname}`;
        if (!alternates.languages[lang]) {
            alternates.languages[lang] = `${baseUrl}/${locale}${pathname}`;
        }
    });

    alternates.languages['x-default'] = `${baseUrl}/${relevantLocales[0]}${pathname}`;
    alternates.canonical = `${baseUrl}/${relevantLocales[0]}${pathname}`;

    if (process?.env?.NODE_ENV !== 'production') {
        const langsKeys = Object.keys(alternates.languages || {});
        console.log('[hreflang][product] alternates', {
            pathname,
            productCountryCode,
            relevantLocales,
            languagesKeys: langsKeys,
            canonical: alternates.canonical
        });
    }

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