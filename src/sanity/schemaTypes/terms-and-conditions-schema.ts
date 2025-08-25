import { defineField, defineType } from 'sanity';

export const termsAndConditionsSchema = defineType({
  name: 'termsAndConditions',
  title: 'Terms and Conditions',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      type: 'object',
      fields: [
        {
          name: 'content_en',
          title: 'Content (en)',
          type: 'blockContent',
          validation: rule => rule.required().error('Content en is required')
        },
        {
          name: 'content_es',
          title: 'Content (es)',
          type: 'blockContent',
          validation: rule => rule.required().error('Content es is required')
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Terms and conditions'
      };
    }
  }
});
