import { client } from '@/sanity/lib/client';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import {
  PopulatedAboutTeamMember,
  PopulatedTeamMember
} from '@/types/team-member-types';

const GET_ALL_MEMBERS = `*[
  _type == "team_members"
] {
  ...,
  "role": {
    "name": role->name,
    "_id": role->_id
  }

  }`;
// "role" : role-> will give every fields from role schema

const GET_ABOUT_TEAM_MEMBERS = `*[
  _type == "about_team_members"
][0]{
  ...,
  membersList[]->{
      ...,
      "role": role->
    }
  }`;

// "membersList": *[_type=='team_members' && references(^._id)]{ name }÷÷

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

export const teamMemberRouter = createTRPCRouter({
  getTeamMembers: publicProcedure.query(async () => {
    return await client.fetch<PopulatedTeamMember[]>(
      GET_ALL_MEMBERS,
      {},
      options
    );
  }),
  getAboutTeamMembers: publicProcedure.query(async () => {
    return await client.fetch<PopulatedAboutTeamMember>(
      GET_ABOUT_TEAM_MEMBERS,
      {},
      options
    );
  })
});
