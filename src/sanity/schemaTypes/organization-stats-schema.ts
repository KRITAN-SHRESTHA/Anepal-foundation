import { defineField, defineType } from 'sanity';
import { Settings } from 'lucide-react';
import { validationLang } from '../lib/validation-lang';

export const organizationStatsSchema = defineType({
  name: 'organizationStats',
  title: 'Organization Statistics',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add label in all languages');
        })
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Enter value as 200+ or 220k',
      validation: rule => rule.required().error('Value is required')
    })
  ],
  preview: {
    select: {
      title: 'label'
    },
    prepare(args) {
      return {
        title: args.title?.[0]?.value || ''
      };
    }
  }
});
