import {
  DonorsAndPartnersPage,
  DonorsList,
  OrganizationStats,
  PartnersList
} from '@/sanity/types';

// export type PopulatedDonorsAndPartnersPage = DonorsAndPartnersPage & {
//   whoHelpUsSection: Omit<
//     DonorsAndPartnersPage['whoHelpUsSection'],
//     'donorsNames' | 'partnersName'
//   > & {
//     donorsNames: DonorsList[];
//     partnersName: PartnersList[];
//   };
// };

export type PopulatedDonorsAndPartnersPage = Omit<
  DonorsAndPartnersPage,
  'whoHelpUsSection' | 'statisticsSection'
> & {
  whoHelpUsSection: Omit<
    NonNullable<DonorsAndPartnersPage['whoHelpUsSection']>,
    'donorsNames' | 'partnersName'
  > & {
    donorsNames: DonorsList[];
    partnersName: PartnersList[];
  };
} & {
  // statisticsSection: OrganizationStats[];
  statisticsSection: Omit<
    NonNullable<DonorsAndPartnersPage['statisticsSection']>,
    'statistics'
  > & {
    statistics: OrganizationStats[];
  };
};
