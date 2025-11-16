import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function TeamMemberPageSkeleton() {
  return (
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
  );
}
