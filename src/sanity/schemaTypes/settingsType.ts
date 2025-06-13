import { defineField, defineType } from 'sanity';
import { Settings } from 'lucide-react';

export const settingsType = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Company logo (recommended size: 200x80px)',
      validation: rule => rule.required().error('Logo is required')
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
          validation: rule => rule.required().error('Address is required')
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: rule =>
            rule
              .required()
              .regex(/^\+?[0-9\s-()]+$/, {
                name: 'phone',
                invert: false
              })
              .error('Please enter a valid phone number')
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: rule =>
            rule.required().email().error('Please enter a valid email address')
        })
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          validation: rule =>
            rule.uri({
              scheme: ['http', 'https']
            })
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: rule =>
            rule.uri({
              scheme: ['http', 'https']
            })
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          validation: rule =>
            rule.uri({
              scheme: ['http', 'https']
            })
        }
      ]
    }),
    defineField({
      name: 'otherInfo',
      title: 'Others Info',
      type: 'object',
      fields: [
        {
          name: 'totalChildren',
          title: 'Total children',
          type: 'number'
        },
        {
          name: 'totalSponsers',
          title: 'Total Sponsers',
          type: 'number'
        },
        {
          name: 'totalDollarCollected',
          title: 'Total Dollars Collected',
          description: 'Show estimation amount (e.g. 220k)',
          type: 'string'
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      };
    }
  }
});
