# Volunteer System Implementation Guide

## Overview
This document outlines the complete volunteer management system implementation using tRPC, Sanity, and email notifications.

## What Was Created

### 1. **Sanity Schemas**

#### `volunteer-view-schema.ts`
Document schema for managing volunteer page content:
- Hero section (title, variant)
- Opportunities section (badges, titles, opportunity items)
- Why volunteer section (badges, titles, descriptions, image, statistics, benefits)
- Form section (badges, titles, descriptions, occupation options)

#### `volunteer-application-schema.ts`
Document schema for storing submitted volunteer applications:
- Applicant information (name, email, phone, DOB, address, occupation)
- Submission timestamp
- Email delivery status tracking
- Application status (pending, reviewed, approved, rejected)
- Internal notes for team

Both schemas are registered in `src/sanity/schemaTypes/index.ts` and available in Sanity Studio.

### 2. **tRPC Router** (`src/modules/volunteer/server/procedure.ts`)

**Procedure:** `volunteer.submitApplication`

**Input Validation (Zod):**
```typescript
{
  name: string (required, min 1 char)
  email: string (valid email)
  phone: string (required, min 1 char)
  dob: string (required, min 1 char)
  address: string (required, min 1 char)
  occupation: string (required, min 1 char)
}
```

**Features:**
- ✅ Form validation with Zod schemas
- ✅ Fetches founder email from Sanity settings (`contact.email`)
- ✅ Sends formatted emails to both founder and volunteer
- ✅ Stores application data in Sanity for record-keeping
- ✅ Tracks email delivery status
- ✅ Error handling with tRPC error responses

**Email Services Supported:**
- **Resend** (recommended) - Set `RESEND_API_KEY` environment variable
- **SendGrid** - Set `SENDGRID_API_KEY` environment variable

### 3. **Frontend Component** (`src/modules/volunteer/ui/sections/volunteer-form-section.tsx`)

**Features:**
- ✅ Form with all required fields (name, email, phone, DOB, address, occupation)
- ✅ tRPC mutation hook for form submission
- ✅ Loading state with disabled button during submission
- ✅ Success/error message display with auto-hide
- ✅ Form reset on successful submission
- ✅ Smooth animations and UX feedback

### 4. **tRPC Router Registration**

Updated `src/trpc/routers/_app.ts`:
```typescript
export const appRouter = createTRPCRouter({
  // ... other routers
  volunteer: volunteerRouter
});
```

## Setup Instructions

### 1. Configure Email Service

Choose one of the following:

#### Option A: Using Resend (Recommended)
```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=noreply@yourdomain.com
```

#### Option B: Using SendGrid
```bash
npm install @sendgrid/mail
```

Add to `.env.local`:
```
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=noreply@yourdomain.com
```

### 2. Configure Sanity Settings

1. Go to Sanity Studio
2. Navigate to **Settings** document
3. Ensure **Contact Information → Email** is filled with the founder's email address
   - This email receives all volunteer applications

### 3. Environment Variables

Create/update `.env.local`:
```env
# Email Configuration
RESEND_API_KEY=your_key_here
FROM_EMAIL=noreply@anepal.org

# OR use SendGrid
SENDGRID_API_KEY=your_key_here
FROM_EMAIL=noreply@anepal.org
```

### 4. Database/Sanity Token

Ensure your Sanity token has write permissions for creating documents. The API will attempt to:
- Read settings (for founder email)
- Create volunteer_application documents

## Testing

### Local Testing

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Fill out the volunteer form** at `/volunteer`

3. **Check the browser console** for any client-side errors

4. **Check server logs** for tRPC mutation execution

5. **Check Sanity Studio:**
   - Navigate to "Volunteer Application" collection
   - You should see the submitted application(s)

### Email Testing

If using Resend or SendGrid sandbox mode:
- Check your email inbox/spam folder
- Verify both founder and volunteer emails are received

## Email Templates

### Email to Founder
- Subject: `New Volunteer Application - [Applicant Name]`
- Contains: Full applicant details (name, email, phone, DOB, address, occupation)
- Reply-To: Applicant's email

### Email to Volunteer
- Subject: `Thank You for Your Volunteer Application`
- Contains: Confirmation, application details, next steps
- Includes: 2-3 business day response time expectation

## API Response

**On Success:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": { /* Sanity document */ }
}
```

**On Error:**
```json
{
  "code": "BAD_REQUEST",
  "message": "Failed to submit application. Please try again!"
}
```

## File Structure

```
src/
├── app/
│   └── api/
│       └── volunteer/
│           └── route.ts (OLD - can be deleted)
├── modules/
│   └── volunteer/
│       ├── server/
│       │   └── procedure.ts (tRPC router)
│       └── ui/
│           └── sections/
│               └── volunteer-form-section.tsx (Client form)
├── sanity/
│   └── schemaTypes/
│       └── volunteer/
│           ├── volunteer-view-schema.ts
│           ├── volunteer-application-schema.ts
│           └── index.ts (exports)
└── trpc/
    └── routers/
        └── _app.ts (registered)
```

## Cleanup

The old REST API route (`src/app/api/volunteer/route.ts`) is no longer needed since we're using tRPC. You can delete it:
```bash
rm src/app/api/volunteer/route.ts
```

## Troubleshooting

### Issue: Form submission fails silently
- **Check:** Browser console for errors
- **Check:** Server logs for tRPC mutation errors
- **Verify:** Email service API key is correct in `.env.local`
- **Verify:** Sanity token has write permissions

### Issue: Emails not sending
- **Check:** Email service API key is set in environment
- **Check:** `FROM_EMAIL` is configured
- **Check:** Founder email is set in Sanity Settings
- **Check:** Email service quota/limits

### Issue: Form validation errors
- **Check:** All form fields meet validation requirements
- **Check:** Email format is valid (includes @)
- **Check:** Phone number includes only numbers, +, -, (), and spaces

## Security Considerations

✅ **Implemented:**
- Input validation with Zod schemas
- tRPC error handling
- Email service API keys in environment variables
- Database write limits (Sanity will handle per your plan)

⚠️ **Consider Adding:**
- Rate limiting on the tRPC procedure
- CAPTCHA verification before submission
- Email verification for duplicate submissions
- Volunteer application review workflow in Sanity

## Future Enhancements

1. Add CAPTCHA to prevent spam
2. Implement email verification workflow
3. Create admin dashboard for application management
4. Add volunteer status tracking
5. Generate application PDF or certificate
6. Integration with volunteer scheduling system

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Sanity documentation: https://www.sanity.io/docs
3. Review tRPC documentation: https://trpc.io/docs
4. Check email service documentation (Resend/SendGrid)
