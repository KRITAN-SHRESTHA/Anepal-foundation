import { defineType } from 'sanity';
import { Calendar } from 'lucide-react';

import { validationLang } from '../../lib/validation-lang';

export const eventsPageSchema = defineType({
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  icon: Calendar,
  fields: [
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add title in all languages'
                );
              }
            )
        }
      ]
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
