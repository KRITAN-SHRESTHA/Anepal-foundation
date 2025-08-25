import TermsAndConditionsView from '@/modules/policies/ui/views/terms-and-conditions-view';
import { HydrateClient, trpc } from '@/trpc/server';

// export { generateMetadata };

export default async function TermsAndConditionsPage() {
  await trpc.policies.getTermsAndConditions.prefetch();

  return (
    <HydrateClient>
      <TermsAndConditionsView />
    </HydrateClient>
  );
}
