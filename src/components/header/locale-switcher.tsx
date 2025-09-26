'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Locale } from '@/i18n/config';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

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
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function handleSwtchLocale(value: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value }
      );
      // router.replace(
      //   pathname.replace(`/${params.locale}`, `/${value}`) +
      //     (searchParams.toString() ? `?${searchParams.toString()}` : '')
      // );
    });
  }

  return (
    <Select
      defaultValue={locale}
      onValueChange={handleSwtchLocale}
      disabled={isPending}
    >
      <SelectTrigger className="cursor-pointer border-none pr-1 pl-0 font-bold shadow-none [&_svg]:hidden">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {routing.locales.map(locale => (
            <SelectItem
              key={locale}
              value={locale}
              className="font-bold capitalize"
            >
              {locale === 'en' ? (
                <>
                  <Image
                    src={`/assets/flags/uk-flag.png`}
                    width={20}
                    height={20}
                    alt="select english language"
                  />
                  EN
                </>
              ) : (
                <>
                  <Image
                    src={`/assets/flags/spain-flag.png`}
                    width={20}
                    height={20}
                    alt="select english language"
                  />
                  ES
                </>
              )}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
