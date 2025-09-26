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
