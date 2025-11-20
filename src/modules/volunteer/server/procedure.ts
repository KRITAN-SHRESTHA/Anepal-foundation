import { client } from '@/sanity/lib/client';
import { emailTransporter } from '@/lib/nodemailer';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { PopulatedVolunteerPage } from '@/types/volunteer-types';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { env } from '@/env';

const volunteerFormSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Address is required'),
  occupation: z.string().min(1, 'Occupation is required')
});

// Email sending helper function using Nodemailer
async function sendEmail({
  to,
  subject,
  html,
  replyTo
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  try {
    await emailTransporter.sendMail({
      from: env.GMAIL_USER,
      to,
      replyTo: replyTo || env.GMAIL_USER,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error);
    return false;
  }
}

export const volunteerRouter = createTRPCRouter({
  getVolunteerView: publicProcedure.query(async () => {
    try {
      const volunteerViewQuery = `*[_type == "volunteer_view"][0] {
        ...,
        whyVolunteerSection{
          ...,
          benefits[]->
        },
      }`;

      const data =
        await client.fetch<PopulatedVolunteerPage>(volunteerViewQuery);

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message:
            'Volunteer view content not found. Please check Sanity configuration.'
        });
      }

      return data;
    } catch (error) {
      console.error('Error fetching volunteer view:', error);

      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch volunteer view content'
      });
    }
  }),

  submitApplication: publicProcedure
    .input(volunteerFormSchema)
    .mutation(async ({ input }) => {
      try {
        // Fetch founder email from Sanity settings
        const settingsQuery = `*[_type == "settings"][0] { contact { email } }`;
        const settings = await client.fetch<{
          contact?: { email?: string };
        }>(settingsQuery);
        const founderEmail = settings?.contact?.email;

        if (!founderEmail) {
          console.error('Founder email not configured in Sanity settings');
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Email configuration error. Please contact support.'
          });
        }

        // Format date for display
        const formattedDob = new Date(input.dob).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        // Email to founder
        const founderEmailContent = `
          <h2>New Volunteer Application Received</h2>
          <p>A new volunteer has submitted an application. Here are the details:</p>

          <h3>Applicant Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${input.name}</li>
            <li><strong>Email:</strong> ${input.email}</li>
            <li><strong>Phone:</strong> ${input.phone}</li>
            <li><strong>Date of Birth:</strong> ${formattedDob}</li>
            <li><strong>Address:</strong> ${input.address}</li>
            <li><strong>Occupation:</strong> ${input.occupation}</li>
          </ul>

          <p>Please review this application and follow up with the applicant if you'd like to proceed.</p>
          <hr/>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This is an automated message from Anepal Foundation volunteer management system.
          </p>
        `;

        // Email to volunteer
        const volunteerEmailContent = `
          <h2>Thank You for Your Volunteer Application!</h2>
          <p>Dear ${input.name},</p>

          <p>Thank you for submitting your volunteer application to Anepal Foundation. We're excited about your interest in making a difference!</p>

          <h3>Your Application Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${input.name}</li>
            <li><strong>Email:</strong> ${input.email}</li>
            <li><strong>Phone:</strong> ${input.phone}</li>
            <li><strong>Occupation:</strong> ${input.occupation}</li>
          </ul>

          <p>Our team will review your application and contact you within <strong>7-10 business days</strong> to discuss opportunities that match your skills and interests.</p>

          <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>

          <p>
            Best regards,<br/>
            <strong>Anepal Foundation Team</strong>
          </p>
          <hr/>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This is an automated message from Anepal Foundation. Please do not reply to this email.
          </p>
        `;

        // Send emails in parallel
        const [founderEmailSent, volunteerEmailSent] = await Promise.all([
          sendEmail({
            to: founderEmail,
            subject: `New Volunteer Application - ${input.name}`,
            html: founderEmailContent,
            replyTo: input.email
          }),
          sendEmail({
            to: input.email,
            subject: 'Thank You for Your Volunteer Application',
            html: volunteerEmailContent
          })
        ]);

        if (!founderEmailSent || !volunteerEmailSent) {
          console.warn('One or more emails failed to send');
          // Don't fail the submission if emails don't send, but log it
        }

        // Store form data in Sanity for record-keeping
        const result = await client.create({
          _type: 'volunteer_application',
          name: input.name,
          email: input.email,
          phone: input.phone,
          dob: input.dob,
          address: input.address,
          occupation: input.occupation,
          submittedAt: new Date().toISOString()
        });

        return {
          success: true,
          message: 'Application submitted successfully',
          data: result
        };
      } catch (error) {
        console.error('Error submitting volunteer application:', error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to submit application. Please try again!'
        });
      }
    })
});
