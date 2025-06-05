// import { db } from '@/db';
// import { categories } from '@/db/schema';
import { client } from '@/sanity/lib/client';
import { HomeBanner } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';

const POSTS_QUERY = `*[
  _type == "home-banner"
]|order(publishedAt desc)[0...12]`;

const options = { next: { revalidate: 30 } };

export const homeRouter = createTRPCRouter({
  getBanner: publicProcedure.query(async () => {
    const posts = await client.fetch<HomeBanner[]>(POSTS_QUERY, {}, options);
    return posts;
  })
});
