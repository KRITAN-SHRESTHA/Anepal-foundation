import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function BannerSkeletion() {
  return (
    <div className="relative h-[65vh] w-full lg:h-[85vh]">
      <Skeleton className="absolute h-full w-full bg-white" />

      <section className="mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="w-full max-w-2xl">
            <Skeleton className="h-[62px] w-[calc(100vw-100px)] bg-gray-500/10 md:w-[400px]" />
            <div className="my-6 space-y-1">
              <Skeleton className="h-[20px] w-[70%] bg-gray-500/10" />
              <Skeleton className="h-[20px] w-[30%] bg-gray-500/10" />
            </div>
          </div>
          <Skeleton className="h-[40px] w-[150px] bg-gray-500/10" />
        </div>
      </section>
    </div>
  );
}
