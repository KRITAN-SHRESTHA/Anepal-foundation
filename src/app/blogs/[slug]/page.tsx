import BlogsDetailsView from '@/modules/blogs/ui/views/events-details-view';
import { HydrateClient, trpc } from '@/trpc/server';
import React from 'react';

interface BlogDetailsPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventsDetailsPage({
  params
}: BlogDetailsPageParams) {
  const slug = (await params).slug;

  void trpc.blogs.getOneBlog.prefetch({
    slug
  });

  return (
    <HydrateClient>
      <BlogsDetailsView />
    </HydrateClient>
  );
}
