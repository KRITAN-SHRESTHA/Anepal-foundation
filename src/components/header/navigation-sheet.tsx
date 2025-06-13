import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';

import Logo from './logo';

export const NavigationSheet = () => {
  const [settingsData] = trpc.settings.getSettings.useSuspenseQuery();
  const [navData] = trpc.header.getHeader.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto p-6">
        <Link href={'/'}>
          <Logo />
        </Link>

        <div className="bg-accent space-y-1.5 rounded-md px-4 py-3">
          {/* phone number */}
          <div className="flex flex-col">
            <span className="text-xs">Phone number:</span>
            <a
              href={`tel:${settingsData.contact?.phone}`}
              className="text-[13px] leading-[100%] font-medium"
            >
              {settingsData.contact?.phone}
            </a>
          </div>
          {/* address */}
          <div className="flex flex-col">
            <span className="text-xs">Address:</span>
            <p className="text-[13px] leading-[115%] font-medium">
              {settingsData.contact?.address}
            </p>
          </div>
          {/* email */}
          <div className="flex flex-col">
            <span className="text-xs">Email:</span>
            <a
              href={`mailto:${settingsData.contact?.email}`}
              className="text-[13px] leading-[100%] font-medium"
            >
              {settingsData.contact?.email}
            </a>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-base">
          {navData.map(nav => (
            <div key={nav._id}>
              {nav.link ? (
                <Link href={nav.link}>
                  <div className="font-bold underline-offset-2 hover:underline">
                    {getLocalizedString(nav.name ?? [])}
                  </div>
                </Link>
              ) : (
                <div className="font-bold">
                  {getLocalizedString(nav.name ?? [])}
                </div>
              )}
              {nav.subLinks && (
                <ul className="mt-2 ml-1 space-y-2 border-l pl-4">
                  {nav.subLinks.map(sub => (
                    <li key={sub._key}>
                      {sub.link ? (
                        <Link
                          href={sub.link}
                          className="underline-offset-2 hover:underline"
                        >
                          {getLocalizedString(nav.name ?? [])}
                        </Link>
                      ) : (
                        <p>{getLocalizedString(nav.name ?? [])}</p>
                      )}
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
