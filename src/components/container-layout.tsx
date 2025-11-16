import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className: string;
}

export default function ContainerLayout({ children, className }: Props) {
  return (
    <div className={cn('container mx-auto px-4 md:px-5 lg:px-6', className)}>
      {children}
    </div>
  );
}
