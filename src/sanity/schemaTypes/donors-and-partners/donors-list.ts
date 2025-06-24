import { defineType } from 'sanity';
import { ListIcon } from '@sanity/icons';

export const donorsList = defineType({
  name: 'donorsList',
  title: 'Donors list',
  icon: ListIcon,
  type: 'document',
  fields: [
    {
      name: 'donorsName',
      title: 'Donor Name',
      type: 'string'
    }
  ]
});
