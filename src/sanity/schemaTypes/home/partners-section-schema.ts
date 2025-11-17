import { defineType } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const homePartnersSchema = defineType({
  name: 'home_partners',
  title: 'Home Partners',
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
    }
    // {
    //   name: 'title',
    //   title: 'Title',
    //   type: 'internationalizedArrayString',
    //   validation: rule =>
    //     rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
    //       return validationLang(value, 'Please add name in all languages');
    //     })
    // },
  ],
  preview: {
    prepare() {
      return {
        title: 'Partners Section'
      };
    }
  }
});
