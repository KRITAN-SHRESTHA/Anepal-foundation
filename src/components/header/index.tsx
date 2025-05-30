import { Button } from '@/components/ui/button';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="bg-muted min-h-screen">
      <nav className="bg-background h-19 border-b">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="shrink-0">
            <Image
              src={'/assets/logo.png'}
              alt="Anepal-foundation-logo"
              width={100}
              height={100}
              className="h-auto w-auto"
            />
          </div>
          {/* Desktop Menu */}
          <NavMenu className="laptop:block hidden" />

          <div className="flex items-center gap-3">
            <Button className="h-[40px] w-[130px] bg-purple-700 hover:bg-purple-900">
              Donacion <ArrowUpRight />
            </Button>

            {/* Mobile Menu */}
            <div className="laptop:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
