import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PAYPAL_CLIENT_ID: z.string(),
    SANITY_API_WRITE_TOKEN: z.string(),
    PAYPAL_SECRET: z.string()
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_DATASET: z.string()
  },
  runtimeEnv: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET
  }
  // skipValidation:
  //   !!process.env.SKIP_ENV_VALIDATION ||
  //   !!!!process.env.NEXT_PUBLIC_SKIP_ENV_VALIDATION,

  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
