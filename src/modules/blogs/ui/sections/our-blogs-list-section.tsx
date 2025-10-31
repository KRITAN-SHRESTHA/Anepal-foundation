'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { urlFor } from '@/sanity/lib/image';

import NavigationLink from '@/components/navigation-link';
import { Badge } from '@/components/ui/badge';
import { ErrorBoundary } from 'react-error-boundary';
import BlogsListSkeleton from '../components/blogs-list-skeleton';
import useGetAllBlogs from '../hooks/use-get-all-blogs';

export default function OurBlogsListSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<BlogsListSkeleton />}>
        <OurBlogsListSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function OurBlogsListSectionSuspense() {
  const { getLocalizedString } = useGetLocale();

  const { blogs } = useGetAllBlogs();

  if (blogs.length === 0) {
    return <h1>No blogs found</h1>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {blogs.map(blog => (
        <Card
          key={blog._id}
          className="shadow-accent-foreground grid grid-rows-[auto_auto_1fr_auto] bg-white pt-0 shadow-lg/20"
        >
          <div className="relative aspect-16/9 w-full overflow-clip">
            <NavigationLink
              href={`/blogs/${blog.slug?.current}`}
              className="fade-in transition-opacity duration-200 hover:opacity-70"
            >
              {blog.mainImage && (
                <Image
                  src={urlFor(blog.mainImage).quality(100).url()}
                  alt={getLocalizedString(blog.title ?? [])!}
                  fill
                  className="fade-in h-full w-full overflow-hidden rounded-t-lg object-cover transition-opacity duration-200 hover:opacity-70"
                />
              )}
            </NavigationLink>

            <Badge className="absolute top-3 right-3">
              {getLocalizedString(blog?.tag.name ?? [])}
            </Badge>
          </div>
          <CardHeader>
            <h3 className="line-clamp-1 text-lg font-semibold hover:underline md:text-xl">
              <NavigationLink href={`/blogs/${blog.slug?.current}`}>
                {getLocalizedString(blog.title ?? [])}
              </NavigationLink>
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              {getLocalizedString(blog.short_description ?? [])}
            </p>
          </CardContent>
          <CardFooter>
            <NavigationLink
              href={`/blogs/${blog.slug?.current}`}
              className="text-foreground flex items-center hover:underline"
            >
              Read more
              <ArrowRight className="ml-2 size-4" />
            </NavigationLink>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
