'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n-config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import React, { useEffect } from 'react';
import { useDictionary } from '@/context/dictionary-context';
import Image from 'next/image';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const { locale } = useDictionary();
  const [showStatusBar, setShowStatusBar] = React.useState<Locale>('en');

  useEffect(() => {
    setShowStatusBar(locale);
  }, [locale]);

  // useEffect(() => {
  //   setShowStatusBar(locale === 'en' ? 'en' : 'es');
  // }, [locale]);

  // const handleChange = e => {
  //   if (showStatusBar) console.log('e', e);
  // };

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-10" align="end">
        <Link href={redirectedPathname('en')} scroll={false}>
          <DropdownMenuCheckboxItem
            textValue="en"
            checked={showStatusBar === 'en'}
            className="relative"
          >
            <Image
              src={'/flag-round-500.png'}
              alt="british flag"
              width={20}
              height={20}
            />
            en
          </DropdownMenuCheckboxItem>
        </Link>
        <Link href={redirectedPathname('es')} scroll={false}>
          <DropdownMenuCheckboxItem
            textValue="es"
            checked={showStatusBar === 'es'}
          >
            <div className="relative h-[40px] w-[40px]">
              <Image
                src={'/assets/spain-flag.svg'}
                alt="spanish flag"
                fill
                className="h-full w-full"
              />
            </div>
            es
          </DropdownMenuCheckboxItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // return (
  //   <div>
  //     <ul className="flex items-center">
  //       {i18n.locales.map(locale => {
  //         return (
  //           <li key={locale}>
  //             <Link href={redirectedPathname(locale)} scroll={false}>
  //               {locale}
  //             </Link>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
}
