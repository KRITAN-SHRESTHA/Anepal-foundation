import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function StoriesPageSkeleton() {
  return (
    <div>
      <div className="relative h-[50vh] w-full md:h-[60vh] lg:h-[70vh]">
        <Skeleton className="bg-accent absolute h-full w-full" />

        <section className="lg:px-8. z-40 mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6">
          <div className="relative w-full">
            <div className="w-full max-w-2xl">
              <Skeleton className="h-[36px] w-[50%] bg-white md:w-[20%]" />
              <Skeleton className="mt-3 h-[60px] w-[80%] bg-white md:h-[78px] md:w-[50%]" />
            </div>
          </div>
        </section>
      </div>
      <div
        className={
          'tablet:grid-cols-2 mx-auto grid w-full max-w-screen-xl items-center gap-x-12 gap-y-8 px-4 pt-[80px] pb-[50px] sm:px-6 lg:px-8 lg:pb-[80px]'
        }
      >
        <div>
          <Skeleton className="h-[19px] w-[40%]" />

          <Skeleton className="mt-[16px] h-[50px] w-[70%]" />
          <div className="mt-[18px] space-y-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[19px] w-full last:w-[40%]" />
            ))}
          </div>
        </div>
        <div className={'relative overflow-hidden p-2'}>
          <div className="relative aspect-square w-full">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
