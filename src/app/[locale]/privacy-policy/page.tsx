import PrivacyPolicyView from '@/modules/policies/ui/views/privacy-policy-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  await trpc.policies.getPrivacyPolicies.prefetch();

  return (
    <HydrateClient>
      <PrivacyPolicyView />
    </HydrateClient>
  );
}
