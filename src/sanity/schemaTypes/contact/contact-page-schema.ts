import { defineType } from 'sanity';
import { Calendar } from 'lucide-react';

import { validationLang } from '../../lib/validation-lang';

export const contactPageSchema = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: Calendar,
  fields: [
    {
      name: 'title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add title in all languages');
        })
    },
    {
      name: 'subtitle',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add subtitle in all languages');
        })
    }
    // {
    //   name: 'highlightTitle',
    //   title: 'Highlight Title',
    //   type: 'internationalizedArrayString',
    //   validation: rule =>
    //     rule
    //       .required()
    //       .custom<{ value: string; _type: string; _key: string }[]>(value => {
    //         return validationLang(
    //           value,
    //           'Please add highlight title in all languages'
    //         );
    //       })
    // },
    // {
    //   name: 'short_description',
    //   type: 'internationalizedArrayText',
    //   validation: rule =>
    //     rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
    //       return validationLang(value, 'Please add subtitle in all languages');
    //     })
    // }
  ],
  preview: {
    select: {
      title: 'title',
      highlightTitle: 'highlightTitle'
    },
    prepare(args) {
      return {
        title: args.title?.[0]?.value || ''
      };
    }
  }
});
