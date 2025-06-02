'use client';

import { Button } from '@/components/ui/button';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import InfoBar from './info-bar';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <InfoBar />

      <header className="sticky top-0 z-[50]">
        <nav className="bg-background border-b">
          <div className="mx-auto flex h-19 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href={'/'}>
              <div className="h-[56px] w-[100px] shrink-0">
                <Image
                  src={'/assets/logo.png'}
                  alt="Anepal-foundation-logo"
                  width={100}
                  height={100}
                  className="h-full w-full"
                />
              </div>
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
    </>
  );
};

export default Header;
