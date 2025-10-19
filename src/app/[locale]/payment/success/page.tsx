import PaymentSuccessView from '@/modules/payment/ui/views/payment-success-view';
import { setRequestLocale } from 'next-intl/server';

// Force dynamic rendering - success page should not be statically generated
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SuccessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PaymentSuccessView />;
}
