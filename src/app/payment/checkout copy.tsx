'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type { OnApproveData } from '@paypal/paypal-js';
import { trpc } from '@/trpc/client';

export default function Checkout() {
  const [{ options, isPending }] = usePayPalScriptReducer();

  const { mutate: createOrderMutate, isPending: isCreateOrderPending } =
    trpc.payment.createOrder.useMutation();
  const { mutate: confirmOrderMutate } =
    trpc.payment.confirmOrder.useMutation();

  const onCreateOrder = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      createOrderMutate(
        {
          amount: '23',
          currency_code: options.currency!
        },
        {
          onSuccess(data) {
            console.log('data onCreateOrder', data);
            if (data.id) {
              resolve(data.id);
            }
            reject('Order id not found');
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

  console.log('isCreateOrderPending', isCreateOrderPending);

  return (
    <div className="">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <PayPalButtons
          style={{ layout: 'vertical', label: 'donate' }}
          createOrder={onCreateOrder}
          onApprove={onApproveOrder}
        />
      )}
    </div>
  );
}
