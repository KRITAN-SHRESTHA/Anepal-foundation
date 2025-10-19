import DonorsPartnersView from '@/modules/donors-partners/ui/views/donors-partners-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DonorsPartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  void trpc.donorsPartners.getContentOfDonorsPartnersPage.prefetch();

  return (
    <HydrateClient>
      <DonorsPartnersView />
    </HydrateClient>
  );
}
