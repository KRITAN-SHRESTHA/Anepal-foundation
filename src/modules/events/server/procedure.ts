import { client } from '@/sanity/lib/client';
import { Events, EventsPage } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { z } from 'zod';

const EVENT_COUNT_QUERY = 'count(*[_type == "events"])';
const EVENT_LIST_WITH_PAGINATION = `*[
            _type == "events"
          ] | order(_createdAt desc)[$start...$end]`;
const EVENT_PAGE_QUERY = '*[_type == "eventsPage"][0]';

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

export const eventsRouter = createTRPCRouter({
  getEventPage: publicProcedure.query(async () => {
    return await client.fetch<EventsPage>(EVENT_PAGE_QUERY, {}, options);
  }),
  getAllEvents: publicProcedure
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
        client.fetch(EVENT_COUNT_QUERY),
        client.fetch<Events[]>(
          EVENT_LIST_WITH_PAGINATION,
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
  getOneEvent: publicProcedure
    .input(
      z.object({
        slug: z.string()
      })
    )
    .query(async ({ input }) => {
      const { slug } = input;

      return client.fetch<Events>(
        `*[_type == "events" && slug.current == $slug][0]`,
        { slug },
        options
      );
    }),
  getFeaturedEvents: publicProcedure.query(async () => {
    return await client.fetch<Events[]>(
      `*[_type == "events" && event_time.start >= now()] | order(event_time.start asc)[0...3]`,
      {},
      options
    );
  })
});
