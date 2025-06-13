'use client';

import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/ui/button';

import LocaleSwitcher from './locale-switcher';
import { NavigationSheet } from './navigation-sheet';

const Logo = dynamic(() => import('./logo'), {
  ssr: false
});
const NavMenu = dynamic(() => import('./nav-menu').then(mod => mod.NavMenu), {
  ssr: false
});

export default function HeaderClient() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <HeaderClientSuspense />
    </ErrorBoundary>
  );
}

function HeaderClientSuspense() {
  const pathname = usePathname();

  if (pathname.includes('/studio')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-[50]">
      <nav className="bg-background border-b">
        <div className="mx-auto flex h-19 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={'/'}>
            <Logo />
          </Link>
          {/* Desktop Menu */}
          <NavMenu className="laptop:block hidden" />

          <div className="flex items-center gap-3">
            <Button className="h-[40px] w-[130px] rounded-full bg-purple-700 hover:bg-purple-900">
              Donacion <ArrowUpRight />
            </Button>

            <LocaleSwitcher />

            {/* Mobile Menu */}
            <div className="laptop:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
