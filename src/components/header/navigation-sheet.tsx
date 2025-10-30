import { usePathname } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

import { SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';

import { cn } from '@/lib/utils';
import NavigationLink from '../navigation-link';
import Logo from './logo';
import { useTranslations } from 'next-intl';

export default function NavigationSheet() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <NavigationSheetSuspense />
    </ErrorBoundary>
  );
}

const NavigationSheetSuspense = () => {
  const [settingsData] = trpc.settings.getSettings.useSuspenseQuery();
  const [navData] = trpc.header.getHeader.useSuspenseQuery();
  const { getLocalizedString, locale } = useGetLocale();
  const pathname = usePathname();
  const t = useTranslations('ContactPage');

  return (
    <SheetContent className="overflow-y-auto p-6">
      <SheetTrigger asChild>
        <NavigationLink href={'/'}>
          <Logo className="h-[80px] w-[150px]" />
        </NavigationLink>
      </SheetTrigger>

      <div className="bg-accent space-y-1.5 rounded-md px-4 py-3">
        {/* phone number */}
        <div className="flex flex-col">
          <span className="text-xs">{t('Phone')}:</span>
          <a
            href={`tel:${settingsData.contact?.phone}`}
            className="text-secondary-foreground text-[13px] leading-[100%] font-medium"
          >
            {settingsData.contact?.phone}
          </a>
        </div>
        {/* address */}
        <div className="flex flex-col">
          <span className="text-xs">{t('Address')}:</span>
          <p className="text-secondary-foreground text-[13px] leading-[115%] font-medium">
            {settingsData.contact?.address}
          </p>
        </div>
        {/* email */}
        <div className="flex flex-col">
          <span className="text-xs">{t('Email')}:</span>
          <a
            href={`mailto:${settingsData.contact?.email}`}
            className="text-secondary-foreground text-[13px] leading-[100%] font-medium"
          >
            {settingsData.contact?.email}
          </a>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-base">
        {navData.map(nav => (
          <div key={nav._id}>
            {nav.link ? (
              <SheetTrigger asChild>
                <NavigationLink href={nav.link}>
                  <div
                    className={cn(
                      `text-secondary-foreground hover:underline' underline-offset-2 ${(() => {
                        const fullPath = `/${locale}${nav.link === '/' ? '' : nav.link}`;
                        // For home route, use exact match
                        if (nav.link === '/') {
                          return pathname === fullPath
                            ? 'font-bold! text-purple-700'
                            : '';
                        }
                        // For other routes, check if pathname starts with the link path
                        return pathname.startsWith(fullPath)
                          ? 'font-bold! text-purple-700'
                          : '';
                      })()}`
                    )}
                  >
                    {getLocalizedString(nav.name ?? [])}
                  </div>
                </NavigationLink>
              </SheetTrigger>
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
                      <SheetTrigger asChild>
                        <NavigationLink
                          href={sub.link}
                          className={cn(
                            `${(() => {
                              const fullPath = `/${locale}${sub.link === '/' ? '' : sub.link}`;
                              // For home route, use exact match
                              if (sub.link === '/') {
                                return pathname === fullPath
                                  ? 'font-bold! text-purple-700'
                                  : '';
                              }
                              // For other routes, check if pathname starts with the link path
                              return pathname.startsWith(fullPath)
                                ? 'font-bold! text-purple-700'
                                : '';
                            })()}`
                          )}
                        >
                          {getLocalizedString(nav.name ?? [])}
                        </NavigationLink>
                      </SheetTrigger>
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
  );

  // return (
  //   <Sheet>
  //     <SheetTrigger asChild>
  //       <Button variant="outline" size="icon">
  //         <Menu />
  //       </Button>
  //     </SheetTrigger>
  //     <SheetContent className="overflow-y-auto p-6">
  //       <SheetTrigger asChild>
  //         <Link href={'/'}>
  //           <Logo />
  //         </Link>
  //       </SheetTrigger>

  //       <div className="bg-accent space-y-1.5 rounded-md px-4 py-3">
  //         {/* phone number */}
  //         <div className="flex flex-col">
  //           <span className="text-xs">Phone number:</span>
  //           <a
  //             href={`tel:${settingsData.contact?.phone}`}
  //             className="text-[13px] leading-[100%] font-medium"
  //           >
  //             {settingsData.contact?.phone}
  //           </a>
  //         </div>
  //         {/* address */}
  //         <div className="flex flex-col">
  //           <span className="text-xs">Address:</span>
  //           <p className="text-[13px] leading-[115%] font-medium">
  //             {settingsData.contact?.address}
  //           </p>
  //         </div>
  //         {/* email */}
  //         <div className="flex flex-col">
  //           <span className="text-xs">Email:</span>
  //           <a
  //             href={`mailto:${settingsData.contact?.email}`}
  //             className="text-[13px] leading-[100%] font-medium"
  //           >
  //             {settingsData.contact?.email}
  //           </a>
  //         </div>
  //       </div>

  //       <div className="mt-5 space-y-3 text-base">
  //         {navData.map(nav => (
  //           <div key={nav._id}>
  //             {nav.link ? (
  //               <SheetTrigger asChild>
  //                 <Link href={nav.link}>
  //                   <div
  //                     className={cn(
  //                       'text-muted-foreground underline-offset-2 hover:underline',
  //                       {
  //                         'font-bold! text-purple-700!': pathname === nav.link
  //                       }
  //                     )}
  //                   >
  //                     {getLocalizedString(nav.name ?? [])}
  //                   </div>
  //                 </Link>
  //               </SheetTrigger>
  //             ) : (
  //               <div className="font-bold">
  //                 {getLocalizedString(nav.name ?? [])}
  //               </div>
  //             )}
  //             {nav.subLinks && (
  //               <ul className="mt-2 ml-1 space-y-2 border-l pl-4">
  //                 {nav.subLinks.map(sub => (
  //                   <li key={sub._key}>
  //                     {sub.link ? (
  //                       <SheetTrigger asChild>
  //                         <Link
  //                           href={sub.link}
  //                           className={cn(
  //                             'text-muted-foreground underline-offset-2 hover:underline',
  //                             {
  //                               'font-bold! text-purple-700!':
  //                                 pathname === sub.link
  //                             }
  //                           )}
  //                         >
  //                           {getLocalizedString(nav.name ?? [])}
  //                         </Link>
  //                       </SheetTrigger>
  //                     ) : (
  //                       <p>{getLocalizedString(nav.name ?? [])}</p>
  //                     )}
  //                   </li>
  //                 ))}
  //               </ul>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </SheetContent>
  //   </Sheet>
  // );
};
