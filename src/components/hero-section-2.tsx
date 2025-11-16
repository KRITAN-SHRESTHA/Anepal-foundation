import CustomImage from './custom-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { LocalisedDataType } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';
import { ArrowRight } from 'lucide-react';
import NavigationLink from './navigation-link';
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  image: SanityImageSource;
  title?: LocalisedDataType[] | string | null;
}

export default function HeroSectionTwo({ title, image }: HeroSectionProps) {
  const { getLocalizedString } = useGetLocale();
  const t = useTranslations('Default');

  const convertedTitle =
    typeof title === 'string' ? title : getLocalizedString(title ?? []);

  return (
    <div className="relative h-[50vh] w-full md:h-[60vh] lg:h-[70vh]">
      {image && (
        <CustomImage
          src={image}
          alt={convertedTitle ?? ''}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 780px) 60vw, (min-width: 1024px) 100vw, 1440px"
          quality={100}
        />
      )}

      <section className="relative z-30 mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="max-w-3xl">
            <div className="text-shadow-accent-foreground/30 flex items-center gap-1 text-lg text-white capitalize text-shadow-md">
              <NavigationLink href={'/'} className="text-white">
                {t('Home')}
              </NavigationLink>
              <ArrowRight className="size-4" />{' '}
              <b className="capitalize">{convertedTitle}</b>
            </div>
            <h1 className="font-quicksand text-shadow-accent-foreground/30 text-[40px] leading-[130%] text-balance text-white capitalize text-shadow-md md:text-5xl lg:text-6xl">
              <b>{convertedTitle}</b>
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
