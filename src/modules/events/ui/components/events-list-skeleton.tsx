import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function EventsListSkeleton() {
  return (
    <div className="grid w-full gap-y-10 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card
          key={idx}
          className="order-last border-0 bg-transparent py-5 shadow-none sm:order-first sm:col-span-12 md:py-10 lg:col-span-10 lg:col-start-2"
        >
          <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
            <div className="sm:col-span-5">
              <Skeleton className="h-[36px] w-[60%]" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-[15px] w-full" />
                <Skeleton className="h-[15px] w-full" />
                <Skeleton className="h-[15px] w-full" />
              </div>
              <div className="mt-6 flex flex-wrap items-center space-x-4 text-sm md:mt-8">
                <div className="flex">
                  <Skeleton className="h-[20px] w-[50px]" />
                  &nbsp;
                  <Skeleton className="h-[20px] w-[100px]" />
                </div>
                <span className="text-muted-foreground">•</span>
                <div className="flex">
                  <Skeleton className="h-[20px] w-[50px]" />
                  &nbsp;
                  <Skeleton className="h-[20px] w-[100px]" />
                </div>
              </div>
              <div className="mt-6 md:mt-8">
                <Skeleton className="h-[24px] w-[100px]" />
              </div>
            </div>
            <div className="order-first sm:order-last sm:col-span-5">
              <div className="relative aspect-16/9 overflow-clip rounded-lg border border-none">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
