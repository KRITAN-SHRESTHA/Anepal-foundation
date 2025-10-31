import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';

import LocaleSwitcher from './locale-switcher';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import MobileNav from './mobile-nav';
import Logo from './logo';
import NavigationLink from '../navigation-link';

const NavMenu = dynamic(() => import('./nav-menu').then(mod => mod.NavMenu), {
  ssr: false
});

export default function HeaderClient() {
  const t = useTranslations('Default');

  return (
    <header className="sticky top-0 z-50">
      <nav className="shadow-accent-foreground bg-white shadow-lg/20">
        <div className="mx-auto flex h-19 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavigationLink href={'/'} className="cursor-pointer">
            <Logo />
          </NavigationLink>
          {/* Desktop Menu */}
          <Suspense fallback="Loading.....">
            <NavMenu className="laptop:block hidden" />
          </Suspense>

          <div className="flex items-center gap-3">
            <NavigationLink href={'/payment'}>
              <Button className="h-[40px] w-[130px] rounded-full">
                {t('Donate_us')} <ArrowUpRight />
              </Button>
            </NavigationLink>

            <LocaleSwitcher />

            {/* Mobile Menu */}
            <div className="laptop:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
