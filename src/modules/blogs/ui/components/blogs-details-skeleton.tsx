import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function BlogDetailsSkeleton() {
  return (
    <div className="m-auto max-w-6xl px-4 pt-[50px] pb-32 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <Skeleton className="h-[48px] w-[60%] md:h-[60px]" />

        <div className="grid w-full justify-items-center gap-y-2">
          <Skeleton className="h-[48px] w-[80%] md:h-[28px]" />
          <Skeleton className="h-[48px] w-[40%] md:h-[28px]" />
        </div>
      </div>
      <div className="relative my-12 aspect-video shrink-0">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}
