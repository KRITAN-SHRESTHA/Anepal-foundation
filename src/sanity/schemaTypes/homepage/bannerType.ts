import { ImageIcon } from '@sanity/icons';
import { defineType } from 'sanity';

import { validationLang } from '../../lib/validation-lang';

export const bannerType = defineType({
  title: 'Home Banners',
  name: 'home-banner',
  type: 'document',
  icon: ImageIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
            return validationLang(value, 'Please add title in all languages');
          })
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Recommended size: 1920x1080px',
      options: {
        hotspot: true
      },
      validation: rule => rule.required().error('Banner image is required')
    },
    {
      name: 'description',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
            return validationLang(
              value,
              'Please add description in all languages'
            );
          })
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      // description: 'Add the URL where this banner should redirect to',
      description: "Will accept: '/about', 'https://example.com/about'",
      validation: rule =>
        rule
          .required()
          .uri({ allowRelative: true })
          .error('Please add a valid URL')
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(args) {
      return {
        title: args.title?.[0]?.value || ''
      };
    }
  }
});
