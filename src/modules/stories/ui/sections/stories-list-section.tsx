import CustomImage from '@/components/custom-image';
import { Button } from '@/components/ui/button';
import useGetLocale from '@/hooks/use-get-locale';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function StoriesListSection() {
  const { data } = trpc.stories.getStoriesPageContent.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <div>
      {data?.stories.map((story, idx) => {
        const splitName = story.name?.split(' ');
        const firstName = splitName && splitName[0];
        const lastname = splitName?.slice(1, splitName.length).join(' ');

        return (
          <div
            key={story._id}
            className={
              'tablet:grid-cols-2 mx-auto grid w-full max-w-screen-xl items-center gap-x-12 gap-y-8 px-4 py-[20px] sm:px-6 lg:px-8'
            }
          >
            <div
              className={cn('relative order-2 overflow-hidden p-2', {
                'tablet:order-1 order-2': (idx + 1) % 2 === 0, // even
                'order-2': (idx + 1) % 2 !== 0 // odd
              })}
            >
              <Image
                className="mix-blend-multiply"
                src={`/assets/story/story-bg-img-${(idx % 4) + 1}.png`}
                fill
                alt=""
              />
              <div className="relative aspect-square w-full">
                <CustomImage
                  className="laptop:p-[80px] tablet:p-[60px] xs:p-[60px] h-full w-full object-cover p-[40px] sm:p-[80px]"
                  src={story.image}
                  alt={story.name ?? ''}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            <div
              className={cn('', {
                'tablet:order-2 order-1': (idx + 1) % 2 === 0, // even
                'order-1': (idx + 1) % 2 !== 0 // odd
              })}
            >
              <strong className="text-muted-foreground/60">0{idx + 1}</strong>
              <h4 className="text-[32px] md:text-[50px]">
                <b>{firstName}</b>&nbsp;
                {lastname}
              </h4>

              <p className="tablet:max-w-[60ch] text-muted-foreground line-clamp-5 pt-7 text-lg leading-[135%]">
                {getLocalizedString(story.description ?? [])}
              </p>

              <div className="tablet:mt-12 mt-6 flex items-center gap-4">
                <Link href={`/stories/${story.slug?.current}`}>
                  <Button
                    variant="outline"
                    className="rounded-full !px-5 text-base shadow-none [&_svg]:!size-4"
                    border={'purple'}
                  >
                    <BookOpen className="!h-5 !w-5" /> Read Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
