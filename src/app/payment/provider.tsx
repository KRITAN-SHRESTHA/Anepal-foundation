'use client';

import React from 'react';
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions
} from '@paypal/react-paypal-js';

interface PaypalProviderProps {
  children: React.ReactNode;
  options: ReactPayPalScriptOptions;
}

export default function PaypalProvider({
  children,
  options
}: PaypalProviderProps) {
  return (
    <PayPalScriptProvider options={options}>{children}</PayPalScriptProvider>
  );
}
