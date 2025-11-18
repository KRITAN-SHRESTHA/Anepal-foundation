import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { OnApproveData } from '@paypal/paypal-js';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { trpc } from '@/trpc/client';

import CardFormSection from './card-form-section';
import { usePaymentAmountStore } from '../store/payment-amount-store';
import PaymentSkeleton from '../components/payment-skeleton';
import SelectAmountSection from './select-amount-section';
import { useTranslations } from 'next-intl';

export default function PaymentFormSection() {
  const router = useRouter();
  const t = useTranslations('Default');

  const [{ options, isPending: isPaypalLoading }] = usePayPalScriptReducer();

  const { mutate: createOrderMutate } = trpc.payment.createOrder.useMutation();

  const { mutate: confirmOrderMutate } =
    trpc.payment.confirmOrder.useMutation();

  const setIsPaying = usePaymentAmountStore(state => state.setIsPaying);
  const isPaying = usePaymentAmountStore(state => state.isPaying);

  const onCreateOrder = (): Promise<string> => {
    const currentAmount = usePaymentAmountStore.getState().amount;

    return new Promise((resolve, reject) => {
      setIsPaying(true);
      createOrderMutate(
        {
          amount: currentAmount ?? '0',
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
            setIsPaying(false);
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
            // console.log('success data----', data);
            setIsPaying(false);
            if (data.status === 'COMPLETED') {
              router.push('/payment/success');
            }
            resolve();
          },
          onError: error => {
            // error will be handled by onError in PayPalButtons or PayPalCardFieldsProvider
            setIsPaying(false);
            // router.push('/payment/error');
            reject(error);
          }
        }
      );
    });
  };

  if (isPaypalLoading) return <PaymentSkeleton />;

  return (
    <>
      {/* amount selector */}
      <SelectAmountSection />

      <div className="relative z-10 px-1.5">
        <PayPalButtons
          fundingSource={'paypal'}
          style={{ layout: 'vertical', label: 'donate' }}
          createOrder={onCreateOrder}
          onApprove={onApproveOrder}
          disabled={isPaying}
          onError={err => {
            // global error handler for payment
            setIsPaying(false);
            console.error('err PayPalButtons--------------', err);
            toast.error(
              'Something went wrong, try again! Please check your credentials.'
            );
          }}
          onCancel={() => {
            setIsPaying(false);
          }}
        />
      </div>

      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <hr className="border-dashed" />
        <span className="text-muted-foreground text-xs">
          {t('Or_donate_with_Credit_Debit_Card')}
        </span>
        <hr className="border-dashed" />
      </div>

      <CardFormSection
        onApproveOrder={onApproveOrder}
        onCreateOrder={onCreateOrder}
      />
    </>
  );
}
