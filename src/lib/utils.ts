import {
  InternationalizedArrayStringValue,
  InternationalizedArrayTextValue
} from '@/sanity/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type LocalisedDataType =
  | ({
      _key: string;
    } & InternationalizedArrayStringValue)
  | ({
      _key: string;
    } & InternationalizedArrayTextValue);

export function getLocalizedString(data: LocalisedDataType[], lang: string) {
  if (!data || data.length === 0) return null;

  return data.find(val => val?._key === lang)?.value;
}

export const getMetadataBase = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return process.env.NEXT_PUBLIC_VERCEL_URL;
  }
  return 'https://anepal-foundation.vercel.app';
};
