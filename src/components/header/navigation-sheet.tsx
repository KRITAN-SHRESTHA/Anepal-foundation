import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks } from './config';

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        {/* <Logo /> */}
        <Link href={'/'}>
          <div className="shrink-0">
            <Image
              src={'/assets/logo.png'}
              alt="Anepal-foundation-logo"
              width={200}
              height={100}
              className="h-auto w-auto"
            />
          </div>
        </Link>

        <div className="mt-5 space-y-3 text-base">
          {navLinks.map(nav => (
            <div key={nav.title}>
              {nav.href ? (
                <Link href={nav.href}>
                  <div className="font-bold underline-offset-2 hover:underline">
                    {nav.title}
                  </div>
                </Link>
              ) : (
                <div className="font-bold">{nav.title}</div>
              )}
              {nav.subMenu && (
                <ul className="mt-2 ml-1 space-y-2 border-l pl-4">
                  {nav.subMenu.map(sub => (
                    <li key={sub.title}>
                      <Link
                        href={sub.href}
                        className="underline-offset-2 hover:underline"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
