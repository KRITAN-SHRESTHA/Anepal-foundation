import { validationLang } from '@/sanity/lib/validation-lang';
import { List } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const storiesPageSchema = defineType({
  name: 'storiesPageContent',
  title: 'Stories Page Content',
  icon: List,
  type: 'document',
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
        },
        {
          name: 'highlightTitle',
          title: 'Highlight Title',
          type: 'internationalizedArrayString',
          validation: rule =>
            rule
              .required()
              .custom<
                { value: string; _type: string; _key: string }[]
              >(value => {
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
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add subtitle in all languages'
                );
              }
            )
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          validation: rule => rule.required().error('Image is required'),
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text (about donors and partners)',
              validation: rule => rule.required().error('Image alt is required')
            })
          ]
        }
        // { name: 'highlightText', title: 'Highlight Text', type: 'string' } // "Mercy"
      ]
    }
    // {
    //   name: 'stories',
    //   title: 'Select Stories',
    //   type: 'array',
    //   validation: rule =>
    //     rule.custom((arr: Reference[]) => {
    //       // arr will gives the array of selected fields
    //       if (!arr) return 'Please select at least a story';

    //       const refs = arr.map(item => item._ref);
    //       const hasDuplicates = refs.length !== new Set(refs).size;
    //       return hasDuplicates ? 'No duplicate selections allowed' : true;
    //     }),
    //   of: [
    //     defineArrayMember({ type: 'reference', to: { type: 'storiesList' } })
    //   ]
    // }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare() {
      return {
        title: 'Stories page'
      };
    }
  }
});
