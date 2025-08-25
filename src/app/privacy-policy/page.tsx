import PrivacyPolicyView from '@/modules/policies/ui/views/privacy-policy-view';
import { HydrateClient, trpc } from '@/trpc/server';

// export { generateMetadata };

export default async function PrivacyPolicyPage() {
  await trpc.policies.getPrivacyPolicies.prefetch();

  return (
    <HydrateClient>
      <PrivacyPolicyView />
    </HydrateClient>
  );
}
