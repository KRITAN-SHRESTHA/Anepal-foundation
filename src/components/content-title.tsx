import useGetLocale from '@/hooks/use-get-locale';
import { cn, LocalisedDataType } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface ContentTitleCustomProps {
  title?: LocalisedDataType[] | string | null;
  subtitle?: LocalisedDataType[] | string | null;
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
  const { getLocalizedString } = useGetLocale();

  const convertedTitle =
    typeof title === 'string' ? title : getLocalizedString(title ?? []);

  const convertedSubtitle =
    typeof subtitle === 'string'
      ? subtitle
      : getLocalizedString(subtitle ?? []);

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
      {!!subtitle ? (
        <h2
          className={cn(
            '!leading-[1.2] font-extrabold text-[#9e9e9e]',
            subtitleClassname
          )}
        >
          {/* {getLocalizedString(subtitle) ?? []} */}
          {convertedSubtitle}
        </h2>
      ) : null}

      {title ? (
        <h3
          className={cn(
            'text-[32px] leading-[110%] font-extrabold tracking-tight text-[#515266] md:text-[40px] lg:text-[50px]',
            {
              'pt-4': !!subtitle
            },
            titleClassname
          )}
        >
          {/* {getLocalizedString(title) ?? []} */}
          {convertedTitle}
        </h3>
      ) : null}
    </div>
  );
}
