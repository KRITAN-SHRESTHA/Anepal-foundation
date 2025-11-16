import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ContainerLayout({ children, className }: Props) {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
