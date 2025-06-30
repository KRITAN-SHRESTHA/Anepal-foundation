import { Home_stats, OrganizationStats } from '@/sanity/types';

export type PopulatedHomeStats = Omit<Home_stats, 'select_stats'> & {
  select_stats: OrganizationStats[];
};
