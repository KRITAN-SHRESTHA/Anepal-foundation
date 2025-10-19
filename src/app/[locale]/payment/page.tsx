import PaymentView from '@/modules/payment/ui/views/payment-view';
import { setRequestLocale } from 'next-intl/server';

// Force dynamic rendering - payment page should not be statically generated
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PaymentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PaymentView />;
}
