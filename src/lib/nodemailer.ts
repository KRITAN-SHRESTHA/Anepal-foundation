import { env } from '@/env';
import nodemailer from 'nodemailer';

export const emailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_PASS
  }
});
