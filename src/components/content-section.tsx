'use client';

import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

import useGetLocale from '@/hooks/use-get-locale';
import { cn, LocalisedDataType } from '@/lib/utils';
import { InternalizedArrayTextValueType } from '@/types';
import ContentTitle from './content-title';
import CustomImage from './custom-image';
import { Button } from './ui/button';

interface ContentSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  image?: string | SanityAsset;
  orientation?: 'ltr' | 'rtl';
  title?: LocalisedDataType[] | string;
  subtitle?: LocalisedDataType[];
  description?: InternalizedArrayTextValueType;
  readmoreLink?: string;
  titleClassname?: string;
  imageAlt?: string;
}

export default function ContentSection({
  description,
  image,
  orientation = 'ltr',
  subtitle,
  title,
  readmoreLink,
  titleClassname,
  className,
  imageAlt
}: ContentSectionProps) {
  const { getLocalizedString } = useGetLocale();

  return (
    <div
      className={cn(
        'tablet:grid-cols-2 mx-auto grid w-full max-w-screen-xl items-center gap-x-12 gap-y-8 px-4 pt-[80px] pb-[50px] sm:px-6 lg:px-8 lg:pb-[80px]',
        className
      )}
    >
      <div
        className={cn('relative overflow-hidden p-2', {
          'order-2': orientation === 'rtl',
          'order-1': orientation === 'ltr'
        })}
      >
        <Image
          className="mix-blend-multiply"
          src={'/assets/background-color-for-img.png'}
          fill
          alt=""
        />

        <div className="relative aspect-square w-full">
          {image ? (
            <CustomImage
              className="laptop:p-[80px] tablet:p-[60px] xs:p-[60px] h-full w-full object-cover p-[40px] sm:p-[80px]"
              src={image}
              alt={imageAlt ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              className="laptop:p-[80px] tablet:p-[60px] xs:p-[60px] h-full w-full object-cover p-[40px] sm:p-[80px]"
              src={'/assets/our_story/dharmajit_budha.jpg'}
              alt={imageAlt ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </div>
      <div
        className={cn('', {
          'tablet:order-2 order-1': orientation === 'rtl'
        })}
      >
        <ContentTitle
          title={title}
          subtitle={subtitle}
          titleClassname={titleClassname}
        />

        <p className="tablet:max-w-[60ch] text-muted-foreground pt-7 text-lg leading-[135%]">
          {typeof description === 'string'
            ? description
            : getLocalizedString(description ?? [])}
        </p>

        {!!readmoreLink ? (
          <div className="tablet:mt-12 mt-6 flex items-center gap-4">
            <Link href={'/about-us'}>
              <Button
                variant="outline"
                className="rounded-full !px-5 text-base shadow-none [&_svg]:!size-4"
                border={'purple'}
              >
                <BookOpen className="!h-5 !w-5" /> Read more
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
