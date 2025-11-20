import { defineField, defineType } from 'sanity';
import { Mail } from 'lucide-react';

export const volunteerApplicationSchema = defineType({
  name: 'volunteer_application',
  title: 'Volunteer Application',
  type: 'document',
  icon: Mail,
  fields: [
    defineField({
      name: 'name',
      title: 'Applicant Name',
      type: 'string',
      validation: rule => rule.required().error('Name is required')
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: rule =>
        rule.required().email().error('Valid email is required')
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: rule =>
        rule
          .required()
          .regex(/^\+?[0-9\s-()]+$/, {
            name: 'phone',
            invert: false
          })
          .error('Valid phone number is required')
    }),
    defineField({
      name: 'dob',
      title: 'Date of Birth',
      type: 'date',
      validation: rule => rule.required().error('Date of birth is required')
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: rule => rule.required().error('Address is required')
    }),
    defineField({
      name: 'occupation',
      title: 'Occupation',
      type: 'string',
      validation: rule => rule.required().error('Occupation is required')
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Notes for internal use by the team'
    }),
    defineField({
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ]
      },
      initialValue: 'new'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'status'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle,
        media: media
      };
    }
  }
});
