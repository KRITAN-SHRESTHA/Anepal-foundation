'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';

import { NavigationSheet } from './navigation-sheet';
import { Skeleton } from '../ui/skeleton';

const Logo = dynamic(() => import('./logo'), {
  ssr: false,
  loading: () => (
    <Skeleton className="h-[56px] w-[100px]" aria-label="Loading logo" />
  )
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
