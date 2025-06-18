'use client';

import React from 'react';
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions
} from '@paypal/react-paypal-js';
import ContentTitle from '@/components/content-title';

interface PaypalProviderProps {
  children: React.ReactNode;
  clientId: string;
}

export default function PaypalProvider({
  children,
  clientId
}: PaypalProviderProps) {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: clientId,
    currency: 'USD',
    intent: 'capture',
    components: 'buttons,card-fields',
    vault: false
    // enableFunding: ['venmo']
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="relative z-10 mx-auto max-w-[450px] pt-[40px] pb-[100px]">
        <ContentTitle
          title={'Donate us'}
          align="center"
          subtitle={'Make a difference today'}
          subtitleClassname="text-[35px]!"
        />
        <p className="text-muted-foreground pt-2 pb-5 text-center">
          Your generosity changes lives of other children
        </p>
        {children}
      </div>
    </PayPalScriptProvider>
  );
}
