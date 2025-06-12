import { client } from '@/sanity/lib/client';
import { AboutAnepal, HomeBanner } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';

const BANNER_GET_QUERY = `*[
  _type == "home-banner"
]|order(publishedAt desc)[0...5]`;

const ABOUT_US_GET_QUERY = `*[
  _type == "about-anepal"
][0]`;

// will revalidate after every 30 seconds
const options = { next: { revalidate: 30 } };

export const homeRouter = createTRPCRouter({
  getBanner: publicProcedure.query(async () => {
    return await client.fetch<HomeBanner[]>(BANNER_GET_QUERY, {}, options);
  }),
  getAboutUs: publicProcedure.query(async () => {
    return await client.fetch<AboutAnepal>(ABOUT_US_GET_QUERY, {}, options);
  })
});
