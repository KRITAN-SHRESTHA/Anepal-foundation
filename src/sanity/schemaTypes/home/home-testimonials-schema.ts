import { defineArrayMember, defineType, Reference } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const homeTestimonialsSchema = defineType({
  name: 'home_testimonial',
  title: 'Home stats section',
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
      name: 'select_testimonials',
      title: 'Select stats',
      type: 'array',
      validation: rule =>
        rule.custom((arr: Reference[]) => {
          // arr will gives the array of selected fields
          if (!arr) return 'Please select at least a stat';

          if (arr.length > 9) {
            return 'Select upto 9 stats only';
          }

          const refs = arr.map(item => item._ref);
          const hasDuplicates = refs.length !== new Set(refs).size;
          return hasDuplicates ? 'No duplicate selections allowed' : true;
        }),
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'testimonials_list' }
        })
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Testimonials Section'
      };
    }
  }
});
