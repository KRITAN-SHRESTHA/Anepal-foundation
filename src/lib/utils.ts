import {
  InternationalizedArrayStringValue,
  InternationalizedArrayTextValue
} from '@/sanity/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Locale } from './i18n-config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type T =
  | (
      | ({
          _key: string;
        } & InternationalizedArrayStringValue)
      | ({
          _key: string;
        } & InternationalizedArrayTextValue)
    )
  | undefined;

export function getLocalizedString(data: T[], lang: Locale = 'en') {
  if (!data || data.length === 0) return null;
  return data.find(val => val?._key === lang)?.value;
}
