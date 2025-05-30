import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { foods, travelMenuItems } from './config';
import { Logo } from './logo';

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <Logo />

        <div className="mt-12 space-y-4 text-base">
          <Link href="#">Home</Link>

          <div>
            <div className="font-bold">Food</div>
            <ul className="mt-2 ml-1 space-y-3 border-l pl-4">
              {foods.map(foodItem => (
                <li key={foodItem.title}>
                  <Link href="#" className="flex items-center gap-2">
                    <foodItem.icon className="text-muted-foreground mr-2 h-5 w-5" />
                    {foodItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-bold">Travel</div>
            <ul className="mt-2 ml-1 space-y-3 border-l pl-4">
              {travelMenuItems.map(item => (
                <li key={item.title}>
                  <Link href="#" className="flex items-center gap-2">
                    <item.icon className="text-muted-foreground mr-2 h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
