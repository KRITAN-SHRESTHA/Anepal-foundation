import { env } from './env';

export const SESSION_COOKIE_NAME = 'auto-deal-nepal-cookie';
export const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
export const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2; // 15 * 2 = 30 days

export const baseUrl =
  env.NEXT_PUBLIC_SITE_URL || 'https://anepalfoundation.org';

// 2025-05-23 12:26:15.048+00
