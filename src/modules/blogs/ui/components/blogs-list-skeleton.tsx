import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function BlogsListSkeleton() {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card
          key={idx}
          className="grid grid-rows-[auto_auto_1fr_auto] border-none bg-white pt-0"
        >
          <div className="relative aspect-16/9 w-full overflow-clip">
            <Skeleton className="h-full w-full rounded-b-none" />
          </div>
          <CardHeader>
            <Skeleton className="h-[15px] w-full" />
            <Skeleton className="h-[15px] w-full" />
          </CardHeader>

          <CardContent className="space-y-2">
            <Skeleton className="h-[15px] w-full" />
            <Skeleton className="h-[15px] w-[60%]" />
            <Skeleton className="h-[15px] w-[20%]" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-[15px] w-[60px]" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
