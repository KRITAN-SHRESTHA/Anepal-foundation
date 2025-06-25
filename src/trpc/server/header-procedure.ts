import { client } from '@/sanity/lib/client';
import { Header } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';

const POSTS_QUERY = `*[
  _type == "header"
] | order(orderRank asc)[0...8]`;

// will revalidate after every 30 seconds
const options = { next: { revalidate: 30 } };

export const headerRouter = createTRPCRouter({
  getHeader: publicProcedure.query(async () => {
    return await client.fetch<Header[]>(POSTS_QUERY, {}, options);
  })
});
