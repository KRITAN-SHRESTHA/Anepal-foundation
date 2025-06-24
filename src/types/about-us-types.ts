import { Aboutus, OrganizationStats, PartnersList } from '@/sanity/types';
import { PopulatedTeamMember } from './team-member-types';

export type PopulatedAboutUsPage = Omit<
  Aboutus,
  'partnersSection' | 'statisticsSection' | 'teamsSection'
> & {
  partnersSection: Omit<NonNullable<Aboutus['partnersSection']>, 'partner'> & {
    partner: PartnersList[];
  };
} & {
  statisticsSection: Omit<
    NonNullable<Aboutus['statisticsSection']>,
    'statistics'
  > & {
    statistics: OrganizationStats[];
  };
} & {
  teamsSection: Omit<NonNullable<Aboutus['teamsSection']>, 'teamMembers'> & {
    teamMembers: PopulatedTeamMember[];
  };
};
