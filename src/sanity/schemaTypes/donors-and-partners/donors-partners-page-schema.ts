import { validationLang } from '@/sanity/lib/validation-lang';
import { BinaryDocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType, Reference } from 'sanity';

export const donorsPartnersPageSchema = defineType({
  name: 'donorsAndPartnersPage',
  title: 'Donors & Partners Page',
  icon: BinaryDocumentIcon,
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
        }, // "Donation"
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
    },
    {
      name: 'whoHelpUsSection',
      title: 'Who Help Us Section',
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
        },
        {
          name: 'partnersName',
          title: 'Partner Name',
          type: 'array',
          validation: rule =>
            rule.custom((arr: Reference[]) => {
              // arr will gives the array of selected fields
              if (!arr) return 'Please select at least a partner';

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
        },
        {
          name: 'donorsNames',
          title: 'Donors Names',
          type: 'array',
          validation: rule =>
            rule.custom((arr: Reference[]) => {
              // arr will gives the array of selected fields
              if (!arr) return 'Please select at least a donor';

              const refs = arr.map(item => item._ref);
              const hasDuplicates = refs.length !== new Set(refs).size;
              return hasDuplicates ? 'No duplicate selections allowed' : true;
            }),
          of: [
            defineArrayMember({
              type: 'reference',
              to: { type: 'donorsList' }
            })
          ]
        }
      ]
    },
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
          name: 'statsDescription',
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
        },
        {
          name: 'statistics',
          title: 'Select Statistics',
          type: 'array',
          description: 'Select upto 2 field only',
          validation: rule =>
            rule.custom((arr: Reference[]) => {
              // arr will gives the array of selected fields
              if (!arr) return 'Please select at least a field';

              if (arr.length > 2) {
                return 'You can select up to 2 fields only';
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
      name: 'thankYouSection',
      title: 'Thank You Section',
      type: 'object',
      fields: [
        // { name: 'title', title: 'Title', type: 'internationalizedArrayText' }, // "Thank You"
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'internationalizedArrayText',
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
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare() {
      return {
        title: 'Donors & Partners'
      };
    }
  }
});

// {
//   name: 'foundingPartnerSection',
//   title: 'Founding Partner Section',
//   type: 'object',
//   fields: [
//     { name: 'title', title: 'Title', type: 'string' }, // "Founding Partner"
//     {
//       name: 'partner',
//       title: 'Partner Info',
//       type: 'object',
//       fields: [
//         { name: 'logo', title: 'Logo', type: 'image' },
//         { name: 'name', title: 'Name', type: 'string' }, // "CharGo LLC"
//         {
//           name: 'description',
//           title: 'Description',
//           type: 'array',
//           // of: [{ type: 'blockContent' }]
//           of: [
//             {
//               name: 'body_en',
//               title: 'Body (en)',
//               type: 'block',
//               validation: rule =>
//                 rule.required().error('Body en is required')
//             },
//             {
//               name: 'body_es',
//               title: 'Body (es)',
//               type: 'block',
//               validation: rule =>
//                 rule.required().error('Body en is required')
//             }
//           ]
//         }
//       ]
//     }
//   ]
// },
