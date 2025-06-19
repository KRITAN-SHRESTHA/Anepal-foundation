import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function PaymentSkeleton() {
  return (
    <div>
      <Skeleton className="h-[50px] w-full" />
      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <hr className="border-dashed" />
        <span className="text-muted-foreground text-xs">
          Or donate with Credit/Debit Card
        </span>
        <hr className="border-dashed" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[40px] w-full" />
        ))}
      </div>
    </div>
  );
}
