import TermsAndConditionsView from '@/modules/policies/ui/views/terms-and-conditions-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsAndConditionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  await trpc.policies.getTermsAndConditions.prefetch();

  return (
    <HydrateClient>
      <TermsAndConditionsView />
    </HydrateClient>
  );
}
