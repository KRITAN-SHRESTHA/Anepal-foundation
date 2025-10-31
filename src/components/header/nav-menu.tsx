'use client';

import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import useGetLocale from '@/hooks/use-get-locale';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import NavigationLink from '../navigation-link';

export const NavMenu = (props: NavigationMenuProps) => {
  const [navData] = trpc.header.getHeader.useSuspenseQuery();
  const { getLocalizedString, locale } = useGetLocale();
  const pathname = usePathname();

  if (navData.length === 0) {
    return null;
  }

  return (
    <NavigationMenu viewport={false} {...props}>
      <NavigationMenuList
        className={`text-secondary-foreground ${locale === 'en' ? 'gap-7' : 'gap-4'} space-x-0 text-sm`}
      >
        {navData.map(link => {
          return (
            <NavigationMenuItem key={link._id}>
              {/* sublinks */}
              {link.subLinks && link.subLinks?.length > 0 ? (
                <>
                  <NavigationMenuTrigger
                    className={cn('text-[15px] font-normal capitalize')}
                  >
                    {getLocalizedString(link.name ?? [])}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <ul className="grid w-[200px] gap-1">
                      {link.subLinks.map(menu => {
                        if (!menu.link) return null;

                        return (
                          <ListItem
                            key={menu._key}
                            titleTxt={getLocalizedString(menu.name ?? [])}
                            href={menu.link}
                          />
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                // main links
                <Button
                  variant="ghost"
                  className="hover:text-primary p-0 text-[15px] font-normal capitalize hover:bg-transparent hover:font-bold"
                  asChild
                >
                  {link.link ? (
                    <NavigationLink
                      href={link.link}
                      className={cn(
                        `text-black ${(() => {
                          const fullPath = `/${locale}${link.link === '/' ? '' : link.link}`;
                          // For home route, use exact match
                          if (link.link === '/') {
                            return pathname === fullPath
                              ? 'text-primary font-bold!'
                              : '';
                          }
                          // For other routes, check if pathname starts with the link path
                          return pathname.startsWith(fullPath)
                            ? 'text-primary font-bold!'
                            : '';
                        })()}`
                      )}
                    >
                      {getLocalizedString(link.name ?? [])}
                    </NavigationLink>
                  ) : (
                    getLocalizedString(link.name ?? [])
                  )}
                </Button>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    titleTxt: string | null | undefined;
  }
>(({ className, titleTxt, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-2 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none">{titleTxt}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
