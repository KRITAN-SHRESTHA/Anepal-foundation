import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { OnApproveData } from '@paypal/paypal-js';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { trpc } from '@/trpc/client';

import CardFormSection from './card-form-section';

export default function PaymentFormSection() {
  const router = useRouter();

  const [{ options, isPending: isPaypalLoading }] = usePayPalScriptReducer();

  const { mutate: createOrderMutate, isPending: isCreateOrderPending } =
    trpc.payment.createOrder.useMutation();

  const { mutate: confirmOrderMutate, isPending: isConfirmOrderPending } =
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
            // error will be handled by onError in PayPalButtons or PayPalCardFieldsProvider
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
            router.push('/payment/success');
            resolve();
          },
          onError: error => {
            // error will be handled by onError in PayPalButtons or PayPalCardFieldsProvider
            console.error('payment error', error);
            // router.push('/payment/error');
            reject(error);
          }
        }
      );
    });
  };

  if (isPaypalLoading) return <h1>Loading....</h1>;

  return (
    <>
      <PayPalButtons
        fundingSource={'paypal'}
        style={{ layout: 'vertical', label: 'donate' }}
        createOrder={onCreateOrder}
        onApprove={onApproveOrder}
        disabled={isCreateOrderPending || isConfirmOrderPending}
        onError={err => {
          // global error handler for payment
          console.error('err PayPalButtons', err);
          toast.error('Something went wrong, try again!');
        }}
      />

      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <hr className="border-dashed" />
        <span className="text-muted-foreground text-xs">
          Or donate with Credit/Debit Card
        </span>
        <hr className="border-dashed" />
      </div>

      <CardFormSection
        isLoading={isCreateOrderPending || isConfirmOrderPending}
        onApproveOrder={onApproveOrder}
        onCreateOrder={onCreateOrder}
      />
    </>
  );
}
