import { client } from '@/sanity/lib/client';
import { Blogs } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { PopulatedBlogsList } from '@/types/blogs-types';
import { z } from 'zod';

const BLOG_COUNT_QUERY = 'count(*[_type == "blogs"])';
const BLOG_LIST_WITH_PAGINATION = `*[
            _type == "blogs"
          ] | order(_createdAt desc)[$start...$end]`;
const BLOG_PAGE_QUERY = '*[_type == "blogListPage"][0]';

const GET_EVENT_DETAILS_QUERY = `*[_type == "blogs" && slug.current == $slug][0]`;
// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

export const eventsRouter = createTRPCRouter({
  getBlogPage: publicProcedure.query(async () => {
    return await client.fetch<PopulatedBlogsList>(BLOG_PAGE_QUERY, {}, options);
  }),
  getAllBlogs: publicProcedure
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

      const [totalCount, events] = await Promise.all([
        client.fetch(BLOG_COUNT_QUERY),
        client.fetch<PopulatedBlogsList[]>(
          BLOG_LIST_WITH_PAGINATION,
          { start, end },
          options
        )
      ]);
      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        events,
        pagination: {
          total: totalCount,
          totalPages,
          page,
          pageSize
        }
      };
    }),
  getOneBlog: publicProcedure
    .input(
      z.object({
        slug: z.string()
      })
    )
    .query(async ({ input }) => {
      const { slug } = input;

      return client.fetch<Blogs>(GET_EVENT_DETAILS_QUERY, { slug }, options);
    })
});
