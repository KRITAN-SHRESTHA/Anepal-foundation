import { defineArrayMember, defineField, defineType, Reference } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '../lib/validation-lang';

export const aboutUsSchema = defineType({
  name: 'aboutus',
  title: 'About us',
  type: 'document',
  icon: Info,
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
          validation: rule => rule.required().error('Image is required')
          // fields: [
          //   defineField({
          //     name: 'alt',
          //     type: 'string',
          //     title: 'Alternative Text (about donors and partners)',
          //     validation: rule => rule.required().error('Image alt is required')
          //   })
          // ]
        }
        // { name: 'highlightText', title: 'Highlight Text', type: 'string' } // "Mercy"
      ]
    },
    defineField({
      name: 'firstcontent',
      title: 'First content Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Image (recommended size: 400 × 400px)',
          validation: rule => rule.required().error('Image is required'),
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text (about image)',
              validation: rule => rule.required().error('Image alt is required')
            })
          ]
        }),
        defineField({
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
        }),
        // {
        //   name: 'highlightTitle',
        //   title: 'Highlight Title',
        //   type: 'internationalizedArrayString',
        //   validation: rule =>
        //     rule
        //       .required()
        //       .custom<
        //         { value: string; _type: string; _key: string }[]
        //       >(value => {
        //         return validationLang(
        //           value,
        //           'Please add highlight title in all languages'
        //         );
        //       })
        // },
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
        defineField({
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayText',
          validation: rule =>
            rule
              .required()
              .custom<
                { value: string; _type: string; _key: string }[]
              >(value => {
                return validationLang(
                  value,
                  'Please add description in all languages'
                );
              })
        })
      ]
    }),
    defineField({
      name: 'secondcontent',
      title: 'Second content',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Image (recommended size: 400 × 400px)',
          validation: rule => rule.required().error('Image is required'),
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text (about image)',
              validation: rule => rule.required().error('Image alt is required')
            })
          ]
        }),
        defineField({
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
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayText',
          validation: rule =>
            rule
              .required()
              .custom<
                { value: string; _type: string; _key: string }[]
              >(value => {
                return validationLang(
                  value,
                  'Please add description in all languages'
                );
              })
        })
      ]
    }),
    {
      name: 'statisticsSection',
      title: 'Statistics section',
      type: 'object',
      fields: [
        {
          name: 'statsTitle',
          title: 'Statistics Title',
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
          name: 'statsSubtitle',
          title: 'Statistics Subtitle',
          type: 'internationalizedArrayString',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add susbtitle in all languages'
                );
              }
            )
        },
        {
          name: 'statistics',
          title: 'Select Statistics',
          type: 'array',
          description: 'Select upto 4 field only',
          validation: rule =>
            rule.custom((arr: Reference[]) => {
              // arr will gives the array of selected fields
              if (!arr) return 'Please select at least a field';

              if (arr.length > 4) {
                return 'You can select up to 4 fields only';
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
      ]
    },
    {
      name: 'teamsSection',
      title: 'Team section',
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
                  'Please add susbtitle in all languages'
                );
              }
            )
        },
        {
          name: 'teamMembers',
          title: 'Select Teams',
          type: 'array',
          // description: 'Select upto 4 field only',
          validation: rule =>
            rule.custom((arr: Reference[]) => {
              // arr will gives the array of selected fields
              if (!arr) return 'Please select at least a team member';

              const refs = arr.map(item => item._ref);
              const hasDuplicates = refs.length !== new Set(refs).size;
              return hasDuplicates ? 'No duplicate selections allowed' : true;
            }),
          of: [
            defineArrayMember({
              type: 'reference',
              to: { type: 'team_members' }
            })
          ]
        }
      ]
    },
    {
      name: 'partnersSection',
      title: 'Partners section',
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
          name: 'partner',
          title: 'Select Partners',
          type: 'array',
          // description: 'Select upto 4 field only',
          validation: rule =>
            rule.custom((arr: Reference[]) => {
              // arr will gives the array of selected fields
              if (!arr) return 'Please select partners';

              const refs = arr.map(item => item._ref);
              const hasDuplicates = refs.length !== new Set(refs).size;
              return hasDuplicates ? 'No duplicate selections allowed' : true;
            }),
          of: [
            defineArrayMember({
              type: 'reference',
              to: { type: 'partnersList' }
            })
          ]
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About us'
      };
    }
  }
});
