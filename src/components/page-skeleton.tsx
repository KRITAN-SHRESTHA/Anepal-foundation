import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  variant: 'blue' | 'pink' | 'skyblue' | 'gradient';
}

export default function PageSkeleton({ variant }: Props) {
  return (
    <div
      className={cn('relative h-[450px] w-full overflow-hidden', {
        'bg-[#E9FEFC]/50': variant === 'blue',
        'bg-[#FFEDEF]/50': variant === 'pink',
        'bg-[#F0DD8F]/50': variant === 'gradient',
        'bg-[#EBF7FF]/50': variant === 'skyblue'
      })}
    >
      <div className="relative z-5 flex h-full items-center justify-center">
        <div className="grid place-items-center space-y-5">
          <Skeleton className="h-[60px] w-[300px] bg-white md:h-14 md:w-72 lg:h-[72px]" />
          <Skeleton className="h-[14px] w-[100px] bg-white" />
        </div>
      </div>
    </div>
  );
}
