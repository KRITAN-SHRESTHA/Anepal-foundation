import { defineArrayMember, defineType, Reference } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const homeStatsSchema = defineType({
  name: 'home_stats',
  title: 'Home stats section',
  type: 'document',
  icon: Info,
  fields: [
    {
      name: 'badge_text',
      title: 'Badge text',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add badge text in all languages'
          );
        })
    },
    {
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add name in all languages');
        })
    },
    {
      name: 'total_impacted_lives',
      title: 'Total Lives impacted',
      type: 'number',
      validation: rule => rule.required()
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
            return validationLang(
              value,
              'Please add short description in all languages'
            );
          })
    },

    {
      name: 'select_stats',
      title: 'Select stats',
      type: 'array',
      validation: rule =>
        rule.custom((arr: Reference[]) => {
          // arr will gives the array of selected fields
          if (!arr) return 'Please select at least a stat';

          if (arr.length > 3) {
            return 'Select upto 3 stats only';
          }

          const refs = arr.map(item => item._ref);
          const hasDuplicates = refs.length !== new Set(refs).size;
          return hasDuplicates ? 'No duplicate selections allowed' : true;
        }),
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'organizationStats' }
        })
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Home stats'
      };
    }
  }
});
