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
      <SelectTrigger className="">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
