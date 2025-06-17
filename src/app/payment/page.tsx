import React from 'react';
import { env } from '@/env';
import Checkout from './checkout';
import PaypalProvider from './provider';

const initialOptions = {
  clientId: env.PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture'
};

export default function PaymentPage() {
  return (
    <div className="">
      <PaypalProvider options={initialOptions}>
        <Checkout />
      </PaypalProvider>
    </div>
  );
}
