import { env } from '@/env';

import Checkout from './checkout';
import PaypalProvider from './provider';

export default async function PaymentPage() {
  // void trpc.payment.generateClientToken.prefetch();

  const clientId = env.PAYPAL_CLIENT_ID;

  return (
    <PaypalProvider clientId={clientId}>
      <Checkout />
    </PaypalProvider>
  );
}
