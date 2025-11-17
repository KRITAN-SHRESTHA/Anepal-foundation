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
  'whoHelpUsSection' | 'statisticsSection' | 'donors_section'
> & {
  whoHelpUsSection: Omit<
    NonNullable<DonorsAndPartnersPage['whoHelpUsSection']>,
    'donorsNames' | 'partnersName'
  > & {
    partnersName: PartnersList[];
  };
} & {
  statisticsSection: Omit<
    NonNullable<DonorsAndPartnersPage['statisticsSection']>,
    'statistics'
  > & {
    statistics: OrganizationStats[];
  };
} & {
  donors_section: Omit<
    NonNullable<DonorsAndPartnersPage['donors_section']>,
    'donors_names'
  > & {
    donors_names: DonorsList[];
  };
};

// & donors_section: Omit<NonNullable<DonorsAndPartnersPage['donors_section']>, 'donors_names'> & {
// statistics: OrganizationStats[];
// };
