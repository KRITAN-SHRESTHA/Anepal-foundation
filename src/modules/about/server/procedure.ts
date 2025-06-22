import { client } from '@/sanity/lib/client';
import { AboutAnepal, Aboutus as AboutUs } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';

const GET_ABOUT_US = '*[_type == "aboutus"][0]';

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

const ABOUT_US_GET_QUERY = `*[
  _type == "about-anepal"
][0]`;

export const aboutusRouter = createTRPCRouter({
  getAboutUs: publicProcedure.query(async () => {
    return client.fetch<AboutUs>(GET_ABOUT_US, {}, options);
  }),
  getHomeAboutUs: publicProcedure.query(async () => {
    return await client.fetch<AboutAnepal>(ABOUT_US_GET_QUERY, {}, options);
  })
});
