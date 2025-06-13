'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';

import { setUserLocale } from '@/lib/locale';
import { Locale } from '@/i18n/config';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import Image from 'next/image';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function handleSwtchLocale(value: Locale) {
    startTransition(() => {
      setUserLocale(value);
    });
  }

  return (
    <Select
      defaultValue={locale}
      onValueChange={handleSwtchLocale}
      disabled={isPending}
    >
      <SelectTrigger className="border-none pr-1 pl-0 font-bold shadow-none [&_svg]:hidden">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectItem value="en" className="font-bold">
            <Image
              src={'/assets/flags/uk-flag.png'}
              width={20}
              height={20}
              alt="select english language"
            />
            EN
          </SelectItem>
          <SelectItem value="es" className="font-bold">
            <Image
              src={'/assets/flags/spain-flag.png'}
              width={20}
              height={20}
              alt="select spanish language"
            />
            ES
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
