import { defineArrayMember, defineField, defineType, Reference } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const teamMembersPageSchema = defineType({
  name: 'team_members_page',
  title: 'Team members page',
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
          description: 'Hero image (recommended size: 1440 × 687px)',
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
    },
    {
      name: 'membersDetails',
      title: 'Members Details',
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
          name: 'description',
          title: 'Short description',
          type: 'internationalizedArrayText',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add short description in all languages'
                );
              }
            )
        },
        {
          name: 'membersList',
          title: 'Select Members',
          type: 'array',
          // validation: rule => rule.required().error('Please select member'),
          validation: rule =>
            rule.custom((arr: Reference[]) => {
              // arr will gives the array of selected fields
              if (!arr) return 'Please select at least a member';

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
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Team members'
      };
    }
  }
});
