import { defineType } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const homeEventsSchema = defineType({
  name: 'home_events',
  title: 'Home Events',
  type: 'document',
  icon: Info,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString'
      // validation: rule =>
      //   rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
      //     return validationLang(value, 'Please add name in all languages');
      //   })
    },
    {
      name: 'highlightTitle',
      title: 'Highlight Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
            return validationLang(
              value,
              'Please add highlight title in all languages'
            );
          })
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add subtitle in all languages');
        })
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'internationalizedArrayText',
      description: 'Please provide some information about events',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add description in all languages'
          );
        })
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Events Section'
      };
    }
  }
});
