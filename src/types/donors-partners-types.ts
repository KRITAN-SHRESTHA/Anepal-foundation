import {
  DonorsAndPartnersPage,
  DonorsList,
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
  'whoHelpUsSection'
> & {
  whoHelpUsSection: Omit<
    NonNullable<DonorsAndPartnersPage['whoHelpUsSection']>,
    'donorsNames' | 'partnersName'
  > & {
    donorsNames: DonorsList[];
    partnersName: PartnersList[];
  };
};
