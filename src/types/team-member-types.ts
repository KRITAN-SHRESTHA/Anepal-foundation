import {
  About_team_members,
  Team_member_roles,
  Team_members
} from '@/sanity/types';

export type PopulatedTeamMember = Omit<Team_members, 'role'> & {
  role?: Team_member_roles;
};

export type PopulatedAboutTeamMember = Omit<
  About_team_members,
  'membersList'
> & {
  membersList?: PopulatedTeamMember[];
};
