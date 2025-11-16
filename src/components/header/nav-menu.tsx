'use client';

import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
                    className={cn(
                      'hover:text-accent-foreground data-[state=open]:text-accent-foreground text-[15px] font-medium text-gray-700 capitalize transition-colors'
                    )}
                  >
                    {getLocalizedString(link.name ?? [])}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <ul className="grid w-[220px] gap-1 p-2">
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
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="group relative p-0 text-[15px] font-medium capitalize transition-colors hover:bg-transparent"
                    asChild
                  >
                    {link.link ? (
                      <NavigationLink
                        href={link.link}
                        className={cn(
                          `hover:text-accent-foreground relative px-3 py-2 text-gray-700 transition-colors ${(() => {
                            const fullPath = `/${locale}${link.link === '/' ? '' : link.link}`;
                            // For home route, use exact match
                            if (link.link === '/') {
                              return pathname === fullPath
                                ? 'text-accent-foreground font-semibold!'
                                : '';
                            }
                            // For other routes, check if pathname starts with the link path
                            return pathname.startsWith(fullPath)
                              ? 'text-accent-foreground font-semibold!'
                              : '';
                          })()}`
                        )}
                      >
                        {getLocalizedString(link.name ?? [])}
                        {/* Underline effect */}
                        <span
                          className={cn(
                            'bg-accent-foreground absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100',
                            (() => {
                              const fullPath = `/${locale}${link.link === '/' ? '' : link.link}`;
                              if (link.link === '/') {
                                return pathname === fullPath
                                  ? 'scale-x-100'
                                  : '';
                              }
                              return pathname.startsWith(fullPath)
                                ? 'scale-x-100'
                                : '';
                            })()
                          )}
                        />
                      </NavigationLink>
                    ) : (
                      getLocalizedString(link.name ?? [])
                    )}
                  </Button>
                </div>
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
            'group hover:bg-accent-foreground/5 hover:text-accent-foreground focus:bg-accent-foreground/5 focus:text-accent-foreground block space-y-2 rounded-lg p-3 leading-none no-underline transition-all duration-200 outline-none select-none',
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm leading-none font-medium">{titleTxt}</span>
            <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
