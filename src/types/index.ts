import {
  InternationalizedArrayStringValue,
  InternationalizedArrayTextValue
} from '@/sanity/types';

export type InternalizedArrayStringValueType =
  | ({
      _key: string;
    } & InternationalizedArrayStringValue)[]
  | undefined
  | string;

export type InternalizedArrayTextValueType =
  | ({
      _key: string;
    } & InternationalizedArrayTextValue)[]
  | undefined
  | string;
