'use client';

import React, { useState } from 'react';
import {
  DISPATCH_ACTION,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';
import type { OnApproveData, CreateOrderData } from '@paypal/paypal-js';
import { trpc } from '@/trpc/client';

export default function Checkout() {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState<string | undefined>(
    options.currency
  );

  console.log('currency', currency);

  const { mutate: createOrderMutate } = trpc.payment.createOrder.useMutation();
  const { mutate: confirmOrderMutate } =
    trpc.payment.confirmOrder.useMutation();

  const onCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCurrency(value);
    dispatch({
      type: DISPATCH_ACTION.RESET_OPTIONS,
      value: {
        ...options,
        currency: value
      }
    });
  };

  const onCreateOrder = (data: CreateOrderData): Promise<string> => {
    console.log('onCreateOrder data ----', data.paymentSource);
    return new Promise((resolve, reject) => {
      createOrderMutate(
        {
          amount: '23',
          currency_code: currency
        },
        {
          onSuccess(data) {
            resolve(data.order.id);
          },
          onError(error) {
            reject(error);
          }
        }
      );
    });
  };

  const onApproveOrder = (data: OnApproveData): Promise<void> => {
    console.log('onApproveOrder data ----', data);
    return new Promise((resolve, reject) => {
      confirmOrderMutate(
        {
          orderId: data.orderID
        },
        {
          onSuccess: data => {
            console.log('success data----', data);
            resolve();
          },
          onError: error => {
            reject(error);
          }
        }
      );
    });
  };

  return (
    <div>
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <select value={currency} onChange={onCurrencyChange}>
            <option value="USD">💵 USD</option>
            <option value="EUR">💶 Euro</option>
          </select>

          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={onCreateOrder}
            onApprove={onApproveOrder}
          />
        </>
      )}
    </div>
  );
}
