import { client } from '@/sanity/lib/client';
import { Settings } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';

const POSTS_QUERY = `*[
  _type == "settings"
]|order(order asc)[0...8]`;

// will revalidate after every 30 seconds
const options = { next: { revalidate: 30 } };

export const settingsRouter = createTRPCRouter({
  getSettings: publicProcedure.query(async () => {
    return await client.fetch<[Settings]>(POSTS_QUERY, {}, options);
  })
});
