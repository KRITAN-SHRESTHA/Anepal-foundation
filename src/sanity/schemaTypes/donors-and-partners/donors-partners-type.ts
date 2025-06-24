import { BinaryDocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineType } from 'sanity';

export const donorsPartnersType = defineType({
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
        { name: 'title', title: 'Title', type: 'internationalizedArrayString' }, // "Partners & Donors"
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'internationalizedArrayString'
        }, // "Donation"
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true }
        }
        // { name: 'highlightText', title: 'Highlight Text', type: 'string' } // "Mercy"
      ]
    },
    {
      name: 'whoHelpUsSection',
      title: 'Who Help Us Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'internationalizedArrayString' }, // "Who Help Us"
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'internationalizedArrayString'
        }, // "Who Help Us"
        {
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayText'
        },
        {
          name: 'partnersName',
          title: 'Partner Name',
          type: 'array',
          validation: rule => rule.required().error('Please select partners'),
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
          validation: rule => rule.required().error('Please select donors'),
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
      name: 'statsSection',
      title: 'Statistics Section',
      type: 'object',
      fields: [
        {
          name: 'statsTitle',
          title: 'Statistics Title',
          type: 'internationalizedArrayString'
        }, // "Partners & Donors"
        {
          name: 'statsSubtitle',
          title: 'Statistics Subtitle',
          type: 'internationalizedArrayString'
        },
        {
          name: 'partnersDescription',
          title: 'Description',
          type: 'internationalizedArrayText'
        },
        {
          name: 'statistics',
          title: 'Statistics',
          type: 'array',
          description: 'Add upto 2 field only',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'internationalizedArrayString'
                }, // "People We Helped on 2019"
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  description: '200+ or 220k'
                } // "200k"
              ]
            }
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
          type: 'internationalizedArrayText'
        }, // "To all our donors, partners and volunteers"
        {
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayText'
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
