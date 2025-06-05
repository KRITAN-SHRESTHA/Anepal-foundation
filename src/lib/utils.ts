import { InternationalizedArrayStringValue } from '@/sanity/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type T =
  | ({
      _key: string;
    } & InternationalizedArrayStringValue)
  | undefined;

export function getLocalizedString(data: T[], lang = 'en') {
  if (!data || data.length === 0) return null;
  return data.find(val => val?._key === lang)?.value;
}
