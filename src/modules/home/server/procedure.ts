import { client } from '@/sanity/lib/client';
import {
  Featured_projects,
  Home_events,
  Home_gallery,
  Home_partners,
  HomeBanner,
  Org_helps_in_fields,
  PartnersList
} from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { PopulatedHomeStats } from '@/types/org-types';
import { PopulatedHomeTeamMember } from '@/types/team-member-types';
import { PopulatedHomeTestimonials } from '@/types/testimonials-type';

const GET_BANNER_QUERY = `*[
  _type == "home-banner"
]|order(_createdAt desc)[0...5]`;

const GET_ORG_HELPS_IN_FIELDS = `*[
  _type == "org_helps_in_fields"
][0]`;

const GET_HOME_STATS = `*[
  _type == "home_stats"
][0]{
  ...,
  select_stats[]->
}`;

const GET_FEATURED_PROJECTS = `*[
  _type == "featured_projects"
][0]`;

const GET_HOME_EVENTS = `*[
  _type == "home_events"
][0]`;

const GET_HOME_TESTIMONIALS = `*[
  _type == "home_testimonial"
][0]{
  ...,
  select_testimonials[]->
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

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

export const homeRouter = createTRPCRouter({
  getBanner: publicProcedure.query(async () => {
    return await client.fetch<HomeBanner[]>(GET_BANNER_QUERY, {}, options);
  }),
  getOrgHelpsInFields: publicProcedure.query(async () => {
    return await client.fetch<Org_helps_in_fields>(
      GET_ORG_HELPS_IN_FIELDS,
      {},
      options
    );
  }),
  getHomeStats: publicProcedure.query(async () => {
    return await client.fetch<PopulatedHomeStats>(GET_HOME_STATS, {}, options);
  }),
  getFeaturedProjects: publicProcedure.query(async () => {
    return await client.fetch<Featured_projects>(
      GET_FEATURED_PROJECTS,
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
  })
});
