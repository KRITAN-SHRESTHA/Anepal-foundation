import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';
import { env } from '@/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: env.SANITY_API_WRITE_TOKEN // Only needed if you want to update content with the client
});

// Create a write client with anonymous write permissions
// export const writeClient = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: false,
//   token: process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN // Token with write access
// });
