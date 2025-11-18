import { client } from '@/sanity/lib/client';
import {
  Home_events,
  Home_gallery,
  Home_help_section,
  Home_partners,
  HomeBanner,
  PartnersList,
  What_make_us_unique,
  What_we_do
} from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { PopulatedBlogsList } from '@/types/blogs-types';
import { PopulatedHomeStats } from '@/types/org-types';
import { PopulatedHomeTeamMember } from '@/types/team-member-types';
import { PopulatedHomeTestimonials } from '@/types/testimonials-type';

const GET_BANNER_QUERY = `*[
  _type == "home-banner"
]|order(_createdAt desc)[0...5]`;

const GET_WHAT_WE_DO_TO_HELP = `*[
  _type == "what_we_do"
][0]`;

const GET_HOME_STATS = `*[
  _type == "home_stats"
][0]{
  ...,
  select_stats[]->
}`;

const GET_WHAT_MAKES_US_UNIQUE = `*[
  _type == "what_make_us_unique"
][0]`;

const GET_HOME_EVENTS = `*[
  _type == "home_events"
][0]`;

const GET_HOME_TESTIMONIALS = `*[
  _type == "home_testimonial"
][0]{
  ...,
  select_testimonials[]->{
    ...,
    role->{
      name
    }
  }
}`;

const GET_HOME_TEAM_MEMBERS = `*[
  _type == "home_team_member"
][0]{
  ...,
  membersList[]->{
    ...,
    role->{
      name
    }
  }
}`;

const GET_HOME_PARTNERS = `*[
  _type == "home_partners"
][0]{
  ...,
  select_testimonials[]->
}`;
const GET_ALL_PARTNERS_LIST = `*[_type == "partnersList"]`;

const GET_HOME_GALLERY = `*[
  _type == "home_gallery"
][0]`;

const GET_HOME_BLOGS_LIST = `*[
  _type == "blogs"
] | order(_createdAt desc)[0...3]{
  ...,
  tag->
}`;

const GET_HOME_HELP_SECTION = `*[
  _type == "home_help_section"
][0]`;

// Enable ISR caching for home data (align with page revalidate)
const options = { next: { revalidate: 300 } };

export const homeRouter = createTRPCRouter({
  getBanner: publicProcedure.query(async () => {
    return await client.fetch<HomeBanner[]>(GET_BANNER_QUERY, {}, options);
  }),
  getWhatWeDoToHelp: publicProcedure.query(async () => {
    return await client.fetch<What_we_do>(GET_WHAT_WE_DO_TO_HELP, {}, options);
  }),
  getHomeStats: publicProcedure.query(async () => {
    return await client.fetch<PopulatedHomeStats>(GET_HOME_STATS, {}, options);
  }),
  getWhatMakesUsUnique: publicProcedure.query(async () => {
    return await client.fetch<What_make_us_unique>(
      GET_WHAT_MAKES_US_UNIQUE,
      {},
      options
    );
  }),
  getHomeEventsTitle: publicProcedure.query(async () => {
    return await client.fetch<Home_events>(GET_HOME_EVENTS, {}, options);
  }),
  getHomeTestimonials: publicProcedure.query(async () => {
    return await client.fetch<PopulatedHomeTestimonials>(
      GET_HOME_TESTIMONIALS,
      {},
      options
    );
  }),
  getHomeTeamMembers: publicProcedure.query(async () => {
    return await client.fetch<PopulatedHomeTeamMember>(
      GET_HOME_TEAM_MEMBERS,
      {},
      options
    );
  }),
  getHomePartners: publicProcedure.query(async () => {
    const [homePartners, partnersList] = await Promise.all([
      client.fetch<Home_partners>(GET_HOME_PARTNERS, {}, options),
      client.fetch<PartnersList[]>(GET_ALL_PARTNERS_LIST, {}, options)
    ]);
    return {
      ...homePartners,
      partners: partnersList
    };
  }),
  getHomeGallery: publicProcedure.query(async () => {
    return await client.fetch<Home_gallery>(GET_HOME_GALLERY, {}, options);
  }),
  getHomeBlogsList: publicProcedure.query(async () => {
    return await client.fetch<PopulatedBlogsList[]>(
      GET_HOME_BLOGS_LIST,
      {},
      options
    );
  }),
  getHomeHelpSection: publicProcedure.query(async () => {
    return await client.fetch<Home_help_section>(
      GET_HOME_HELP_SECTION,
      {},
      options
    );
  })
});
