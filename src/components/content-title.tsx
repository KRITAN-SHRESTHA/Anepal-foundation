import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface ContentTitleCustomProps {
  title?: string | null;
  subtitle?: string | null;
  titleClassname?: string;
  subtitleClassname?: string;
  align?: 'center' | 'left';
}

type ContentTitleProps = ContentTitleCustomProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export default function ContentTitle({
  subtitle,
  title,
  className,
  subtitleClassname,
  titleClassname,
  align = 'left',
  ...props
}: ContentTitleProps) {
  return (
    <div
      className={cn(
        {
          '': align === 'left',
          'text-center': align === 'center'
        },
        className
      )}
      {...props}
    >
      {!!title ? (
        <h2
          className={cn(
            '!leading-[1.2] font-extrabold text-[#9e9e9e]',
            titleClassname
          )}
        >
          {title}
        </h2>
      ) : null}

      {subtitle ? (
        <h3
          className={cn(
            'text-[32px] leading-[110%] font-extrabold tracking-tight text-[#515266] md:text-[40px] lg:text-[50px]',
            {
              'pt-4': !!title
            },
            subtitleClassname
          )}
        >
          {subtitle}
        </h3>
      ) : null}
    </div>
  );
}
