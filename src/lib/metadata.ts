import { routing } from '@/i18n/routing';
import { getClientUrl } from '@/lib/utils';

export function generateAlternates(path: string, locale: string) {
  const baseUrl = getClientUrl();

  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: Object.fromEntries(
      routing.locales.map(loc => [
        loc === 'en' ? 'en-US' : 'es-ES',
        `${baseUrl}/${loc}${path}`
      ])
    )
  };
}

export function generateFullPath(path: string, locale: string) {
  const baseUrl = getClientUrl();

  return `${baseUrl}/${locale}${path}`;
}

/**
 * Maps locale to OpenGraph locale format
 * @param locale - The locale code ('en' or 'es')
 * @returns OpenGraph locale string (e.g., 'en_US' or 'es_ES')
 */
export function getOpenGraphLocale(locale: string): string {
  const localeMap: Record<string, string> = {
    en: 'en_US',
    es: 'es_ES'
  };

  return localeMap[locale] || 'en_US';
}

/**
 * Generates alternate OpenGraph locales
 * @param locale - The current locale
 * @returns Array of alternate locale strings
 */
export function getOpenGraphAlternateLocales(locale: string): string[] {
  return routing.locales
    .filter(loc => loc !== locale)
    .map(loc => getOpenGraphLocale(loc));
}
