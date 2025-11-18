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
        }
      ]
    },
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge_text',
          title: 'Badge text',
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
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'image',
              options: { hotspot: true }
            })
          ],
          description:
            'Images for Who We Are (recommended: 800x600). Provide 1–2 images.',
          validation: rule =>
            rule
              .required()
              .min(2)
              .max(2)
              .error(
                'Please provide between 1 and 2 images for the Who We Are section'
              )
        })
      ]
    }),
    defineField({
      name: 'mapSection',
      title: 'Map Section',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Map Description',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'internationalizedArrayString',
              validation: rule =>
                rule.custom<{ value: string; _type: string; _key: string }[]>(
                  value => {
                    return validationLang(
                      value,
                      'Please add label in all languages'
                    );
                  }
                )
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              validation: rule => rule.required().error('Value is required')
            })
          ]
        }),
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
      ]
    }),
    defineField({
      name: 'whyChooseSection',
      title: 'Why Choose Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge_text',
          title: 'Badge text',
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
          type: 'internationalizedArrayString',
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
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Item Title',
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
                  title: 'Item Description',
                  type: 'internationalizedArrayText',
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
                  name: 'icon',
                  title: 'Icon (optional)',
                  type: 'image',
                  options: { hotspot: true },
                  validation: rule => rule.required().error('Image is required')
                })
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'partnersSection',
      title: 'Partners Section',
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
                  'Please add title in all languages'
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
          name: 'partner',
          title: 'Select Partners',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'partnersList' }]
            })
          ],
          validation: rule =>
            rule.custom((arr: Reference[] | undefined) => {
              if (!arr) return true;
              const refs = arr.map(item => item._ref);
              const hasDuplicates = refs.length !== new Set(refs).size;
              return hasDuplicates ? 'No duplicate selections allowed' : true;
            })
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'About us'
      };
    }
  }
});
