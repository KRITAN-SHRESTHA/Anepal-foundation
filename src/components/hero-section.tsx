import CustomImage from './custom-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { LocalisedDataType } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';

interface HeroSectionProps {
  image: SanityImageSource;
  title?: LocalisedDataType[] | string | null;
  subtitle?: LocalisedDataType[] | string | null;
  highlightTitleText?: LocalisedDataType[] | string | null;
}

export default function HeroSection({
  title,
  image,
  subtitle,
  highlightTitleText
}: HeroSectionProps) {
  const { getLocalizedString } = useGetLocale();

  const convertedTitle =
    typeof title === 'string' ? title : getLocalizedString(title ?? []);

  const convertedHighlightTitle =
    typeof highlightTitleText === 'string'
      ? highlightTitleText
      : getLocalizedString(highlightTitleText ?? []);

  // const splitTitle = convertedTitle?.split(' ');
  // const firstText = splitTitle && splitTitle[0];
  // const lastText = splitTitle?.slice(1, splitTitle.length).join(' '); //or str.slice(1)

  const convertedSubtitle =
    typeof subtitle === 'string'
      ? subtitle
      : getLocalizedString(subtitle ?? []);

  return (
    <div className="font-permanentMaker relative h-[50vh] w-full md:h-[60vh] lg:h-[70vh]">
      {image && (
        <CustomImage
          src={image}
          alt={convertedTitle + ' ' + convertedSubtitle}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 780px) 60vw, (min-width: 1024px) 100vw, 1440px"
          quality={100}
        />
      )}

      <section className="mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="max-w-2xl">
            <p className="font-permanentMaker text-2xl text-white md:text-3xl">
              {convertedSubtitle}
            </p>
            <h1 className="font-quicksand text-[40px] leading-[130%] text-balance text-white first-letter:capitalize md:text-5xl lg:text-6xl">
              <b>{convertedHighlightTitle}</b>&nbsp;{convertedTitle}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
