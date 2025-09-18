import CustomImage from '@/components/custom-image';
import useGetLocale from '@/hooks/use-get-locale';
import { PopulatedBlogDetails } from '@/types/blogs-types';

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
          <CustomImage
            src={data.mainImage}
            alt={`${getLocalizedString(data.title ?? [])}-img`}
            sizes="100vw"
            fill
            className="rounded-lg border object-cover"
            quality={100}
          />
        )}
      </div>
    </div>
  );
}
