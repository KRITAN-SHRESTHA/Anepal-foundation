import DonorsPartnersView from '@/modules/donors-partners/ui/views/donors-partners-view';
import { HydrateClient, trpc } from '@/trpc/server';

export default function DonorsPartnersPage() {
  void trpc.donorsPartners.getContentOfDonorsPartnersPage.prefetch();

  return (
    <HydrateClient>
      <DonorsPartnersView />
    </HydrateClient>
  );
}
