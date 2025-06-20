import { client } from '@/sanity/lib/client';
import { Events } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { z } from 'zod';

// will revalidate after every 30 seconds
const options = { next: { revalidate: 30 } };

export const eventsRouter = createTRPCRouter({
  getAllEvents: publicProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number().min(1).max(40).default(2)
      })
    )
    .query(async ({ input }) => {
      const { page, pageSize } = input;
      console.log('page--------', page);
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      return await client.fetch<Events[]>(
        `*[
            _type == "events"
          ]|order(_createdAt desc)[$start...$end]`,
        { start, end },
        options
      );
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
    })
});
