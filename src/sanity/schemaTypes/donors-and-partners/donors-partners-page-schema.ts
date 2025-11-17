import { validationLang } from '@/sanity/lib/validation-lang';
import { BinaryDocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineType, Reference } from 'sanity';

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
        }
        // {
        //   name: 'backgroundImage',
        //   title: 'Background Image',
        //   type: 'image',
        //   options: { hotspot: true },
        //   validation: rule => rule.required().error('Image is required')
        // }
      ]
    },
    {
      name: 'whoHelpUsSection',
      title: 'Who Help Us Section',
      type: 'object',
      fields: [
        {
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
        },
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
        }
      ]
    },
    {
      name: 'statisticsSection',
      title: 'Statistics section',
      type: 'object',
      fields: [
        {
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
        },
        {
          name: 'title',
          title: 'Statistics Title',
          type: 'internationalizedArrayString',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add title in all language'
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
      name: 'donors_section',
      title: 'Donors Section',
      type: 'object',
      fields: [
        {
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
        },
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
          name: 'donors_names',
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
