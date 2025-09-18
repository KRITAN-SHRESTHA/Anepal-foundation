import React, { Suspense } from 'react';
import { Sheet, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import dynamic from 'next/dynamic';

const NavigationSheet = dynamic(
  () => import('./navigation-sheet').then(mod => mod.NavigationSheet),
  {
    ssr: false
  }
);

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <Suspense fallback={<div>Loading...</div>}>
        <NavigationSheet />
      </Suspense>
    </Sheet>
  );
}
