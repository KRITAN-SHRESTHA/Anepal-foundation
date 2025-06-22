import { client } from '@/sanity/lib/client';
import { HomeBanner, WhatMakesUsUnique } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';

const BANNER_GET_QUERY = `*[
  _type == "home-banner"
]|order(_createdAt desc)[0...5]`;

const WHAT_MAKES_UNIQUE_QUERY = `*[
  _type == "what-makes-us-unique"
]|order(_createdAt desc)[0...6]`;

// will revalidate after every 30 seconds
const options = { next: { revalidate: 30 } };

export const homeRouter = createTRPCRouter({
  getBanner: publicProcedure.query(async () => {
    return await client.fetch<HomeBanner[]>(BANNER_GET_QUERY, {}, options);
  }),
  getWhatMakesUsUnique: publicProcedure.query(async () => {
    return await client.fetch<WhatMakesUsUnique[]>(
      WHAT_MAKES_UNIQUE_QUERY,
      {},
      options
    );
  })
});
