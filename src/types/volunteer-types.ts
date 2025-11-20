import { Volunteer_benefits, Volunteer_view } from '@/sanity/types';

export type PopulatedVolunteerPage = Omit<
  Volunteer_view,
  'whyVolunteerSection'
> & {
  whyVolunteerSection: Omit<
    NonNullable<Volunteer_view['whyVolunteerSection']>,
    'benefits'
  > & {
    benefits: Volunteer_benefits[];
  };
};
