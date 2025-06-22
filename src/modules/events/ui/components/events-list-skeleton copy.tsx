import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function EventsListSkeleton() {
  return (
    <div className="grid gap-12">
      {Array.from({ length: 10 }).map((_, idx) => (
        <div key={idx} className="flex gap-3">
          <div className="xs:grid hidden h-fit w-full max-w-[100px] justify-items-center gap-y-3 bg-white px-[10px] py-[20px] shadow-sm">
            <Skeleton className="xs:grid hidden h-[40px] w-[70%]" />
            <Skeleton className="xs:grid hidden h-[22px] w-[75%]" />
          </div>

          <Card className="flex flex-1 gap-x-0 gap-y-8 overflow-hidden rounded-none border-none bg-white py-6 shadow-xl md:flex-row md:items-center">
            <div className="w-full overflow-hidden pr-6 pl-6 md:w-[40%] md:pr-0">
              <div className="relative aspect-video md:h-[230px] md:w-full">
                <Skeleton className="h-full w-full rounded-none" />
              </div>
            </div>
            <div className="flex-1">
              <CardHeader>
                <Skeleton className="h-[27px] w-[60%]" />
              </CardHeader>
              <CardContent className="mt-3 space-y-1">
                <Skeleton className="h-[20px] w-full" />
                <Skeleton className="h-[20px] w-[90%]" />
                <Skeleton className="h-[20px] w-[70%]" />
              </CardContent>
              <CardFooter className="mt-4 grid gap-y-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-[20px] w-[40%]" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-[20px] w-[40%]" />
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
