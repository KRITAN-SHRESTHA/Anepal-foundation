'use client';

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
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import React from 'react';
import { navLinks } from './config';

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu viewport={false} {...props}>
    <NavigationMenuList className="gap-0 space-x-0 text-sm">
      {navLinks.map(link => (
        <NavigationMenuItem key={link.title}>
          {link.subMenu ? (
            <>
              <NavigationMenuTrigger className="text-[15px] font-normal capitalize">
                {link.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1">
                  {link.subMenu.map(menu => (
                    <ListItem
                      key={menu.title}
                      title={menu.title}
                      href={menu.href}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </>
          ) : (
            <Button
              variant="ghost"
              className="text-[15px] font-normal capitalize"
              asChild
            >
              <Link href={link.href}>{link.title}</Link>
            </Button>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, ...props }, ref) => {
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
          <div className="text-sm leading-none font-semibold">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
