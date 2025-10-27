'use client';

import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

import useGetLocale from '@/hooks/use-get-locale';
import { cn, LocalisedDataType } from '@/lib/utils';
import { InternalizedArrayTextValueType } from '@/types';
import ContentTitle from './content-title';
import CustomImage from './custom-image';
import NavigationLink from './navigation-link';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

interface ContentSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  image?: string | SanityAsset;
  orientation?: 'ltr' | 'rtl';
  title?: LocalisedDataType[] | string;
  subtitle?: LocalisedDataType[];
  highlightTitleText?: LocalisedDataType[];
  description?: InternalizedArrayTextValueType;
  readmoreLink?: string;
  titleClassname?: string;
  subtitleClassname?: string;
}

export default function ContentSection({
  description,
  image,
  orientation = 'ltr',
  subtitle,
  title,
  readmoreLink,
  titleClassname,
  subtitleClassname,
  className,
  highlightTitleText
}: ContentSectionProps) {
  const { getLocalizedString } = useGetLocale();

  const convertedTitle =
    typeof title === 'string' ? title : getLocalizedString(title ?? []);

  const convertedSubtitle =
    typeof subtitle === 'string'
      ? subtitle
      : getLocalizedString(subtitle ?? []);

  const convertedDescription =
    typeof description === 'string'
      ? description
      : getLocalizedString(description ?? []);

  const convertedHighlightTitleText =
    typeof highlightTitleText === 'string'
      ? highlightTitleText
      : getLocalizedString(highlightTitleText ?? []);

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
              alt={convertedTitle ?? convertedSubtitle!}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              className="laptop:p-[80px] tablet:p-[60px] xs:p-[60px] h-full w-full object-cover p-[40px] sm:p-[80px]"
              src={'/assets/our_story/dharmajit_budha.jpg'}
              alt={convertedTitle ?? convertedSubtitle!}
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
          subtitleClassname={subtitleClassname}
          titleClassname={titleClassname}
          highlightTitleText={highlightTitleText}
        />

        {convertedDescription ? (
          <p className="text-muted-foreground pt-7 text-lg leading-[135%]">
            <span className="whitespace-pre-line">
              {convertedDescription.slice(0, 400)}
            </span>

            {convertedDescription?.length > 400 && (
              <>
                ... &nbsp;
                <Dialog>
                  <DialogTrigger>
                    <button className="cursor-pointer font-medium text-purple-700 underline-offset-1 hover:underline">
                      see more
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] w-full max-w-[800px]! overflow-y-auto px-[25px] py-[50px] sm:p-[50px]">
                    <DialogTitle className="text-3xl">
                      {convertedHighlightTitleText ? (
                        <b>
                          {convertedHighlightTitleText + ' ' + convertedTitle}
                        </b>
                      ) : convertedTitle ? (
                        convertedTitle
                      ) : (
                        convertedSubtitle
                      )}
                    </DialogTitle>
                    <p className="whitespace-pre-line">
                      {convertedDescription}
                    </p>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </p>
        ) : null}

        {!!readmoreLink ? (
          <div className="tablet:mt-12 mt-6 flex items-center gap-4">
            <NavigationLink href={'/about-us'}>
              <Button
                variant="outline"
                className="rounded-full !px-5 text-base shadow-none [&_svg]:!size-4"
                border={'purple'}
              >
                <BookOpen className="!h-5 !w-5" /> Read more
              </Button>
            </NavigationLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
