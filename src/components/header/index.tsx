import { Button } from '@/components/ui/button';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import InfoBar from './info-bar';

const Header = () => {
  return (
    <>
      <InfoBar />

      <header>
        <nav className="bg-background z-[100] h-19 border-b">
          <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="h-[56px] w-[100px] shrink-0">
              <Image
                src={'/assets/logo.png'}
                alt="Anepal-foundation-logo"
                width={100}
                height={100}
                className="h-full w-full"
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
      </header>
    </>
  );
};

export default Header;
