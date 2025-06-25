import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function TeamMemberPageSkeleton() {
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
      <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-[60px] sm:py-[100px]">
          <div className="flex flex-col items-center">
            <Skeleton className="h-[20px] w-[25%]" />
            <Skeleton className="mt-6 h-[70px] w-[40%]" />
          </div>

          <div className="m-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-10">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div className="relative h-[100px] w-[200px]" key={idx}>
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
