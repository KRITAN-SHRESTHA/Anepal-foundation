import { Aboutus, OrganizationStats, PartnersList } from '@/sanity/types';

export type PopulatedAboutUsPage = Omit<
  Aboutus,
  'partnersSection' | 'mapSection'
> & {
  partnersSection: Omit<NonNullable<Aboutus['partnersSection']>, 'partner'> & {
    partner: PartnersList[];
  };
} & {
  mapSection: Omit<NonNullable<Aboutus['mapSection']>, 'select_stats'> & {
    select_stats: OrganizationStats[];
  };
};
