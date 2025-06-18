'use client';

import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions
} from '@paypal/react-paypal-js';

import ContentTitle from '@/components/content-title';
import { env } from '@/env';

import PaymentFormSection from '../section/payment-form-section';

const initialOptions: ReactPayPalScriptOptions = {
  clientId: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons,card-fields',
  vault: false
};

export default function PaymentView() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="relative z-10 mx-auto max-w-[450px] pt-[40px] pb-[100px]">
        <ContentTitle
          title={'Donate us'}
          align="center"
          subtitle={'Make a difference today'}
          subtitleClassname="text-[30px]!"
        />
        <p className="text-muted-foreground pt-2 pb-5 text-center text-sm">
          Your generosity changes lives of other children
        </p>

        <PaymentFormSection />
      </div>
    </PayPalScriptProvider>
  );
}
