import { client } from '@/sanity/lib/client';
import {
  HomeBanner,
  Org_helps_in_fields,
  WhatMakesUsUnique
} from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';

const BANNER_GET_QUERY = `*[
  _type == "home-banner"
]|order(_createdAt desc)[0...5]`;

const WHAT_MAKES_UNIQUE_QUERY = `*[
  _type == "what-makes-us-unique"
]|order(_createdAt desc)[0...6]`;

const ORG_HELPS_IN_FIELDS = `*[
  _type == "org_helps_in_fields"
][0]`;

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

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
  }),
  getOrgHelpsInFields: publicProcedure.query(async () => {
    return await client.fetch<Org_helps_in_fields>(
      ORG_HELPS_IN_FIELDS,
      {},
      options
    );
  })
});
