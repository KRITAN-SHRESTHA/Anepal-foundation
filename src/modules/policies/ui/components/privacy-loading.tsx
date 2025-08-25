import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function PrivacyLoading() {
  return (
    <section className="py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-16">
        <Skeleton className="h-[60px] w-full max-w-3xl" />
        <div className="w-full space-y-2">
          <Skeleton className="h-[24px] w-[60%]" />
          <Skeleton className="h-[24px] w-[70%]" />
          <Skeleton className="h-[24px] w-[80%]" />
          <Skeleton className="h-[24px] w-[90%]" />
          <Skeleton className="h-[24px] w-full" />
        </div>
      </div>
    </section>
  );
}
