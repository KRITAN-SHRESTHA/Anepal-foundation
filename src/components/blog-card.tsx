import React from 'react';
import { Card, CardHeader } from './ui/card';
import NavigationLink from './navigation-link';
import CustomImage from './custom-image';
import useGetLocale from '@/hooks/use-get-locale';
import { PopulatedBlogsList } from '@/types/blogs-types';
import { format } from 'date-fns';

export default function BlogCard({
  tag,
  slug,
  title,
  mainImage,
  _createdAt
}: PopulatedBlogsList) {
  const { getLocalizedString } = useGetLocale();
  return (
    <Card className="group grid grid-rows-[auto_auto_1fr_auto] border-none bg-transparent pt-0 pb-0 shadow-none">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <NavigationLink
          href={`/blogs/${slug?.current}`}
          className="fade-in duration-200"
        >
          <CustomImage
            src={mainImage}
            alt={getLocalizedString(title ?? [])!}
            className="h-full w-full rounded-xl object-cover transition-all duration-300 group-hover:scale-105"
            fill
          />
        </NavigationLink>
      </div>
      <CardHeader className="gap-2.5 bg-transparent px-0">
        <p className="">
          <span className="rounded-md bg-[#f0dd8f] px-2 py-0.5 text-sm text-black">
            {getLocalizedString(tag.name ?? [])}
          </span>
          <span className="text-muted-foreground pl-4 text-right text-sm whitespace-nowrap">
            {format(new Date(_createdAt), 'MMM dd, yyyy')}
          </span>
        </p>

        <h3 className="line-clamp-1 text-2xl font-semibold text-gray-900 hover:underline">
          <NavigationLink href={`/blogs/${slug?.current}`}>
            {getLocalizedString(title ?? [])!}
          </NavigationLink>
        </h3>
      </CardHeader>
    </Card>
  );
}
