'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { webhookPlugin } from './src/sanity/plugins/webhook';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  cors: {
    origin: ['*'], // Allow all origins for contact form submissions
    credentials: true
  },
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    webhookPlugin({
      url: process.env.NEXT_PUBLIC_SITE_URL + '/api/revalidate-sitemap',
      secret: process.env.SANITY_REVALIDATE_SECRET || ''
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    internationalizedArray({
      languages: [
        { id: 'en', title: 'English' },
        { id: 'es', title: 'Spanish' }
      ],
      defaultLanguages: ['en', 'es'],
      fieldTypes: ['string', 'text']
    })
  ]
});
