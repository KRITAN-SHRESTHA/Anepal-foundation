import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  occupation: string;
}

// Email sending function using fetch (compatible with any email service)
async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<boolean> {
  // Method 1: Using Resend (recommended - install with: npm install resend)
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
          to,
          subject,
          html,
          reply_to: replyTo
        })
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending email via Resend:', error);
      return false;
    }
  }

  // Method 2: Using SendGrid (alternative - set SENDGRID_API_KEY env var)
  if (process.env.SENDGRID_API_KEY) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: process.env.FROM_EMAIL || 'noreply@anepal.org' },
          subject,
          content: [{ type: 'text/html', value: html }],
          reply_to: replyTo ? { email: replyTo } : undefined
        })
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending email via SendGrid:', error);
      return false;
    }
  }

  console.warn(
    'No email service configured. Set RESEND_API_KEY or SENDGRID_API_KEY'
  );
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: VolunteerFormData = await request.json();

    // Validate required fields
    const { name, email, phone, dob, address, occupation } = body;
    if (!name || !email || !phone || !dob || !address || !occupation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch founder email from Sanity settings
    const settingsQuery = `*[_type == "settings"][0] { contact { email } }`;
    const settings = await client.fetch(settingsQuery);
    const founderEmail = settings?.contact?.email;

    if (!founderEmail) {
      console.error('Founder email not configured in Sanity settings');
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    // Format date for display
    const formattedDob = new Date(dob).toLocaleDateString('en-US', {
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
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Date of Birth:</strong> ${formattedDob}</li>
        <li><strong>Address:</strong> ${address}</li>
        <li><strong>Occupation:</strong> ${occupation}</li>
      </ul>

      <p>Please review this application and follow up with the applicant if you'd like to proceed.</p>
    `;

    // Email to volunteer
    const volunteerEmailContent = `
      <h2>Thank You for Your Volunteer Application!</h2>
      <p>Dear ${name},</p>

      <p>Thank you for submitting your volunteer application to Anepal Foundation. We're excited about your interest in making a difference!</p>

      <h3>Your Application Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Occupation:</strong> ${occupation}</li>
      </ul>

      <p>Our team will review your application and contact you within 2-3 business days to discuss opportunities that match your skills and interests.</p>

      <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>

      <p>Best regards,<br/>Anepal Foundation Team</p>
    `;

    // Send emails in parallel
    const [founderEmailSent, volunteerEmailSent] = await Promise.all([
      sendEmail(
        founderEmail,
        `New Volunteer Application - ${name}`,
        founderEmailContent,
        email
      ),
      sendEmail(
        email,
        'Thank You for Your Volunteer Application',
        volunteerEmailContent
      )
    ]);

    if (!founderEmailSent || !volunteerEmailSent) {
      console.warn('One or more emails failed to send');
    }

    // Optional: Store form data in Sanity for record-keeping
    try {
      await client.create({
        _type: 'volunteer_application',
        name,
        email,
        phone,
        dob,
        address,
        occupation,
        submittedAt: new Date().toISOString()
      });
    } catch (error) {
      // Log but don't fail the response if Sanity save fails
      console.error('Error storing volunteer application in Sanity:', error);
    }

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing volunteer form:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
