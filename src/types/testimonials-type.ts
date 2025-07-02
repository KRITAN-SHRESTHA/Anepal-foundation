import {
  Home_testimonial,
  Team_member_roles,
  Testimonials_list
} from '@/sanity/types';

export type PopulatedTestimonialsList = Omit<Testimonials_list, 'role'> & {
  role: Team_member_roles;
};

export type PopulatedHomeTestimonials = Omit<
  Home_testimonial,
  'select_testimonials'
> & {
  select_testimonials: PopulatedTestimonialsList[];
};
