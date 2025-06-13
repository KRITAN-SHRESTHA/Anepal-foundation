import { getLocalizedString, LocalisedDataType } from '@/lib/utils';
import { useLocale } from 'next-intl';

export default function useGetLocale() {
  const locale = useLocale();

  function getLocalized(data: LocalisedDataType[]) {
    if (data.length === 0) {
      return getLocalizedString([], locale);
    }
    return getLocalizedString(data, locale);
  }

  return {
    getLocalizedString: getLocalized,
    locale
  };
}
