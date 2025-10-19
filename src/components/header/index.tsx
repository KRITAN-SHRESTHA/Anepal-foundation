'use client';

import { usePathname } from 'next/navigation';
import HeaderClient from './header';
import InfoBar from './info-bar';

export default function Header() {
  const pathname = usePathname();

  if (pathname.includes('/studio')) {
    return null;
  }

  return (
    <>
      <InfoBar />
      <HeaderClient />
    </>
  );
}
