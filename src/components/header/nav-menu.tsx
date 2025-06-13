'use client';

import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
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
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';

export const NavMenu = (props: NavigationMenuProps) => {
  const [navData] = trpc.header.getHeader.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  return (
    <NavigationMenu viewport={false} {...props}>
      <NavigationMenuList className="gap-0 space-x-0 text-sm">
        {navData.map(link => (
          <NavigationMenuItem key={link._id}>
            {link.subLinks && link.subLinks?.length > 0 ? (
              <>
                <NavigationMenuTrigger className="text-[15px] font-normal capitalize">
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
              <Button
                variant="ghost"
                className="text-[15px] font-normal capitalize"
                asChild
              >
                {link.link ? (
                  <Link href={link.link}>
                    {getLocalizedString(link.name ?? [])}
                  </Link>
                ) : (
                  getLocalizedString(link.name ?? [])
                )}
              </Button>
            )}
          </NavigationMenuItem>
        ))}
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
