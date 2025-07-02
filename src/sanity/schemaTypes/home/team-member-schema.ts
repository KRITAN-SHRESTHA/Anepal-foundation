import { defineArrayMember, defineType, Reference } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const homeTeamMemberSchema = defineType({
  name: 'home_team_member',
  title: 'Home team member',
  type: 'document',
  icon: Info,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add name in all languages');
        })
    },
    {
      name: 'highlightTitle',
      title: 'Highlight Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
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
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add subtitle in all languages');
        })
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'internationalizedArrayText',
      description: 'Please provide some information about team members',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add description in all languages'
          );
        })
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Team Members Section'
      };
    }
  }
});
