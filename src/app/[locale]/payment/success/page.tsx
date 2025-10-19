import PaymentSuccessView from '@/modules/payment/ui/views/payment-success-view';

// Force dynamic rendering - don't prerender this page at build time
export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  return <PaymentSuccessView />;
}
