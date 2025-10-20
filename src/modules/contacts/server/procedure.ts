import { client } from '@/sanity/lib/client';
import { ContactPage } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required')
});

const CONTACT_PAGE_QUERY = '*[_type == "contactPage"][0]';

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

export const contactRouter = createTRPCRouter({
  getContactPage: publicProcedure.query(async () => {
    return await client.fetch<ContactPage>(CONTACT_PAGE_QUERY, {}, options);
  }),
  contactSubmit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await client.create({
          _type: 'contact',
          fullName: input.fullName,
          email: input.email,
          phoneNumber: input.phoneNumber,
          message: input.message,
          submittedAt: new Date().toISOString()
        });

        return { success: true, data: result };
      } catch (error) {
        console.error('Error submitting contact form:', error);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to submit. Please try again!'
        });
      }
    })
});
