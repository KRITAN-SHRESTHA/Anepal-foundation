import useGetLocale from '@/hooks/use-get-locale';
import { urlFor } from '@/sanity/lib/image';
import { PopulatedBlogDetails } from '@/types/blogs-types';
import Image from 'next/image';

export default function BlogDetailsHeaderSection({
  data
}: {
  data: PopulatedBlogDetails;
}) {
  const { getLocalizedString } = useGetLocale();

  return (
    <div>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="max-w-3xl text-[40px] font-semibold text-pretty md:text-6xl">
          {data.title && getLocalizedString(data.title ?? [])}
        </h1>
        <h3 className="text-muted-foreground max-w-3xl text-lg md:text-xl">
          {getLocalizedString(data.short_description ?? [])}
        </h3>
      </div>
      <div className="relative my-12 aspect-video shrink-0">
        {data.mainImage && (
          <Image
            src={urlFor(data.mainImage).quality(100).url()}
            alt="Anepal Organization logo"
            sizes="20vw"
            fill
            className="h-full w-full rounded-lg border object-cover mix-blend-multiply"
            quality={100}
          />
        )}
      </div>
    </div>
  );
}
