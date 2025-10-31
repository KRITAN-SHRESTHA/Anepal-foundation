import useGetLocale from '@/hooks/use-get-locale';
import { cn, LocalisedDataType } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface ContentTitleCustomProps {
  title?: LocalisedDataType[] | string | null;
  subtitle?: LocalisedDataType[] | string | null;
  titleClassname?: string;
  subtitleClassname?: string;
  highlightTitleText?: LocalisedDataType[] | string | null;
  description?: LocalisedDataType[] | string | null;
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
  highlightTitleText,
  align = 'left',
  description,
  ...props
}: ContentTitleProps) {
  const { getLocalizedString } = useGetLocale();

  const convertedTitle =
    typeof title === 'string' ? title : getLocalizedString(title ?? []);

  const convertedHighlightTitleText =
    typeof highlightTitleText === 'string'
      ? highlightTitleText
      : getLocalizedString(highlightTitleText ?? []);

  const convertedSubtitle =
    typeof subtitle === 'string'
      ? subtitle
      : getLocalizedString(subtitle ?? []);

  const convertedDescription =
    typeof description === 'string'
      ? description
      : getLocalizedString(description ?? []);

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
            'text-secondary-foreground !leading-[1.2] font-extrabold',
            subtitleClassname
          )}
        >
          {/* {getLocalizedString(subtitle) ?? []} */}
          {convertedSubtitle}
        </h2>
      ) : null}

      {title || highlightTitleText ? (
        <h3
          className={cn(
            'text-primary text-[32px] leading-[110%] tracking-tight md:text-[40px] lg:text-[50px]',
            {
              'pt-4': !!subtitle
            },
            titleClassname
          )}
        >
          {highlightTitleText && (
            <b className="text-accent-foreground">
              {convertedHighlightTitleText}&nbsp;
            </b>
          )}
          {convertedTitle}
        </h3>
      ) : null}

      {description ? (
        <p
          className={cn(
            'text-muted-foreground mx-auto mb-8 pt-7 sm:text-lg md:text-base lg:max-w-2xl',
            {
              '': align === 'left',
              'text-center': align === 'center'
            }
          )}
        >
          {convertedDescription}
        </p>
      ) : null}
    </div>
  );
}
