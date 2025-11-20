import { validationLang } from '@/sanity/lib/validation-lang';
import { ListIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const volunteerBenefitsSchema = defineType({
  name: 'volunteer_benefits',
  title: 'Volunteer Benefits',
  icon: ListIcon,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add badge text in all languages'
          );
        })
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
