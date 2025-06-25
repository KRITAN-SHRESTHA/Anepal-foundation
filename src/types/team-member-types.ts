import {
  Team_member_roles,
  Team_members,
  Team_members_page
} from '@/sanity/types';

export type PopulatedTeamMember = Omit<Team_members, 'role'> & {
  role?: Team_member_roles;
};

export type PopulatedAboutTeamMember = Omit<
  Team_members_page,
  'membersDetails'
> & {
  membersDetails: Omit<
    NonNullable<Team_members_page['membersDetails']>,
    'membersList'
  > & {
    membersList: PopulatedTeamMember[];
  };
};
