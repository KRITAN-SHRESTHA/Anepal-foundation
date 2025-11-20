import { defineArrayMember, defineField, defineType } from 'sanity';
import { Users } from 'lucide-react';
import { validationLang } from '../../lib/validation-lang';

export const volunteerViewSchema = defineType({
  name: 'volunteer_view',
  title: 'Volunteer View',
  type: 'document',
  icon: Users,
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
    },
    defineField({
      name: 'opportunitiesSection',
      title: 'Volunteer Opportunities Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge_text',
          title: 'Badge Text',
          type: 'internationalizedArrayString',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add badge text in all languages'
                );
              }
            )
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
          name: 'opportunities',
          title: 'Opportunities',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Opportunity Title',
                  type: 'internationalizedArrayString',
                  validation: rule =>
                    rule.custom<
                      { value: string; _type: string; _key: string }[]
                    >(value => {
                      return validationLang(
                        value,
                        'Please add title in all languages'
                      );
                    })
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'internationalizedArrayText',
                  validation: rule =>
                    rule.custom<
                      { value: string; _type: string; _key: string }[]
                    >(value => {
                      return validationLang(
                        value,
                        'Please add description in all languages'
                      );
                    })
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                  description: 'Image for Why Volunteer (recommended: 300x300)',
                  validation: rule => rule.required().error('Image is required')
                })
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
            })
          ],
          validation: rule =>
            rule
              .required()
              .min(1)
              .error('At least 1 opportunity is required')
              .max(3)
              .error('Maximum 3 opportunities allowed')
        })
      ]
    }),
    defineField({
      name: 'whyVolunteerSection',
      title: 'Why Volunteer Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge_text',
          title: 'Badge Text',
          type: 'internationalizedArrayString',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add badge text in all languages'
                );
              }
            )
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
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add description in all languages'
                );
              }
            )
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Image for Why Volunteer (recommended: 800x600)',
          validation: rule => rule.required().error('Image is required')
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'reference',
          to: [{ type: 'organizationStats' }],
          validation: rule => rule.required().error('Stats is required')
        }),
        defineField({
          name: 'benefits',
          title: 'Benefits List',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'volunteer_benefits' }]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'formSection',
      title: 'Volunteer Application Form Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge_text',
          title: 'Badge Text',
          type: 'internationalizedArrayString',
          description: 'e.g., "Join Us Today"',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add badge text in all languages'
                );
              }
            )
        }),
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'internationalizedArrayString',
          description: 'e.g., "Volunteer Application Form"',
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
          title: 'Form Description',
          type: 'internationalizedArrayText',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add description in all languages'
                );
              }
            )
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Volunteer Page'
      };
    }
  }
});
