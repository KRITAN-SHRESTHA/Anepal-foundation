import { defineField, defineType } from 'sanity';

import { validationLang } from '../../lib/validation-lang';
import { PuzzleIcon } from 'lucide-react';

export const whatmakesUsUniqueType = defineType({
  title: 'What makes us unique',
  name: 'what-makes-us-unique',
  type: 'document',
  icon: PuzzleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add title in all languages');
        })
    }),

    defineField({
      name: 'description',
      type: 'internationalizedArrayText'
      // validation: rule =>
      //   rule
      //     .required()
      //     .custom<{ value: string; _type: string; _key: string }[]>(value => {
      //       return validationLang(
      //         value,
      //         'Please add description in all languages'
      //       );
      //     })
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Recommended size: 650x500px',
      options: {
        hotspot: true
      },
      validation: rule => rule.required().error('Image is required')
    })
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
