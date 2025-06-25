import { ListIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const partnersListSchema = defineType({
  name: 'partnersList',
  title: 'Partners list',
  icon: ListIcon,
  type: 'document',
  fields: [
    {
      name: 'partnersName',
      title: 'Partner Name',
      type: 'string'
    },
    {
      name: 'partnersLogo',
      title: 'Partner Logo',
      type: 'image',
      options: { hotspot: true }
    }
  ]
});
