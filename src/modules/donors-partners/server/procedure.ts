import { client } from '@/sanity/lib/client';
import { PartnersList } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { PopulatedDonorsAndPartnersPage } from '@/types/donors-partners-types';

const GET_DONORS_PAGE_CONTENT = `*[_type == "donorsAndPartnersPage"][0]{
  ...,
  whoHelpUsSection{
    ...,
    partnersName[]->,
    donorsNames[]->
  },
  statisticsSection{
    ...,
    statistics[]->
  },
  donors_section{
    ...,
    donors_names[]->
  }
}`;
const GET_ALL_PARTNERS_LIST = `*[_type == "partnersList"]`;

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

export const donorsPartnersRouter = createTRPCRouter({
  getContentOfDonorsPartnersPage: publicProcedure.query(async () => {
    return await client.fetch<PopulatedDonorsAndPartnersPage>(
      GET_DONORS_PAGE_CONTENT,
      {},
      options
    );
  }),
  getPartnersList: publicProcedure.query(async () => {
    return await client.fetch<PartnersList>(GET_ALL_PARTNERS_LIST, {}, options);
  })
  // getOneEvent: publicProcedure
  //   .input(
  //     z.object({
  //       slug: z.string()
  //     })
  //   )
  //   .query(async ({ input }) => {
  //     const { slug } = input;

  //     return await client.fetch<Events>(
  //       `*[_type == "events" && slug.current == $slug][0]`,
  //       { slug },
  //       options
  //     );
  //   }),
  // getFeaturedEvents: publicProcedure.query(async () => {
  //   return await client.fetch<Events[]>(
  //     `*[_type == "events" && event_time.start >= now()] | order(event_time.start asc)[0...3]`,
  //     {},
  //     options
  //   );
  // })
});
