import { client } from '@/sanity/lib/client';
import { StoriesList, StoriesPageContent } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { z } from 'zod';

// const GET_STORIES_PAGE_CONTENT = `*[_type == "storiesPageContent"][0]{
//   ...,
//   stories[]->
// }`;
const STORIES_COUNT_QUERY = 'count(*[_type == "storiesList"])';
const GET_STORIES_PAGE_CONTENT = `*[_type == "storiesPageContent"][0]`;
const GET_STORIES_LIST_WITH_PAGINATION = `*[_type == "storiesList"] | order(_createdAt desc)[$start...$end]`;

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

export const storiesRouter = createTRPCRouter({
  getStoriesPageContent: publicProcedure.query(async () => {
    return await client.fetch<StoriesPageContent>(GET_STORIES_PAGE_CONTENT, {});
  }),
  getAllStories: publicProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number().min(1).max(40).default(10)
      })
    )
    .query(async ({ input }) => {
      const { page, pageSize } = input;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      const [totalCount, stories] = await Promise.all([
        client.fetch(STORIES_COUNT_QUERY),
        client.fetch<StoriesList[]>(
          GET_STORIES_LIST_WITH_PAGINATION,
          { start, end },
          options
        )
      ]);
      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        stories,
        pagination: {
          total: totalCount,
          totalPages,
          page,
          pageSize
        }
      };
    })
});
