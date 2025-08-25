import { client } from '@/sanity/lib/client';
import { PrivacyPolicy, TermsAndConditions } from '@/sanity/types';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';

const GET_TERMS_AND_CONDITIONS = `*[
  _type == "termsAndConditions"
][0]`;
const GET_PRIVACY_POLICY = `*[
  _type == "privacyPolicy"
][0]`;

// will revalidate after every 30 seconds
const options = { next: { revalidate: 0 } };

export const policiesRouter = createTRPCRouter({
  getTermsAndConditions: publicProcedure.query(async () => {
    return client.fetch<TermsAndConditions>(
      GET_TERMS_AND_CONDITIONS,
      {},
      options
    );
  }),
  getPrivacyPolicies: publicProcedure.query(async () => {
    return await client.fetch<PrivacyPolicy>(GET_PRIVACY_POLICY, {}, options);
  })
});
